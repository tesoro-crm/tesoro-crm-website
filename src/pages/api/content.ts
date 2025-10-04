import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';

export const GET: APIRoute = async ({ url }) => {
  const filePath = url.searchParams.get('path');
  
  if (!filePath) {
    return new Response(JSON.stringify({ error: 'Missing path parameter' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const projectRoot = process.cwd();
    const fullPath = path.join(projectRoot, filePath);
    
    // Security check: ensure path is within project
    if (!fullPath.startsWith(projectRoot)) {
      return new Response(JSON.stringify({ error: 'Invalid path' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const content = await fs.readFile(fullPath, 'utf-8');
    
    return new Response(JSON.stringify({ content }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'File not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
