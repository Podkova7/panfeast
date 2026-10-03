import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { batch1 } from './new-articles/batch1.mjs';
import { batch2 } from './new-articles/batch2.mjs';
import { batch3 } from './new-articles/batch3.mjs';
import { batch4 } from './new-articles/batch4.mjs';

const allArticles = [...batch1, ...batch2, ...batch3, ...batch4];

if (allArticles.length !== 20) {
  throw new Error(`Expected exactly 20 articles, but received ${allArticles.length}`);
}

const postsDir = resolve(process.cwd(), 'src/content/posts');
mkdirSync(postsDir, { recursive: true });

function formatArticle(item) {
  const frontmatter = [
    '---',
    `title: ${JSON.stringify(item.title)}`,
    `slug: ${JSON.stringify(item.slug)}`,
    `seoTitle: ${JSON.stringify(item.seoTitle)}`,
    `publishDate: ${item.publishDate}`,
    `updatedDate: ${item.publishDate}`,
    `author: ${JSON.stringify(item.author)}`,
    `category: ${JSON.stringify(item.category)}`,
    `categories: ${JSON.stringify(item.categories)}`,
    `tags: ${JSON.stringify(item.tags)}`,
    `relatedSlugs: ${JSON.stringify(item.relatedSlugs)}`,
    `description: ${JSON.stringify(item.description)}`,
    `featuredImageAlt: ${JSON.stringify(item.featuredImageAlt)}`,
    'draft: false',
    '---',
  ].join('\n');

  return `${frontmatter}\n${item.body.trim()}\n`;
}

console.log(`Generating ${allArticles.length} new articles into src/content/posts/...`);

const manifest = [];

for (const [index, article] of allArticles.entries()) {
  const filePath = resolve(postsDir, `${article.slug}.md`);
  const content = formatArticle(article);
  writeFileSync(filePath, content, 'utf8');

  // Count plain words
  const plain = article.body
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    .replace(/[*_`>#|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const wordCount = plain.split(' ').length;

  manifest.push({
    index: index + 1,
    title: article.title,
    seoTitle: article.seoTitle,
    slug: article.slug,
    publishDate: article.publishDate,
    category: article.category,
    author: article.author,
    primaryKeyword: article.primaryKeyword,
    wordCount,
    imagePrompt: article.imagePrompt,
    localImagePath: `/images/${article.slug}.jpg`,
    postsImagePath: `/images/posts/${article.slug}.jpg`,
    filePath: `src/content/posts/${article.slug}.md`,
  });

  console.log(`[${index + 1}/20] Written: ${article.slug}.md (~${wordCount} words)`);
}

// Write the manifest to src/data/new-articles-manifest.json
const manifestPath = resolve(process.cwd(), 'src/data/new-articles-manifest.json');
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
console.log(`\nManifest successfully written to: ${manifestPath}`);
