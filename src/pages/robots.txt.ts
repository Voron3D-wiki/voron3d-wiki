import type { APIRoute } from 'astro';
import { IS_PRODUCTION } from '~/lib/site-env.mjs';

// Production invites crawlers and points at the sitemap. Anything else — the
// dev deploy, a preview — tells them to stay out, so a full duplicate of the
// wiki never competes with the real one in search results.
export const GET: APIRoute = ({ site }) =>
  new Response(
    IS_PRODUCTION
      ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site)}\n`
      : `# Non-production deploy — do not index.\nUser-agent: *\nDisallow: /\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
