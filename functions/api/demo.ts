/**
 * Cloudflare Pages Function for Demo Form Submission
 * Handles form validation, Turnstile verification, and sends email via Mailgun
 */

interface Env {
  SECRETS: {
    get(key: string): Promise<string | null>;
  };
}

interface TurnstileResponse {
  success: boolean;
  'error-codes'?: string[];
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    // Get secrets from Cloudflare Secret Store
    const turnstileSecret = await context.env.SECRETS.get('TURNSTILE_SECRET_KEY');
    const mailgunApiKey = await context.env.SECRETS.get('MAILGUN_API_KEY');
    const mailgunDomain = await context.env.SECRETS.get('MAILGUN_DOMAIN');
    const mailgunRegion = await context.env.SECRETS.get('MAILGUN_REGION');
    const notificationEmail = await context.env.SECRETS.get('NOTIFICATION_EMAIL') || 'sales@tesoro.estate';

    if (!turnstileSecret || !mailgunApiKey || !mailgunDomain || !mailgunRegion) {
      return new Response(JSON.stringify({ error: 'Server configuration error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const formData = await context.request.formData();
    
    // Extract form fields
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
    if (!firstName || !lastName || !email || !phone || !company || !preferredDate || !preferredTime) {
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
      <p><strong>Bron:</strong> ${context.request.headers.get('referer') || 'Direct'}</p>
      <p><strong>IP:</strong> ${context.request.headers.get('cf-connecting-ip') || 'Unknown'}</p>
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

    // Return success response
    return new Response(JSON.stringify({ success: true, message: 'Demo request submitted successfully' }), {
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
