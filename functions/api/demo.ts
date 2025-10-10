/**
 * Cloudflare Pages Function for Demo Form Submission
 * Handles form validation, Turnstile verification, and sends email via Mailgun
 */

interface Env {
  TURNSTILE_SECRET_KEY: string;
  MAILGUN_API_KEY: string;
  MAILGUN_DOMAIN: string;
  MAILGUN_REGION: string;
}

interface TurnstileResponse {
  success: boolean;
  'error-codes'?: string[];
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
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
          secret: context.env.TURNSTILE_SECRET_KEY,
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

    // Send email via Mailgun
    const mailgunRegion = context.env.MAILGUN_REGION === 'eu' ? 'api.eu.mailgun.net' : 'api.mailgun.net';
    const mailgunUrl = `https://${mailgunRegion}/v3/${context.env.MAILGUN_DOMAIN}/messages`;

    const emailBody = `
New Demo Request

Personal Information:
- Name: ${firstName} ${lastName}
- Email: ${email}
- Phone: ${phone}

Company Information:
- Company: ${company}

Preferred Schedule:
- Date: ${preferredDate}
- Time: ${preferredTime}

${notes ? `Notes:\n${notes}` : ''}

---
Submitted from: ${context.request.headers.get('referer') || 'Unknown'}
IP Address: ${context.request.headers.get('cf-connecting-ip') || 'Unknown'}
    `.trim();

    const mailgunFormData = new FormData();
    mailgunFormData.append('from', `Tesoro CRM Website <noreply@${context.env.MAILGUN_DOMAIN}>`);
    mailgunFormData.append('to', 'sales@tesoro.estate'); // Change to your email
    mailgunFormData.append('subject', `🎯 New Demo Request from ${firstName} ${lastName}`);
    mailgunFormData.append('text', emailBody);

    const mailgunResponse = await fetch(mailgunUrl, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`api:${context.env.MAILGUN_API_KEY}`)}`,
      },
      body: mailgunFormData,
    });

    if (!mailgunResponse.ok) {
      console.error('Mailgun error:', await mailgunResponse.text());
      return new Response(JSON.stringify({ error: 'Failed to send email' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
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
