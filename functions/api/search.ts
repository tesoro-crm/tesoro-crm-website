/**
 * Cloudflare Worker Proxy for AI Search
 * 
 * This worker acts as a secure proxy between the frontend and Cloudflare AI Search API.
 * Benefits:
 * - No CORS issues
 * - API token stays secure (not exposed to browser)
 * - Rate limiting and caching can be added here
 */

interface Env {
  CLOUDFLARE_ACCOUNT_ID?: string;
  CLOUDFLARE_AI_SEARCH_TOKEN?: string;
}

interface PagesContext {
  request: Request;
  env: Env;
  params: Record<string, string>;
  waitUntil: (promise: Promise<unknown>) => void;
  next: () => Promise<Response>;
}

interface AISearchRequest {
  query: string;
}

interface AISearchResult {
  url: string;
  title: string;
  excerpt: string;
  score?: number;
}

interface AISearchResponse {
  success: boolean;
  result?: {
    results: AISearchResult[];
  };
  errors?: Array<{ message: string }>;
}

export const onRequestPost = async (context: PagesContext): Promise<Response> => {
  const { request, env } = context;

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse request body
    const body = await request.json() as AISearchRequest;
    const { query } = body;

    if (!query || typeof query !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Query parameter is required' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Call Cloudflare AI Search API
    const accountId = env.CLOUDFLARE_ACCOUNT_ID || '565f7b099257d757fdc9732c9190e345';
    const apiToken = env.CLOUDFLARE_AI_SEARCH_TOKEN || 'AHbmkEy1hUsEjTs-pwyRxfJbQM9qqNWR6X5102MD';
    
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/autorag/rags/tesoro-crm-hq-search/ai-search`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiToken}`,
        },
        body: JSON.stringify({ query }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Search API error:', errorText);
      
      return new Response(
        JSON.stringify({ 
          error: 'AI Search API request failed',
          details: errorText 
        }),
        { 
          status: response.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const data = await response.json() as AISearchResponse;

    // Return results
    return new Response(
      JSON.stringify(data),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Worker error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
};
