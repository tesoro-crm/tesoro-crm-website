import type { APIRoute } from 'astro';

/**
 * Cloudflare AI Search API Endpoint
 *
 * This endpoint connects to Cloudflare AI Search (RAG) to search through
 * the indexed content (37 pages) and return relevant results.
 *
 * Prerequisites:
 * - AI Search binding must be configured in Cloudflare Pages dashboard
 * - Binding name: AI_SEARCH
 * - Go to: Pages Project → Settings → Functions → Bindings → Add AI Search
 */

// Mark as server-rendered to enable POST requests
export const prerender = false;

interface SearchResult {
  metadata?: {
    title?: string;
    url?: string;
  };
  title?: string;
  url?: string;
  content?: string;
  excerpt?: string;
  score?: number;
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    // Parse request body with error handling
    let query: string;
    try {
      const body = await request.json();
      query = body.query;
    } catch {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid JSON in request body',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate query
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Query is required',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Check if AI Search binding exists
    // @ts-expect-error - Runtime binding from Cloudflare Pages
    if (!locals?.runtime?.env?.AI_SEARCH) {
      console.error('AI Search binding not found. Please configure it in Cloudflare Dashboard.');

      // Fallback response when binding is not configured
      return new Response(
        JSON.stringify({
          success: false,
          error: 'AI Search is not configured. Using fallback mode.',
          fallback: true,
          results: [],
        }),
        {
          status: 503, // Service Unavailable
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Call Cloudflare AI Search
    // @ts-expect-error - Runtime binding from Cloudflare Pages
    const searchResponse = await locals.runtime.env.AI_SEARCH.search(query, {
      limit: 5, // Return top 5 results
      returnMetadata: true, // Include metadata like title, url, etc.
    });

    // Transform the response for the chat widget
    const results = searchResponse.results?.map((result: SearchResult) => ({
      title: result.metadata?.title || result.title || 'Untitled',
      url: result.metadata?.url || result.url || '#',
      excerpt: result.content || result.excerpt || '',
      score: result.score || 0,
    })) || [];

    return new Response(
      JSON.stringify({
        success: true,
        query,
        results,
        total: results.length,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('AI Search error:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred while searching',
        fallback: true,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
