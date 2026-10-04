import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = process.cwd();
const distDir = resolve(projectRoot, 'dist');
const sitemap0Path = resolve(distDir, 'sitemap-0.xml');
const sitemapXmlPath = resolve(distDir, 'sitemap.xml');
const sitemapIndexPath = resolve(distDir, 'sitemap-index.xml');

if (!existsSync(sitemap0Path)) {
  console.error('❌ dist/sitemap-0.xml not found! Cannot sync sitemaps.');
  process.exit(1);
}

const rawXml = readFileSync(sitemap0Path, 'utf8');

// Extract all <url> entries
const urlBlocks = [...rawXml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(m => m[0]);

if (urlBlocks.length === 0) {
  console.error('❌ No <url> entries found in dist/sitemap-0.xml!');
  process.exit(1);
}

// Pretty-print and add XSL stylesheet reference
const formattedUrls = urlBlocks.map(block => {
  const loc = block.match(/<loc>(.*?)<\/loc>/)?.[1] || '';
  const lastmod = block.match(/<lastmod>(.*?)<\/lastmod>/)?.[1] || '';
  const priority = block.match(/<priority>(.*?)<\/priority>/)?.[1] || (loc === 'https://panfeast.com/' ? '1.0' : loc.includes('/category/') ? '0.9' : '0.8');

  let res = '  <url>\n    <loc>' + loc + '</loc>';
  if (lastmod) res += '\n    <lastmod>' + lastmod + '</lastmod>';
  res += '\n    <priority>' + priority + '</priority>';
  res += '\n  </url>';
  return res;
}).join('\n');

const fullSitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${formattedUrls}
</urlset>
`;

// Write to dist/sitemap.xml, dist/sitemap-index.xml, and dist/sitemap-0.xml
writeFileSync(sitemapXmlPath, fullSitemapXml, 'utf8');
writeFileSync(sitemapIndexPath, fullSitemapXml, 'utf8');
writeFileSync(sitemap0Path, fullSitemapXml, 'utf8');

console.log('='.repeat(70));
console.log(`✅ SITEMAP SYNC COMPLETE: ${urlBlocks.length} URLs populated across:`);
console.log(`   - dist/sitemap.xml (with /sitemap.xsl styling)`);
console.log(`   - dist/sitemap-index.xml (with /sitemap.xsl styling)`);
console.log(`   - dist/sitemap-0.xml (with /sitemap.xsl styling)`);
console.log('='.repeat(70));
