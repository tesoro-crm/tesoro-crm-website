import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    // Extract form data
    const data = {
      plan: formData.get('plan'),
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
      companyName: formData.get('companyName'),
      phone: formData.get('phone'),
      companyType: formData.get('companyType'),
      terms: formData.get('terms') === 'on',
      privacy: formData.get('privacy') === 'on',
      marketing: formData.get('marketing') === 'on',
      timestamp: new Date().toISOString(),
      type: 'signup'
    };

    // Validate required fields
    if (!data.plan || !data.firstName || !data.lastName || !data.email ||
        !data.password || !data.companyName || !data.phone || !data.companyType) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Ontbrekende verplichte velden'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate legal agreements
    if (!data.terms || !data.privacy) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Je moet akkoord gaan met de voorwaarden en privacybeleid'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email as string)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Ongeldig e-mailadres'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Password validation
    if ((data.password as string).length < 8) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Wachtwoord moet minimaal 8 karakters bevatten'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    if (data.password !== data.confirmPassword) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Wachtwoorden komen niet overeen'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Log the signup (in production, create user account and send welcome email)
    console.log('User signup:', {
      ...data,
      password: '[REDACTED]' // Don't log passwords
    });

    // In a real implementation, you would:
    // 1. Create user account in database
    // 2. Send verification email
    // 3. Set up trial period
    // 4. Initialize user workspace
    // 5. Send welcome email with next steps

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Account succesvol aangemaakt! Controleer je email voor de bevestiging.',
        redirect: '/welcome'
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Signup error:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: 'Er is iets misgegaan bij het aanmaken van je account. Probeer het later opnieuw.'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
