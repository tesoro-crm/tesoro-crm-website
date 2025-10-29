import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    console.log('=== Newsletter API called ===');

    const formData = await request.formData();
    const email = formData.get('email') as string;
    const language = formData.get('language') as string || 'es'; // Default to Spanish

    console.log('Email:', email);
    console.log('Language:', language);

    // Validate email
    if (!email) {
      console.log('Error: Email is required');
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Email is required',
          debug: 'No email provided in form data'
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
      console.log('Error: Invalid email format');
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid email address',
          debug: `Email format validation failed: ${email}`
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Get Mailgun credentials from environment variables
    const MAILGUN_API_KEY = import.meta.env.MG_NEWSLETTER_API_KEY || import.meta.env.MAILGUN_API_KEY;
    const MAILGUN_DOMAIN = import.meta.env.MAILGUN_DOMAIN;
    const MAILGUN_MAILING_LIST = import.meta.env.MAILGUN_MAILING_LIST || 'newsletter@' + MAILGUN_DOMAIN;

    console.log('MG_NEWSLETTER_API_KEY exists?', !!import.meta.env.MG_NEWSLETTER_API_KEY);
    console.log('MAILGUN_API_KEY exists?', !!import.meta.env.MAILGUN_API_KEY);
    console.log('MAILGUN_DOMAIN:', MAILGUN_DOMAIN);
    console.log('MAILGUN_MAILING_LIST:', MAILGUN_MAILING_LIST);
    console.log('Using API key from:', import.meta.env.MG_NEWSLETTER_API_KEY ? 'MG_NEWSLETTER_API_KEY' : 'MAILGUN_API_KEY');

    if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN) {
      console.error('Mailgun credentials not configured');
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Newsletter service not configured',
          debug: {
            hasApiKey: !!MAILGUN_API_KEY,
            hasDomain: !!MAILGUN_DOMAIN,
            domain: MAILGUN_DOMAIN,
            mailingList: MAILGUN_MAILING_LIST
          }
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

    console.log('Mailgun URL:', mailgunUrl);
    console.log('Request body:', {
      address: email,
      subscribed: 'yes',
      upsert: 'yes',
      vars: JSON.stringify({
        language: language,
        signup_date: new Date().toISOString(),
        source: 'website_footer'
      })
    });

    const response = await fetch(mailgunUrl, {
      method: 'POST',
      headers: {
        'Authorization': auth,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        address: email,
        subscribed: 'yes',
        upsert: 'yes', // Update if already exists
        vars: JSON.stringify({
          language: language,
          signup_date: new Date().toISOString(),
          source: 'website_footer'
        })
      })
    });

    console.log('Mailgun response status:', response.status);
    console.log('Mailgun response ok?', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Mailgun API error response:', errorText);

      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        errorData = { message: errorText };
      }

      // Check if already subscribed
      if (errorData.message && errorData.message.includes('already exists')) {
        console.log('User already subscribed');
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
          error: 'Failed to subscribe to newsletter',
          debug: {
            status: response.status,
            statusText: response.statusText,
            mailgunError: errorData,
            url: mailgunUrl
          }
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const successData = await response.json();
    console.log('Newsletter subscription successful:', email, 'Language:', language);
    console.log('Mailgun success response:', successData);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Thank you for subscribing!',
        debug: {
          email: email,
          language: language,
          mailgunResponse: successData
        }
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');

    return new Response(
      JSON.stringify({
        success: false,
        error: 'Something went wrong. Please try again later.',
        debug: {
          errorMessage: error instanceof Error ? error.message : String(error),
          errorType: error instanceof Error ? error.constructor.name : typeof error
        }
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
