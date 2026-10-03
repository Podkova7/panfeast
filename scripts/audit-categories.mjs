import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import manifest from '../src/data/new-articles-manifest.json' with { type: 'json' };

const postsDir = resolve(process.cwd(), 'src/content/posts');
const files = readdirSync(postsDir).filter(f => f.endsWith('.md'));

const newArticleSlugs = new Set(manifest.map(m => m.slug));

const categoryCounts = {};

for (const file of files) {
  const content = readFileSync(resolve(postsDir, file), 'utf8');
  const slug = content.match(/^slug:\s*["']?([^"'\r\n]+)["']?/m)?.[1]?.trim();
  const date = content.match(/^publishDate:\s*([^\r\n]+)/m)?.[1]?.trim();
  const category = content.match(/^category:\s*["']?([^"'\r\n]+)["']?/m)?.[1]?.trim();
  categoryCounts[category] = (categoryCounts[category] || 0) + 1;
}

console.log('='.repeat(50));
console.log(`TOTAL ARTICLES: ${files.length}`);
console.log('='.repeat(50));
console.table(categoryCounts);

let allValid = true;
for (const [cat, count] of Object.entries(categoryCounts)) {
  if (count < 5) {
    console.error(`❌ Category '${cat}' has fewer than 5 articles: ${count}`);
    allValid = false;
  }
}

if (allValid) {
  console.log('✅ ALL CATEGORIES STRICTLY MEET THE >= 5 REQUIREMENT!');
}

