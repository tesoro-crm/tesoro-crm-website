import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    // Extract form data
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      subject: formData.get('subject'),
      message: formData.get('message'),
      privacy: formData.get('privacy') === 'on',
      timestamp: new Date().toISOString(),
      type: 'contact'
    };

    // Validate required fields
    if (!data.firstName || !data.lastName || !data.email || !data.subject || !data.message) {
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

    // Log the contact form submission (in production, send email or save to CRM)
    console.log('Contact form submission:', data);

    // In a real implementation, you would:
    // 1. Send email to sales team
    // 2. Save to CRM system
    // 3. Send confirmation email to user
    // 4. Create support ticket

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Bedankt voor je bericht! We nemen binnen 24 uur contact met je op.'
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Contact form error:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: 'Er is iets misgegaan. Probeer het later opnieuw.'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
