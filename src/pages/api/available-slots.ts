/**
 * Astro API Route to fetch available booking slots from Zoho Bookings
 */
import type { APIRoute } from 'astro';

interface ZohoTokenResponse {
  access_token: string;
  expires_in: number;
}

/**
 * Get Zoho access token using refresh token
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

export const GET: APIRoute = async ({ request, url, locals }) => {
  try {
    // Access environment variables from Cloudflare runtime
    const runtime = (locals as any).runtime;
    const env = runtime?.env || {};

    const zohoClientId = env.ZOHO_CLIENT_ID;
    const zohoClientSecret = env.ZOHO_CLIENT_SECRET;
    const zohoRefreshToken = env.ZOHO_REFRESH_TOKEN;
    const zohoDatacenter = env.ZOHO_DATACENTER || 'com';
    const serviceId = env.ZOHO_BOOKINGS_SERVICE_ID;
    const staffId = env.ZOHO_BOOKINGS_STAFF_ID;

    // Validate required variables
    if (!zohoClientId || !zohoClientSecret || !zohoRefreshToken || !serviceId || !staffId) {
      return new Response(JSON.stringify({
        error: 'Server configuration error - Bookings not configured'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Get date from query params (format: YYYY-MM-DD)
    const selectedDate = url.searchParams.get('date');
    if (!selectedDate) {
      return new Response(JSON.stringify({ error: 'Missing date parameter' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Convert date format from YYYY-MM-DD to dd-MMM-yyyy (Zoho format)
    const date = new Date(selectedDate);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const zohoDate = `${day}-${month}-${year}`;

    // Get access token
    const accessToken = await getZohoAccessToken(
      zohoClientId,
      zohoClientSecret,
      zohoRefreshToken,
      zohoDatacenter
    );

    // Fetch available slots from Zoho Bookings API
    const slotsUrl = `https://www.zohoapis.${zohoDatacenter}/bookings/v1/json/availableslots?service_id=${serviceId}&staff_id=${staffId}&selected_date=${zohoDate}&timezone=Europe/Amsterdam`;

    const slotsResponse = await fetch(slotsUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
      },
    });

    if (!slotsResponse.ok) {
      const errorText = await slotsResponse.text();
      console.error('Zoho Bookings API error:', slotsResponse.status, errorText);
      throw new Error(`Zoho Bookings API failed: ${slotsResponse.status}`);
    }

    const slotsData = await slotsResponse.json();

    // Extract slots from Zoho response
    const slots = slotsData?.response?.returnvalue?.data || [];

    return new Response(JSON.stringify({
      success: true,
      date: selectedDate,
      slots: slots,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error fetching available slots:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
