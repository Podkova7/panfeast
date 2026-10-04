import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../consts';
import { AUTHORS } from '../lib/authors';

export const GET: APIRoute = async () => {
  const posts = await getCollection('posts', ({ data }) => !data.draft && !data.noindex);
  const sortedPosts = posts.sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf(),
  );

  const urls: Array<{ loc: string; lastmod?: string; priority?: string }> = [];

  // 1. Homepage
  urls.push({
    loc: `${SITE.url}/`,
    priority: '1.0',
  });

  // 2. Core informational pages
  const staticPages = [
    '/about/',
    '/contact-us/',
    '/cookies-privacy-policy/',
    '/terms-and-conditions/',
    '/editorial-policy/',
    '/cookie-policy/',
  ];
  for (const page of staticPages) {
    urls.push({
      loc: `${SITE.url}${page}`,
      priority: '0.8',
    });
  }

  // 3. 7 Active Categories
  const canonicalCategories = [
    'app-reviews',
    'apple-ecosystem',
    'apple-watch',
    'ios-guides',
    'iphone-tips',
    'mac-macos',
    'news',
  ];
  for (const cat of canonicalCategories) {
    urls.push({
      loc: `${SITE.url}/category/${cat}/`,
      priority: '0.9',
    });
  }

  // 4. Authors
  urls.push({
    loc: `${SITE.url}/authors/`,
    priority: '0.6',
  });
  for (const authorSlug of Object.keys(AUTHORS)) {
    urls.push({
      loc: `${SITE.url}/author/${authorSlug}/`,
      priority: '0.6',
    });
  }

  // 5. Articles
  for (const post of sortedPosts) {
    const dates = [post.data.updatedDate, post.data.publishDate].filter(Boolean);
    const lastmod = dates.length
      ? new Date(Math.max(...dates.map((d) => d!.valueOf()))).toISOString()
      : undefined;

    urls.push({
      loc: `${SITE.url}/${post.data.slug}/`,
      lastmod,
      priority: '0.8',
    });
  }

  // Sort alphabetically by loc
  urls.sort((a, b) => a.loc.localeCompare(b.loc));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}${u.priority ? `\n    <priority>${u.priority}</priority>` : ''}
  </url>`,
  )
  .join('\n')}
</urlset>`.trim();

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
