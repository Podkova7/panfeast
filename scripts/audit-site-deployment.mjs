import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = process.cwd();
const postsDir = join(root, 'src/content/posts');
const publicDir = join(root, 'public');

console.log('='.repeat(60));
console.log('🔍 PANFEAST.COM - COMPREHENSIVE PRE-DEPLOYMENT AUDIT');
console.log('='.repeat(60));

const postFiles = readdirSync(postsDir).filter((f) => f.endsWith('.md'));
console.log(`\n📄 Total Articles Detected: ${postFiles.length}`);

// 1. Article frontmatter, images, and categories audit
const categoryCounts = {};
const allSlugs = new Set();
const missingImages = [];
const frontmatterErrors = [];
const internalLinkErrors = [];

for (const file of postFiles) {
  const content = readFileSync(join(postsDir, file), 'utf8');
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmMatch) {
    frontmatterErrors.push(`${file}: Missing YAML frontmatter`);
    continue;
  }
  const fm = fmMatch[1];
  const getField = (name) => {
    const m = fm.match(new RegExp(`^${name}:\\s*["']?([^"'\\r\\n]+)["']?`, 'm'));
    return m ? m[1].trim() : null;
  };

  const title = getField('title');
  const slug = getField('slug');
  const publishDate = getField('publishDate');
  const category = getField('category');
  const description = getField('description');
  const featuredImage = getField('featuredImage') || getField('image');

  if (!title) frontmatterErrors.push(`${file}: Missing title`);
  if (!slug) frontmatterErrors.push(`${file}: Missing slug`);
  if (!publishDate) frontmatterErrors.push(`${file}: Missing publishDate`);
  if (!category) frontmatterErrors.push(`${file}: Missing category`);
  if (!description) frontmatterErrors.push(`${file}: Missing description`);

  if (slug) allSlugs.add(slug);
  if (category) {
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  }

  // Check image on disk
  if (featuredImage) {
    const cleanImg = featuredImage.startsWith('/') ? featuredImage.slice(1) : featuredImage;
    const imgOnDisk = join(publicDir, cleanImg);
    if (!existsSync(imgOnDisk)) {
      missingImages.push(`${file}: Image not found at public/${cleanImg}`);
    }
  } else {
    missingImages.push(`${file}: No featuredImage/image frontmatter defined`);
  }

  // Check internal links in markdown body
  const body = content.slice(fmMatch[0].length);
  const links = [...body.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)];
  for (const [, , url] of links) {
    if (url.startsWith('/') && !url.startsWith('//')) {
      const path = url.split('?')[0].split('#')[0];
      // Check if it links to an article slug or a known section
      const seg = path.replace(/^\/|\/$/g, '');
      const isKnownRoute =
        path.startsWith('/category/') ||
        path.startsWith('/tag/') ||
        path.startsWith('/author/') ||
        path.startsWith('/images/') ||
        ['about', 'contact-us', 'cookies-privacy-policy', 'terms-and-conditions', 'editorial-policy', 'cookie-policy', 'authors', 'rss.xml', ''].includes(seg);
      
      if (!isKnownRoute && !allSlugs.has(seg)) {
        // We will do a second pass for slugs after collecting all
      }
    }
  }
}

// Second pass for internal slug links
for (const file of postFiles) {
  const content = readFileSync(join(postsDir, file), 'utf8');
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmMatch) continue;
  const body = content.slice(fmMatch[0].length);
  const links = [...body.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)];
  for (const [, text, url] of links) {
    if (url.startsWith('/') && !url.startsWith('//')) {
      const path = url.split('?')[0].split('#')[0];
      const seg = path.replace(/^\/|\/$/g, '');
      const isKnownRoute =
        path.startsWith('/category/') ||
        path.startsWith('/tag/') ||
        path.startsWith('/author/') ||
        path.startsWith('/images/') ||
        ['about', 'contact-us', 'cookies-privacy-policy', 'terms-and-conditions', 'editorial-policy', 'cookie-policy', 'authors', 'rss.xml', ''].includes(seg);
      
      if (!isKnownRoute && !allSlugs.has(seg)) {
        internalLinkErrors.push(`${file}: Broken link '[${text}](${url})' (target '${seg}' does not match any known post slug or route)`);
      }
    }
  }
}

console.log('\n📊 Category Distribution (Rule: Each category >= 5 articles):');
console.table(categoryCounts);
let categoryRulePassed = true;
for (const [cat, count] of Object.entries(categoryCounts)) {
  if (count < 5) {
    console.error(`❌ Category '${cat}' has shortfall: ${count} < 5`);
    categoryRulePassed = false;
  }
}
if (categoryRulePassed) {
  console.log('✅ ALL categories satisfy the strict >= 5 articles threshold!');
}

console.log('\n🖼️ Featured Asset Verification:');
if (missingImages.length === 0) {
  console.log(`✅ All ${postFiles.length} articles have verified featured image assets on disk in public/images/!`);
} else {
  console.error(`❌ Found ${missingImages.length} missing image references:`);
  missingImages.forEach((err) => console.error('  - ' + err));
}

console.log('\n🔗 Internal Article Link Verification:');
if (internalLinkErrors.length === 0) {
  console.log('✅ All internal contextual markdown links resolve to valid published articles or active routes!');
} else {
  console.error(`❌ Found ${internalLinkErrors.length} broken internal links:`);
  internalLinkErrors.forEach((err) => console.error('  - ' + err));
}

// 2. Mandatory AdSense Administrative Pages Check
console.log('\n⚖️ AdSense Compliance: Mandatory Administrative Pages:');
const requiredPages = [
  { name: 'About Us', path: 'src/pages/about.astro', route: '/about/' },
  { name: 'Contact Us', path: 'src/pages/contact-us.astro', route: '/contact-us/' },
  { name: 'Privacy Policy', path: 'src/pages/cookies-privacy-policy.astro', route: '/cookies-privacy-policy/' },
  { name: 'Terms & Conditions', path: 'src/pages/terms-and-conditions.astro', route: '/terms-and-conditions/' },
  { name: 'Cookie Policy', path: 'src/pages/cookie-policy.astro', route: '/cookie-policy/' },
  { name: 'Editorial Policy', path: 'src/pages/editorial-policy.astro', route: '/editorial-policy/' },
];

let adminPagesPassed = true;
for (const page of requiredPages) {
  const fullPath = join(root, page.path);
  if (!existsSync(fullPath)) {
    console.error(`❌ Missing mandatory page: ${page.name} (${page.path})`);
    adminPagesPassed = false;
  } else {
    const src = readFileSync(fullPath, 'utf8');
    const wordCount = src.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
    if (wordCount < 100) {
      console.error(`⚠️ Page ${page.name} appears thin (${wordCount} words)`);
      adminPagesPassed = false;
    } else {
      console.log(`  ✓ ${page.name.padEnd(20)}: ${page.route.padEnd(25)} (${wordCount} words) - POPULATED`);
    }
  }
}

// Check footer links
const footerSrc = readFileSync(join(root, 'src/consts.ts'), 'utf8');
const footerLinksAllPresent = requiredPages.every((p) => footerSrc.includes(p.route));
if (footerLinksAllPresent) {
  console.log('✅ All mandatory AdSense policy and company pages are linked in FOOTER_LINKS!');
} else {
  console.error('❌ Some mandatory pages are missing from FOOTER_LINKS in src/consts.ts');
}

// 3. GitHub Pages & Static Export Configuration Check
console.log('\n🚀 GitHub Pages & Static Build Configuration:');
const cnamePath = join(root, 'public/CNAME');
if (existsSync(cnamePath)) {
  const cname = readFileSync(cnamePath, 'utf8').trim();
  if (cname === 'panfeast.com') {
    console.log(`  ✓ public/CNAME: '${cname}' (matches target custom domain)`);
  } else {
    console.error(`  ❌ public/CNAME contains '${cname}' instead of 'panfeast.com'`);
  }
} else {
  console.error('  ❌ public/CNAME is missing!');
}

const astroConfigSrc = readFileSync(join(root, 'astro.config.mjs'), 'utf8');
if (astroConfigSrc.includes("site: 'https://panfeast.com'") || astroConfigSrc.includes('site: SITE_URL') && astroConfigSrc.includes("const SITE_URL = 'https://panfeast.com'")) {
  console.log("  ✓ astro.config.mjs: canonical site configured as 'https://panfeast.com'");
} else {
  console.error('  ❌ astro.config.mjs does not set site to https://panfeast.com');
}

console.log('='.repeat(60));
