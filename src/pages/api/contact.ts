import type { APIRoute } from 'astro';

// Localized messages
const messages = {
  es: {
    missing_fields: 'Faltan campos obligatorios',
    invalid_email: 'Dirección de correo electrónico no válida',
    generic_error: 'Algo salió mal. Por favor, inténtalo de nuevo más tarde.',
    success: '¡Gracias por tu mensaje! Nos pondremos en contacto contigo en 24 horas.'
  },
  en: {
    missing_fields: 'Missing required fields',
    invalid_email: 'Invalid email address',
    generic_error: 'Something went wrong. Please try again later.',
    success: "Thank you for your message! We'll get back to you within 24 hours."
  },
  nl: {
    missing_fields: 'Ontbrekende verplichte velden',
    invalid_email: 'Ongeldig e-mailadres',
    generic_error: 'Er is iets misgegaan. Probeer het later opnieuw.',
    success: 'Bedankt voor je bericht! We nemen binnen 24 uur contact met je op.'
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const language = (formData.get('language') as string) || 'es'; // Default to Spanish

    // Get localized messages
    const locale = language as keyof typeof messages;
    const msg = messages[locale] || messages.es;

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
      type: 'contact',
      language: language
    };

    // Validate required fields
    if (!data.firstName || !data.lastName || !data.email || !data.subject || !data.message) {
      return new Response(
        JSON.stringify({
          success: false,
          error: msg.missing_fields
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
          error: msg.invalid_email
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
        message: msg.success
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    const language = 'es'; // Default fallback
    const locale = language as keyof typeof messages;
    const msg = messages[locale];

    return new Response(
      JSON.stringify({
        success: false,
        error: msg.generic_error
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
