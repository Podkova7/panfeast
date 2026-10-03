#!/usr/bin/env node
/**
 * fetch-images.js
 * 
 * Automatically generates and downloads 16:9 featured images for the 20 new articles
 * using the Cloudflare Worker endpoint:
 * https://free-image-generator.youssef-eloud.workers.dev/
 * 
 * Usage:
 *   # Windows PowerShell:
 *   $env:WORKER_API_KEY="your_secret_api_key_here"
 *   node fetch-images.js
 * 
 *   # Bash / macOS / Linux:
 *   WORKER_API_KEY="your_secret_api_key_here" node fetch-images.js
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const WORKER_ENDPOINT = 'https://free-image-generator.youssef-eloud.workers.dev/';
const API_KEY = process.env.WORKER_API_KEY;

if (!API_KEY) {
  console.error('\x1b[31m[ERROR] WORKER_API_KEY environment variable is required!\x1b[0m');
  console.error('\nPlease provide your Cloudflare Worker API key before running:\n');
  console.error('  # Windows PowerShell:');
  console.error('  $env:WORKER_API_KEY="your_api_key_here"');
  console.error('  node fetch-images.js\n');
  console.error('  # Bash / Command Prompt / macOS / Linux:');
  console.error('  WORKER_API_KEY="your_api_key_here" node fetch-images.js\n');
  process.exit(1);
}

const force = process.argv.includes('--force');
const manifestArgIndex = process.argv.indexOf('--manifest');
let manifestPath = manifestArgIndex !== -1 ? resolve(process.cwd(), process.argv[manifestArgIndex + 1]) : resolve(process.cwd(), 'src/data/new-articles-manifest-2025.json');

if (!existsSync(manifestPath)) {
  manifestPath = resolve(process.cwd(), 'src/data/new-articles-manifest-2026.json');
}
if (!existsSync(manifestPath)) {
  manifestPath = resolve(process.cwd(), 'src/data/new-articles-manifest.json');
}

if (!existsSync(manifestPath)) {
  console.error(`\x1b[31m[ERROR] Manifest not found. Run 'node scripts/batch-2025/generate.mjs' first.\x1b[0m`);
  process.exit(1);
}

const articles = JSON.parse(readFileSync(manifestPath, 'utf8'));

// Prepare output directories
const publicImagesDir = resolve(process.cwd(), 'public/images');
const publicPostsImagesDir = resolve(process.cwd(), 'public/images/posts');
mkdirSync(publicImagesDir, { recursive: true });
mkdirSync(publicPostsImagesDir, { recursive: true });

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchImageWithRetry(prompt, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(WORKER_ENDPOINT, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'Accept': 'image/jpeg, image/*, */*',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => '');
        throw new Error(`HTTP ${response.status} ${response.statusText}${errorText ? ` - ${errorText}` : ''}`);
      }

      const contentType = response.headers.get('content-type') || '';
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      if (buffer.length < 1000) {
        // If response is too small, it might be an error JSON or empty body
        const text = buffer.toString('utf8');
        throw new Error(`Received unexpectedly small response (${buffer.length} bytes): ${text}`);
      }

      return { buffer, contentType };
    } catch (err) {
      if (attempt === retries) throw err;
      console.warn(`    ⚠️ Attempt ${attempt} failed: ${err.message}. Retrying in 2s...`);
      await sleep(2000);
    }
  }
}

async function main() {
  console.log('='.repeat(70));
  console.log(' Cloudflare Worker Image Generator (20 Articles)');
  console.log(` Endpoint: ${WORKER_ENDPOINT}`);
  console.log(` Output Directory: public/images/ and public/images/posts/`);
  console.log('='.repeat(70));

  let successCount = 0;
  let skippedCount = 0;
  const failed = [];

  for (const [idx, item] of articles.entries()) {
    const primaryFile = resolve(publicImagesDir, `${item.slug}.jpg`);
    const postsFile = resolve(publicPostsImagesDir, `${item.slug}.jpg`);

    console.log(`\n[${idx + 1}/20] Processing: ${item.slug}`);
    console.log(`     Prompt: "${item.imagePrompt.slice(0, 80)}..."`);

    // Check if image already exists
    if (!force && existsSync(primaryFile) && existsSync(postsFile)) {
      console.log(`     ℹ️ Image already exists locally. Skipping (use --force to overwrite).`);
      skippedCount++;
      continue;
    }

    try {
      const startTime = Date.now();
      const { buffer } = await fetchImageWithRetry(item.imagePrompt);
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

      // Save to both /public/images/ and /public/images/posts/
      writeFileSync(primaryFile, buffer);
      writeFileSync(postsFile, buffer);

      // Automatically update frontmatter of the markdown file
      const postPath = resolve(process.cwd(), item.filePath || `src/content/posts/${item.slug}.md`);
      if (existsSync(postPath)) {
        let content = readFileSync(postPath, 'utf8');
        if (!content.includes(`image: "/images/${item.slug}.jpg"`)) {
          if (content.includes('featuredImage:')) {
            content = content.replace(/^featuredImage:\s*.*$/m, `image: "/images/${item.slug}.jpg"\nfeaturedImage: "/images/posts/${item.slug}.jpg"`);
          } else {
            content = content.replace(/^featuredImageAlt:\s*.*$/m, (match) => `${match}\nimage: "/images/${item.slug}.jpg"\nfeaturedImage: "/images/posts/${item.slug}.jpg"`);
          }
          writeFileSync(postPath, content, 'utf8');
        }
      }

      const sizeKb = (buffer.length / 1024).toFixed(1);
      console.log(`     ✅ Saved: /images/${item.slug}.jpg & /images/posts/${item.slug}.jpg (${sizeKb} KB in ${elapsed}s)`);
      successCount++;

      // Polite delay between generation requests
      if (idx < articles.length - 1) {
        await sleep(1000);
      }
    } catch (err) {
      console.error(`     ❌ Generation failed: ${err.message}`);
      failed.push({ slug: item.slug, error: err.message });
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log(' Image Generation Run Complete');
  console.log(`   - Successfully downloaded: ${successCount}`);
  console.log(`   - Already present:         ${skippedCount}`);
  console.log(`   - Failed:                  ${failed.length}`);
  console.log('='.repeat(70));

  if (failed.length > 0) {
    console.log('\nFailed articles:');
    for (const f of failed) {
      console.log(` - ${f.slug}: ${f.error}`);
    }
  } else {
    console.log('\nAll 20 images are ready in public/images/ and public/images/posts/!');
  }
}

main().catch((err) => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
