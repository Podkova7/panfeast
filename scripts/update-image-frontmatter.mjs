import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const manifestPath = resolve(process.cwd(), 'src/data/new-articles-manifest.json');
const articles = JSON.parse(readFileSync(manifestPath, 'utf8'));

console.log('Updating frontmatter of the 20 generated articles with local image paths...\n');

let updated = 0;

for (const item of articles) {
  const filePath = resolve(process.cwd(), item.filePath);
  if (!existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    continue;
  }

  let content = readFileSync(filePath, 'utf8');

  // We set both featuredImage (standard in this repo) and image (requested in prompt)
  const imageField = `image: "/images/${item.slug}.jpg"\nfeaturedImage: "/images/posts/${item.slug}.jpg"`;

  if (content.includes('featuredImage:')) {
    content = content.replace(/^featuredImage:\s*.*$/m, `featuredImage: "/images/posts/${item.slug}.jpg"`);
  } else {
    content = content.replace(
      /^featuredImageAlt:\s*.*$/m,
      `featuredImageAlt: "${item.title}"\n${imageField}`
    );
  }

  writeFileSync(filePath, content, 'utf8');
  console.log(`[${++updated}/20] Updated frontmatter for: ${item.slug}.md`);
}

console.log(`\nSuccessfully updated ${updated} articles!`);
