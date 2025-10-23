import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    // Extract form data
    const data = {
      painPoint: formData.get('painPoint'),
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      company: formData.get('company'),
      preferredDate: formData.get('preferredDate'),
      preferredTime: formData.get('preferredTime'),
      notes: formData.get('notes'),
      privacy: formData.get('privacy') === 'on',
      timestamp: new Date().toISOString(),
      type: 'demo'
    };

    // Validate required fields
    if (!data.painPoint || !data.firstName || !data.lastName || !data.email || !data.phone || !data.company || !data.preferredDate || !data.preferredTime) {
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

    // Validate date is in the future
    const preferredDate = new Date(data.preferredDate as string);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (preferredDate < today) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Selecteer een datum in de toekomst'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Log the demo booking (in production, schedule calendar event and send confirmations)
    console.log('Demo booking:', data);

    // In a real implementation, you would:
    // 1. Check availability in calendar
    // 2. Schedule calendar event
    // 3. Send confirmation emails
    // 4. Add to CRM system

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Demo succesvol ingepland! Je ontvangt een bevestiging per email.'
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Demo booking error:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: 'Er is iets misgegaan bij het inplannen van de demo. Probeer het later opnieuw.'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
