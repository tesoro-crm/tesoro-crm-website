/**
 * Cloudflare Pages Function for Contact Form Submission
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
    
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;
    const turnstileToken = formData.get('cf-turnstile-response') as string;

    if (!firstName || !lastName || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Verify Turnstile
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
New Contact Form Submission

From: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
${message}

---
Submitted from: ${context.request.headers.get('referer') || 'Unknown'}
IP Address: ${context.request.headers.get('cf-connecting-ip') || 'Unknown'}
    `.trim();

    const mailgunFormData = new FormData();
    mailgunFormData.append('from', `Tesoro CRM Website <noreply@${context.env.MAILGUN_DOMAIN}>`);
    mailgunFormData.append('to', 'sales@tesoro.estate');
    mailgunFormData.append('subject', `📧 New Contact from ${firstName} ${lastName}`);
    mailgunFormData.append('text', emailBody);
    mailgunFormData.append('h:Reply-To', email);

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

    return new Response(JSON.stringify({ success: true, message: 'Message sent successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
