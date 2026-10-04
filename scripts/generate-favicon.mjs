import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import sharp from 'sharp';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <!-- Background Dark Gradient: Deep obsidian with rich tone -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#141822" />
      <stop offset="45%" stop-color="#0e1219" />
      <stop offset="100%" stop-color="#07090d" />
    </linearGradient>

    <!-- Subtle Premium Border -->
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.5" />
      <stop offset="40%" stop-color="#1e293b" stop-opacity="0.6" />
      <stop offset="100%" stop-color="#0f172a" stop-opacity="0.25" />
    </linearGradient>

    <!-- Ambient Top Glow -->
    <radialGradient id="ambientGlow" cx="28%" cy="18%" r="65%">
      <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.2" />
      <stop offset="55%" stop-color="#1d4ed8" stop-opacity="0.04" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>

    <!-- Vibrant Electric Blue to Cyan Gradient for P Loop -->
    <linearGradient id="loopGrad" x1="5%" y1="0%" x2="95%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="30%" stop-color="#3b82f6" />
      <stop offset="70%" stop-color="#2563eb" />
      <stop offset="100%" stop-color="#1d4ed8" />
    </linearGradient>

    <!-- Stem Crisp White to Platinum Gradient -->
    <linearGradient id="stemGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="65%" stop-color="#f8fafc" />
      <stop offset="100%" stop-color="#e2e8f0" />
    </linearGradient>

    <!-- Top Gloss Highlight -->
    <linearGradient id="highlightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.45" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </linearGradient>

    <!-- Drop Shadow for P -->
    <filter id="pShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.75" />
      <feDropShadow dx="0" dy="2" stdDeviation="8" flood-color="#2563eb" flood-opacity="0.3" />
    </filter>

    <!-- Overlap Shadow for 3D depth between loop and stem -->
    <filter id="overlapShadow" x="-25%" y="-25%" width="150%" height="150%">
      <feDropShadow dx="-5" dy="6" stdDeviation="8" flood-color="#000000" flood-opacity="0.55" />
    </filter>
  </defs>

  <!-- Squircle Base (Apple iOS icon curvature) -->
  <rect x="10" y="10" width="492" height="492" rx="112" ry="112" fill="url(#bgGrad)" stroke="url(#borderGrad)" stroke-width="3" />
  <rect x="10" y="10" width="492" height="492" rx="112" ry="112" fill="url(#ambientGlow)" />

  <g filter="url(#pShadow)">
    <!-- Vertical Pillar / Stem -->
    <rect x="136" y="96" width="76" height="320" rx="38" ry="38" fill="url(#stemGrad)" />

    <!-- Loop of the P with clean, modern counter -->
    <g filter="url(#overlapShadow)">
      <path d="M 174 96 
               L 284 96 
               C 352 96, 388 136, 388 200 
               C 388 264, 352 304, 284 304 
               L 174 304 
               C 152 304, 134 286, 134 264 
               C 134 242, 152 224, 174 224 
               L 274 224 
               C 294 224, 308 214, 308 200 
               C 308 186, 294 176, 274 176 
               L 174 176 
               C 152 176, 134 158, 134 136 
               C 134 114, 152 96, 174 96 
               Z" 
            fill="url(#loopGrad)" />

      <!-- Top curved highlight for subtle Apple glass/metallic sheen -->
      <path d="M 174 98 
               L 284 98 
               C 350 98, 384 136, 384 198 
               C 384 202, 383 206, 382 210 
               C 378 148, 344 108, 282 108 
               L 174 108 
               C 156 108, 142 118, 136 134 
               C 138 114, 154 98, 174 98 
               Z" 
            fill="url(#highlightGrad)" />
    </g>
  </g>
</svg>`;

const publicDir = resolve(process.cwd(), 'public');

writeFileSync(resolve(publicDir, 'favicon.svg'), svg, 'utf8');

async function buildFavicons() {
  const svgBuffer = Buffer.from(svg);

  // Master 512x512 PNG
  await sharp(svgBuffer).resize(512, 512).png().toFile(resolve(publicDir, 'favicon.png'));

  // 180x180 Apple Touch Icon
  await sharp(svgBuffer).resize(180, 180).png().toFile(resolve(publicDir, 'apple-touch-icon.png'));

  // 32x32 PNG
  const png32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  writeFileSync(resolve(publicDir, 'favicon-32x32.png'), png32);

  // 16x16 PNG
  const png16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();
  writeFileSync(resolve(publicDir, 'favicon-16x16.png'), png16);

  // 48x48 PNG
  const png48 = await sharp(svgBuffer).resize(48, 48).png().toBuffer();

  // Create ICO
  const images = [
    { width: 16, height: 16, buffer: png16 },
    { width: 32, height: 32, buffer: png32 },
    { width: 48, height: 48, buffer: png48 },
  ];

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  let offset = 6 + images.length * 16;
  const dirEntries = [];

  for (const img of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width, 0);
    entry.writeUInt8(img.height, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(img.buffer.length, 8);
    entry.writeUInt32LE(offset, 12);
    dirEntries.push(entry);
    offset += img.buffer.length;
  }

  const icoBuffer = Buffer.concat([header, ...dirEntries, ...images.map(i => i.buffer)]);
  writeFileSync(resolve(publicDir, 'favicon.ico'), icoBuffer);

  console.log('✅ Generated polished Panfeast P logo favicon assets!');
}

buildFavicons();
