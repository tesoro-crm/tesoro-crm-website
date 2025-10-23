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
 * Book appointment in Zoho Bookings
 */
async function bookZohoAppointment(
  accessToken: string,
  datacenter: string,
  serviceId: string,
  staffId: string,
  appointmentData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    date: string; // YYYY-MM-DD format
    time: string; // HH:MM - HH:MM format (e.g., "14:00 - 15:00")
    notes: string;
  }
): Promise<string | null> {
  const apiUrl = `https://www.zohoapis.${datacenter}/bookings/v1/json/appointment`;

  // Parse the time slot (e.g., "14:00 - 15:00" → start time: 14:00)
  const startTime = appointmentData.time.split(' - ')[0].trim();

  // Convert date from YYYY-MM-DD to dd-MMM-yyyy format
  const date = new Date(appointmentData.date);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = String(date.getDate()).padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  // Format: "dd-MMM-yyyy HH:mm:ss" (e.g., "24-Oct-2025 14:00:00")
  const fromTime = `${day}-${month}-${year} ${startTime}:00`;

  // Prepare customer details as JSON
  const customerDetails = {
    name: `${appointmentData.firstName} ${appointmentData.lastName}`,
    email: appointmentData.email,
    phone_number: appointmentData.phone,
  };

  // Create FormData for the booking request
  const formData = new FormData();
  formData.append('service_id', serviceId);
  formData.append('staff_id', staffId);
  formData.append('from_time', fromTime);
  formData.append('customer_details', JSON.stringify(customerDetails));
  formData.append('notes', appointmentData.notes);
  formData.append('timezone', 'Europe/Amsterdam');

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Zoho Bookings appointment error:', response.status, errorText);
      // Don't throw - just log the error and continue
      return null;
    }

    const result = await response.json();

    // Check for successful booking
    if (result.response?.returnvalue?.data?.booking_id) {
      const bookingId = result.response.returnvalue.data.booking_id;
      console.log('✅ Zoho Bookings appointment created successfully:', bookingId);
      return bookingId;
    }

    console.warn('Zoho Bookings appointment creation returned no ID:', result);
    return null;
  } catch (error) {
    console.error('Zoho Bookings appointment error:', error);
    // Don't fail the whole request if booking fails
    return null;
  }
}

/**
 * Create calendar event in Zoho CRM for the demo appointment
 */
async function createZohoCalendarEvent(
  accessToken: string,
  datacenter: string,
  eventData: {
    leadId: string;
    title: string;
    date: string; // YYYY-MM-DD format
    time: string; // HH:MM - HH:MM format (e.g., "14:00 - 15:00")
    attendees: string; // Email of attendee
    description: string;
  }
): Promise<string | null> {
  const apiUrl = `https://www.zohoapis.${datacenter}/crm/v6/Events`;

  // Parse time range (e.g., "14:00 - 15:00" → start: 14:00, end: 15:00)
  const [startTime, endTime] = eventData.time.split(' - ').map(t => t.trim());

  // Combine date and time for ISO format
  const startDateTime = `${eventData.date}T${startTime}:00`;
  const endDateTime = `${eventData.date}T${endTime}:00`;

  const zohoEvent = {
    data: [
      {
        Event_Title: eventData.title,
        Start_DateTime: startDateTime,
        End_DateTime: endDateTime,
        Description: eventData.description,
        Participants: [
          {
            type: 'email',
            participant: eventData.attendees
          }
        ],
        // Link event to the lead
        What_Id: eventData.leadId,
        // Set as meeting type
        $se_module: 'Leads',
      },
    ],
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(zohoEvent),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Zoho Calendar API error:', response.status, errorText);
      // Don't throw - just log the error and continue
      return null;
    }

    const result = await response.json();

    if (result.data && result.data[0] && result.data[0].code === 'SUCCESS') {
      console.log('✅ Calendar event created successfully:', result.data[0].details.id);
      return result.data[0].details.id;
    }

    console.warn('Calendar event creation returned no ID:', result);
    return null;
  } catch (error) {
    console.error('Calendar event creation error:', error);
    // Don't fail the whole request if calendar fails
    return null;
  }
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
    language: string;
  }
): Promise<string | null> {
  const apiUrl = `https://www.zohoapis.${datacenter}/crm/v6/Leads`;

  // Determine lead owner based on language
  // NL → John Stevens (j.stevens@codificamos.es)
  // EN/ES → Cristina Crego (cristina@tesorohq.io)
  const JOHN_USER_ID = '210082000000033001';
  const CRISTINA_USER_ID = '210082000065023001';

  const ownerId = leadData.language === 'nl' ? JOHN_USER_ID : CRISTINA_USER_ID;

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
        // Description now only contains scheduling and notes info (Pain_Point is in separate field)
        Description: `Preferred Demo Date: ${leadData.preferredDate}\nPreferred Demo Time: ${leadData.preferredTime}\n\nAdditional Notes:\n${leadData.notes || 'No additional notes provided'}`,
        // Custom fields
        Pain_Point: leadData.painPoint,
        Language: leadData.language.toUpperCase(), // Store as ES, EN, or NL
        Owner: {
          id: ownerId
        },
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

    // Zoho Bookings environment variables (optional)
    const serviceId = env.ZOHO_BOOKINGS_SERVICE_ID;
    const staffId = env.ZOHO_BOOKINGS_STAFF_ID;

    // Check if at least Zoho is configured (for testing)
    // Mailgun and Turnstile are optional for now
    const hasZoho = zohoClientId && zohoClientSecret && zohoRefreshToken;

    if (!hasZoho) {
      console.error('Missing required Zoho environment variables');
      console.error('- ZOHO_CLIENT_ID:', !!zohoClientId);
      console.error('- ZOHO_CLIENT_SECRET:', !!zohoClientSecret);
      console.error('- ZOHO_REFRESH_TOKEN:', !!zohoRefreshToken);

      return new Response(JSON.stringify({
        error: 'Server configuration error - Zoho CRM not configured',
        debug: {
          hasRuntime: !!runtime,
          hasEnv: !!env,
          envKeys: Object.keys(env),
          missingVars: {
            zohoClientId: !zohoClientId,
            zohoClientSecret: !zohoClientSecret,
            zohoRefreshToken: !zohoRefreshToken,
          }
        }
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Warn if optional services are not configured
    if (!turnstileSecret) {
      console.warn('TURNSTILE_SECRET_KEY not configured - skipping bot protection');
    }
    if (!mailgunApiKey) {
      console.warn('MAILGUN_API_KEY not configured - skipping email notifications');
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

    // Detect language from Referer header (URL contains /nl/, /en/, or default to /es/)
    const referer = request.headers.get('referer') || '';
    let language = 'es'; // Default to Spanish
    if (referer.includes('/nl/') || referer.includes('/nl')) {
      language = 'nl';
    } else if (referer.includes('/en/') || referer.includes('/en')) {
      language = 'en';
    }
    console.log('Detected language from referer:', language, '(', referer, ')');

    // Validate required fields
    if (!painPoint || !firstName || !lastName || !email || !phone || !company || !preferredDate || !preferredTime) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Verify Turnstile token (only if configured)
    // NOTE: Currently in soft-fail mode - logs warnings but doesn't block submissions
    // Change to hard-fail once Turnstile is properly configured
    if (turnstileSecret && turnstileToken) {
      try {
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
          console.warn('⚠️ Turnstile verification FAILED but allowing submission (soft-fail mode)');
          console.warn('Error codes:', turnstileResult['error-codes']);
          // SOFT FAIL: Log warning but continue processing
          // To enable hard fail, uncomment the lines below:
          // return new Response(JSON.stringify({ error: 'Turnstile verification failed' }), {
          //   status: 403,
          //   headers: { 'Content-Type': 'application/json' },
          // });
        } else {
          console.log('✅ Turnstile verification successful');
        }
      } catch (error) {
        console.error('Turnstile verification error:', error);
        // Continue anyway in soft-fail mode
      }
    } else {
      console.warn('Turnstile verification skipped - not configured or no token provided');
    }

    // Send emails via Mailgun (only if configured)
    if (mailgunApiKey && mailgunDomain && mailgunRegion) {
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
    } else {
      console.log('Mailgun email notifications skipped - not configured');
    }

    // 3. Create lead in Zoho CRM and book appointment
    let zohoLeadId: string | null = null;
    let zohoEventId: string | null = null;
    let zohoBookingId: string | null = null;
    if (zohoClientId && zohoClientSecret && zohoRefreshToken) {
      try {
        const accessToken = await getZohoAccessToken(
          zohoClientId,
          zohoClientSecret,
          zohoRefreshToken,
          zohoDatacenter
        );

        // Create the lead
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
          language,
        });

        if (zohoLeadId) {
          console.log('✅ Zoho CRM lead created successfully:', zohoLeadId);
          console.log('   - Language:', language.toUpperCase());
          console.log('   - Owner:', language === 'nl' ? 'John Stevens' : 'Cristina Crego');

          // Create calendar event for the demo appointment
          zohoEventId = await createZohoCalendarEvent(accessToken, zohoDatacenter, {
            leadId: zohoLeadId,
            title: `Demo Tesoro CRM - ${firstName} ${lastName}`,
            date: preferredDate,
            time: preferredTime,
            attendees: email,
            description: `Demo appointment with ${firstName} ${lastName} from ${company}\n\nPain Point:\n${painPoint}\n\nAdditional Notes:\n${notes || 'None'}`,
          });

          if (zohoEventId) {
            console.log('✅ Calendar event created successfully:', zohoEventId);
          } else {
            console.warn('⚠️  Calendar event creation failed (non-critical)');
          }

          // Book appointment in Zoho Bookings (if configured)
          if (serviceId && staffId) {
            const bookingNotes = `Pain Point: ${painPoint}\n\nAdditional Notes: ${notes || 'None'}`;
            zohoBookingId = await bookZohoAppointment(
              accessToken,
              zohoDatacenter,
              serviceId,
              staffId,
              {
                firstName,
                lastName,
                email,
                phone,
                date: preferredDate,
                time: preferredTime,
                notes: bookingNotes,
              }
            );

            if (zohoBookingId) {
              console.log('✅ Zoho Bookings appointment created successfully:', zohoBookingId);
            } else {
              console.warn('⚠️  Zoho Bookings appointment creation failed (non-critical)');
            }
          } else {
            console.log('Zoho Bookings integration skipped - service/staff IDs not configured');
          }
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
      zohoEventId: zohoEventId || undefined,
      zohoBookingId: zohoBookingId || undefined,
      language: language,
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
