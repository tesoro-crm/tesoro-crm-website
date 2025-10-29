import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const email = formData.get('email') as string;

    // Validate email
    if (!email) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Email is required'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid email address'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Get Mailgun credentials from environment variables
    const MAILGUN_API_KEY = import.meta.env.MAILGUN_API_KEY;
    const MAILGUN_DOMAIN = import.meta.env.MAILGUN_DOMAIN;
    const MAILGUN_MAILING_LIST = import.meta.env.MAILGUN_MAILING_LIST || 'newsletter@' + MAILGUN_DOMAIN;

    if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN) {
      console.error('Mailgun credentials not configured');
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Newsletter service not configured'
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Add subscriber to Mailgun mailing list
    const mailgunUrl = `https://api.mailgun.net/v3/lists/${MAILGUN_MAILING_LIST}/members`;
    const auth = 'Basic ' + Buffer.from(`api:${MAILGUN_API_KEY}`).toString('base64');

    const response = await fetch(mailgunUrl, {
      method: 'POST',
      headers: {
        'Authorization': auth,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        address: email,
        subscribed: 'yes',
        upsert: 'yes' // Update if already exists
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Mailgun API error:', errorData);

      // Check if already subscribed
      if (errorData.message && errorData.message.includes('already exists')) {
        return new Response(
          JSON.stringify({
            success: true,
            message: 'You are already subscribed to our newsletter!'
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }

      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to subscribe to newsletter'
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Newsletter subscription successful:', email);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Thank you for subscribing!'
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Newsletter subscription error:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: 'Something went wrong. Please try again later.'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
