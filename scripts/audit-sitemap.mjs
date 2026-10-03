import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = process.cwd();
const distDir = resolve(projectRoot, 'dist');

console.log('='.repeat(70));
console.log(' SITEMAP AUDIT & HEALTH CHECK');
console.log('='.repeat(70));

const filesToCheck = [
  'robots.txt',
  'sitemap-index.xml',
  'sitemap.xml',
  'sitemap-0.xml'
];

let allPassed = true;

// 1. Check file existence in dist/
for (const file of filesToCheck) {
  const filePath = resolve(distDir, file);
  const exists = existsSync(filePath);
  console.log(`[File Exists] dist/${file}: ${exists ? '✅ YES' : '❌ NO'}`);
  if (!exists) allPassed = false;
}

// 2. Validate robots.txt
const robotsTxt = readFileSync(resolve(distDir, 'robots.txt'), 'utf8');
console.log('\n--- robots.txt content ---');
console.log(robotsTxt.trim());
console.log('--------------------------');
const sitemapDirectives = robotsTxt.match(/^Sitemap:\s*(.+)$/gm);
console.log(`Found ${sitemapDirectives?.length || 0} valid Sitemap directives in robots.txt:`);
sitemapDirectives?.forEach(d => console.log(`  ${d}`));

if (!sitemapDirectives || sitemapDirectives.length === 0) {
  console.error('❌ robots.txt is missing valid Sitemap directives!');
  allPassed = false;
}

// 3. Validate sitemap-index.xml
const sitemapIndexXml = readFileSync(resolve(distDir, 'sitemap-index.xml'), 'utf8');
const sitemapIndexMatches = [...sitemapIndexXml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
console.log(`\n[sitemap-index.xml] references ${sitemapIndexMatches.length} sub-sitemap(s):`);
sitemapIndexMatches.forEach(loc => console.log(`  - ${loc}`));

// 4. Validate sitemap.xml
const sitemapXml = readFileSync(resolve(distDir, 'sitemap.xml'), 'utf8');
const sitemapMatches = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
console.log(`\n[sitemap.xml] references ${sitemapMatches.length} sub-sitemap(s):`);
sitemapMatches.forEach(loc => console.log(`  - ${loc}`));

// 5. Validate sitemap-0.xml
const sitemap0Xml = readFileSync(resolve(distDir, 'sitemap-0.xml'), 'utf8');
const urlEntries = [...sitemap0Xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(m => {
  const loc = m[1].match(/<loc>(.*?)<\/loc>/)?.[1];
  const lastmod = m[1].match(/<lastmod>(.*?)<\/lastmod>/)?.[1];
  return { loc, lastmod };
});

console.log(`\n[sitemap-0.xml] contains ${urlEntries.length} URL entries.`);

// 6. Check that every URL points to a generated HTML file in dist/
let missingPages = 0;
let articleCount = 0;
let categoryCount = 0;
let authorCount = 0;

for (const entry of urlEntries) {
  if (!entry.loc) continue;
  const urlObj = new URL(entry.loc);
  const pathname = urlObj.pathname;
  
  // Convert URL to file path in dist
  let relativePath = pathname === '/' ? 'index.html' : `${pathname.replace(/^\/|\/$/g, '')}/index.html`;
  const htmlPath = resolve(distDir, relativePath);
  
  if (!existsSync(htmlPath)) {
    console.error(`❌ Sitemap URL missing from dist: ${entry.loc} -> ${relativePath}`);
    missingPages++;
    allPassed = false;
  }

  if (pathname.startsWith('/category/')) categoryCount++;
  else if (pathname.startsWith('/author/') || pathname === '/authors/') authorCount++;
  else if (pathname.length > 1 && !['about', 'contact-us', 'cookie-policy', 'cookies-privacy-policy', 'editorial-policy', 'terms-and-conditions'].includes(pathname.replace(/\//g, ''))) {
    articleCount++;
  }
}

const expectedArticles = readdirSync(resolve(projectRoot, 'src/content/posts')).filter(f => f.endsWith('.md')).length;

console.log(`\nBreakdown of URLs in sitemap-0.xml:`);
console.log(`  - Articles:       ${articleCount} (Expected: ${expectedArticles})`);
console.log(`  - Categories:     ${categoryCount}`);
console.log(`  - Authors:        ${authorCount}`);
console.log(`  - Total URLs:     ${urlEntries.length}`);
console.log(`  - Missing Pages:  ${missingPages}`);

if (missingPages > 0 || articleCount !== expectedArticles) {
  allPassed = false;
}

console.log('\n' + '='.repeat(70));
console.log(`OVERALL SITEMAP STATUS: ${allPassed ? '✅ 100% WORKING & VALID' : '❌ ISSUES DETECTED'}`);
console.log('='.repeat(70));
