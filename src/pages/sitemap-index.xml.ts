import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../consts';

export const GET: APIRoute = async () => {
  const posts = await getCollection('posts', ({ data }) => !data.draft && !data.noindex);
  const dates = posts.flatMap((p) => [p.data.publishDate, p.data.updatedDate]).filter(Boolean);
  const latestDate = dates.length ? new Date(Math.max(...dates.map((d) => d!.valueOf()))) : new Date();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE.url}/sitemap-0.xml</loc>
    <lastmod>${latestDate.toISOString()}</lastmod>
  </sitemap>
</sitemapindex>`.trim();

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
