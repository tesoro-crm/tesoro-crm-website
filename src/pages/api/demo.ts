/**
 * Astro API Route for Demo Form Submission
 * Handles form validation, Turnstile verification, sends email via Mailgun, and creates lead in Zoho CRM
 */

import type { APIRoute } from 'astro';

interface ZohoTokenResponse {
  access_token: string;
  expires_in: number;
  api_domain: string;
  token_type: string;
}

interface ZohoLeadResponse {
  data: Array<{
    code: string;
    details: {
      id: string;
    };
    message: string;
    status: string;
  }>;
}

interface TurnstileResponse {
  success: boolean;
  'error-codes'?: string[];
}

/**
 * Get Zoho CRM access token using refresh token
 */
async function getZohoAccessToken(
  clientId: string,
  clientSecret: string,
  refreshToken: string,
  datacenter: string
): Promise<string> {
  const tokenUrl = `https://accounts.zoho.${datacenter}/oauth/v2/token`;

  const params = new URLSearchParams({
    refresh_token: refreshToken,
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'refresh_token',
  });

  const response = await fetch(`${tokenUrl}?${params.toString()}`, {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error(`Zoho token request failed: ${response.status}`);
  }

  const data: ZohoTokenResponse = await response.json();
  return data.access_token;
}

/**
 * Create lead in Zoho CRM
 */
async function createZohoLead(
  accessToken: string,
  datacenter: string,
  leadData: {
    painPoint: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    preferredDate: string;
    preferredTime: string;
    notes: string;
  }
): Promise<string | null> {
  const apiUrl = `https://www.zohoapis.${datacenter}/crm/v6/Leads`;

  const zohoLead = {
    data: [
      {
        First_Name: leadData.firstName,
        Last_Name: leadData.lastName,
        Email: leadData.email,
        Phone: leadData.phone,
        Company: leadData.company,
        Lead_Source: 'Website - Demo Request',
        Lead_Status: 'Not Contacted',
        Description: `Pain Point: ${leadData.painPoint}\n\nPreferred Date: ${leadData.preferredDate}\nPreferred Time: ${leadData.preferredTime}\n\nNotes: ${leadData.notes || 'N/A'}`,
        // Custom field for pain point (requires Pain_Point field in Zoho CRM)
        Pain_Point: leadData.painPoint,
      },
    ],
  };

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Zoho-oauthtoken ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(zohoLead),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Zoho CRM API error:', response.status, errorText);
    throw new Error(`Zoho CRM API failed: ${response.status}`);
  }

  const result: ZohoLeadResponse = await response.json();

  if (result.data && result.data[0] && result.data[0].code === 'SUCCESS') {
    return result.data[0].details.id;
  }

  return null;
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    // Access environment variables from Cloudflare runtime
    // In Cloudflare Pages with Astro adapter, environment variables are in context.locals.runtime.env
    const runtime = (locals as any).runtime;
    const env = runtime?.env || {};

    // Debug logging
    console.log('=== DEBUG ENV ACCESS ===');
    console.log('Locals keys:', Object.keys(locals));
    console.log('Has runtime?', !!runtime);
    console.log('Runtime keys:', runtime ? Object.keys(runtime) : 'no runtime');
    console.log('Has env?', !!env);
    console.log('ENV keys:', Object.keys(env));
    console.log('TURNSTILE_SECRET_KEY exists?', !!env.TURNSTILE_SECRET_KEY);
    console.log('MAILGUN_API_KEY exists?', !!env.MAILGUN_API_KEY);

    // Get environment variables from Cloudflare
    // These should be set in Cloudflare Pages dashboard under Settings > Environment Variables
    const turnstileSecret = env.TURNSTILE_SECRET_KEY;
    const mailgunApiKey = env.MAILGUN_API_KEY;
    const mailgunDomain = env.MAILGUN_DOMAIN;
    const mailgunRegion = env.MAILGUN_REGION;
    const notificationEmail = env.NOTIFICATION_EMAIL || 'sales@tesoro.estate';

    // Zoho CRM environment variables (optional)
    const zohoClientId = env.ZOHO_CLIENT_ID;
    const zohoClientSecret = env.ZOHO_CLIENT_SECRET;
    const zohoRefreshToken = env.ZOHO_REFRESH_TOKEN;
    const zohoDatacenter = env.ZOHO_DATACENTER || 'com'; // Default to US

    if (!turnstileSecret || !mailgunApiKey || !mailgunDomain || !mailgunRegion) {
      console.error('Missing required environment variables:');
      console.error('- TURNSTILE_SECRET_KEY:', !!turnstileSecret);
      console.error('- MAILGUN_API_KEY:', !!mailgunApiKey);
      console.error('- MAILGUN_DOMAIN:', !!mailgunDomain);
      console.error('- MAILGUN_REGION:', !!mailgunRegion);

      return new Response(JSON.stringify({
        error: 'Server configuration error',
        debug: {
          hasRuntime: !!runtime,
          hasEnv: !!env,
          envKeys: Object.keys(env),
          missingVars: {
            turnstile: !turnstileSecret,
            mailgun: !mailgunApiKey,
            domain: !mailgunDomain,
            region: !mailgunRegion
          }
        }
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const formData = await request.formData();

    // Extract form fields
    const painPoint = formData.get('painPoint') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const company = formData.get('company') as string;
    const preferredDate = formData.get('preferredDate') as string;
    const preferredTime = formData.get('preferredTime') as string;
    const notes = formData.get('notes') as string;
    const turnstileToken = formData.get('cf-turnstile-response') as string;

    // Validate required fields
    if (!painPoint || !firstName || !lastName || !email || !phone || !company || !preferredDate || !preferredTime) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Verify Turnstile token
    const turnstileVerification = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: turnstileSecret,
          response: turnstileToken,
        }),
      }
    );

    const turnstileResult: TurnstileResponse = await turnstileVerification.json();

    if (!turnstileResult.success) {
      return new Response(JSON.stringify({ error: 'Turnstile verification failed' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Send emails via Mailgun
    const mailgunApiUrl = mailgunRegion === 'eu' ? 'api.eu.mailgun.net' : 'api.mailgun.net';
    const mailgunUrl = `https://${mailgunApiUrl}/v3/${mailgunDomain}/messages`;

    // 1. Send notification email to Tesoro
    const notificationHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 24px;">🎯 Nieuwe Demo Aanvraag</h1>
  </div>
  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <div style="background: linear-gradient(135deg, #FEF3C7 0%, #FED7AA 100%); padding: 20px; border-radius: 8px; margin-bottom: 30px; border-left: 4px solid #F59E0B;">
      <h2 style="color: #92400E; margin-top: 0; font-size: 18px;">💡 Wat houdt hen wakker?</h2>
      <p style="font-size: 16px; color: #1F2937; line-height: 1.6; margin: 10px 0 0 0; white-space: pre-wrap;">${painPoint}</p>
    </div>

    <h2 style="color: #667eea; margin-top: 0;">Contactgegevens</h2>
    <p><strong>Naam:</strong> ${firstName} ${lastName}</p>
    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
    <p><strong>Telefoon:</strong> <a href="tel:${phone}">${phone}</a></p>
    <p><strong>Bedrijf:</strong> ${company}</p>

    <h2 style="color: #667eea; margin-top: 30px;">Gewenste Planning</h2>
    <p><strong>Datum:</strong> ${preferredDate}</p>
    <p><strong>Tijd:</strong> ${preferredTime}</p>

    ${notes ? `<h2 style="color: #667eea; margin-top: 30px;">Opmerkingen</h2><p>${notes}</p>` : ''}

    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
      <p><strong>Bron:</strong> ${request.headers.get('referer') || 'Direct'}</p>
      <p><strong>IP:</strong> ${request.headers.get('cf-connecting-ip') || 'Unknown'}</p>
    </div>
  </div>
</body>
</html>`;

    const notificationFormData = new FormData();
    notificationFormData.append('from', `Tesoro CRM <noreply@${mailgunDomain}>`);
    notificationFormData.append('to', notificationEmail);
    notificationFormData.append('subject', `🎯 Nieuwe Demo Aanvraag van ${firstName} ${lastName}`);
    notificationFormData.append('html', notificationHtml);

    const notificationResponse = await fetch(mailgunUrl, {
      method: 'POST',
      headers: { Authorization: `Basic ${btoa(`api:${mailgunApiKey}`)}` },
      body: notificationFormData,
    });

    if (!notificationResponse.ok) {
      console.error('Mailgun notification error:', await notificationResponse.text());
    }

    // 2. Send confirmation email to customer
    const confirmationHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 24px;">✅ Demo Aanvraag Ontvangen</h1>
  </div>
  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <p>Beste ${firstName},</p>
    <p>Bedankt voor je interesse in Tesoro CRM! We hebben je demo aanvraag ontvangen en nemen binnen 24 uur contact met je op.</p>

    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
      <h3 style="margin-top: 0; color: #667eea;">Jouw Gegevens</h3>
      <p><strong>Gewenste datum:</strong> ${preferredDate}</p>
      <p><strong>Gewenste tijd:</strong> ${preferredTime}</p>
      <p><strong>Bedrijf:</strong> ${company}</p>
    </div>

    <p>Heb je vragen? Stuur een email naar <a href="mailto:${notificationEmail}" style="color: #667eea;">${notificationEmail}</a></p>

    <p style="margin-top: 30px;">Met vriendelijke groet,<br><strong>Team Tesoro CRM</strong></p>
  </div>
  <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
    <p>© 2025 Tesoro CRM. Alle rechten voorbehouden.</p>
  </div>
</body>
</html>`;

    const confirmationFormData = new FormData();
    confirmationFormData.append('from', `Tesoro CRM <noreply@${mailgunDomain}>`);
    confirmationFormData.append('to', email);
    confirmationFormData.append('subject', '✅ Je demo aanvraag is ontvangen - Tesoro CRM');
    confirmationFormData.append('html', confirmationHtml);

    const confirmationResponse = await fetch(mailgunUrl, {
      method: 'POST',
      headers: { Authorization: `Basic ${btoa(`api:${mailgunApiKey}`)}` },
      body: confirmationFormData,
    });

    if (!confirmationResponse.ok) {
      console.error('Mailgun confirmation error:', await confirmationResponse.text());
    }

    // 3. Create lead in Zoho CRM (optional - only if credentials are configured)
    let zohoLeadId: string | null = null;
    if (zohoClientId && zohoClientSecret && zohoRefreshToken) {
      try {
        const accessToken = await getZohoAccessToken(
          zohoClientId,
          zohoClientSecret,
          zohoRefreshToken,
          zohoDatacenter
        );

        zohoLeadId = await createZohoLead(accessToken, zohoDatacenter, {
          painPoint,
          firstName,
          lastName,
          email,
          phone,
          company,
          preferredDate,
          preferredTime,
          notes,
        });

        if (zohoLeadId) {
          console.log('Zoho CRM lead created successfully:', zohoLeadId);
        } else {
          console.warn('Zoho CRM lead creation returned no ID');
        }
      } catch (zohoError) {
        // Log error but don't fail the request - emails are more important
        console.error('Zoho CRM integration error:', zohoError);
      }
    } else {
      console.log('Zoho CRM integration skipped - credentials not configured');
    }

    // Return success response
    return new Response(JSON.stringify({
      success: true,
      message: 'Demo request submitted successfully',
      zohoLeadId: zohoLeadId || undefined,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error processing demo request:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
