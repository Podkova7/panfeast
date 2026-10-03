// scripts/batch-2025/generate.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { batch1 } from './batch1.mjs';
import { batch2 } from './batch2.mjs';
import { batch3 } from './batch3.mjs';
import { batch4 } from './batch4.mjs';

const allArticles = [...batch1, ...batch2, ...batch3, ...batch4];

console.log(`Loaded ${allArticles.length} articles across batches 1-4.`);

if (allArticles.length !== 20) {
  console.error(`Expected 20 articles, but got ${allArticles.length}`);
  process.exit(1);
}

const postsDir = resolve(process.cwd(), 'src/content/posts');
const dataDir = resolve(process.cwd(), 'src/data');
mkdirSync(postsDir, { recursive: true });
mkdirSync(dataDir, { recursive: true });

const manifest = [];

for (const [index, article] of allArticles.entries()) {
  const wordCount = article.body.trim().split(/\s+/).length;
  console.log(`[${index + 1}/20] ${article.slug} (${article.publishDate.slice(0, 10)}) - ${wordCount} words - ${article.category}`);

  const frontmatter = [
    '---',
    `title: ${JSON.stringify(article.title)}`,
    `slug: ${JSON.stringify(article.slug)}`,
    `seoTitle: ${JSON.stringify(article.seoTitle)}`,
    `publishDate: ${article.publishDate}`,
    `date: ${article.date || article.publishDate}`,
    `updatedDate: ${article.updatedDate || article.publishDate}`,
    `author: ${JSON.stringify(article.author)}`,
    `category: ${JSON.stringify(article.category)}`,
    `categories: ${JSON.stringify(article.categories)}`,
    `tags: ${JSON.stringify(article.tags)}`,
    `relatedSlugs: ${JSON.stringify(article.relatedSlugs)}`,
    `description: ${JSON.stringify(article.description)}`,
    `featuredImageAlt: ${JSON.stringify(article.featuredImageAlt)}`,
    `image: "/images/${article.slug}.jpg"`,
    `featuredImage: "/images/posts/${article.slug}.jpg"`,
    'draft: false',
    '---',
    '',
    article.body.trim(),
    ''
  ].join('\n');

  const filePath = resolve(postsDir, `${article.slug}.md`);
  writeFileSync(filePath, frontmatter, 'utf8');

  manifest.push({
    index: index + 1,
    title: article.title,
    seoTitle: article.seoTitle,
    slug: article.slug,
    publishDate: article.publishDate,
    category: article.category,
    categories: article.categories,
    tags: article.tags,
    author: article.author,
    primaryKeyword: article.primaryKeyword,
    wordCount,
    imagePrompt: article.imagePrompt,
    localImagePath: `/images/${article.slug}.jpg`,
    postsImagePath: `/images/posts/${article.slug}.jpg`,
    filePath: `src/content/posts/${article.slug}.md`,
  });
}

const manifestPath = resolve(dataDir, 'new-articles-manifest-2025.json');
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
console.log(`\n✅ Generated 20 markdown articles in src/content/posts/`);
console.log(`✅ Saved manifest to ${manifestPath}`);
