import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import sharp from 'sharp';

const manifest = JSON.parse(readFileSync('src/data/new-articles-manifest-2026.json', 'utf8'));

const publicImagesDir = resolve(process.cwd(), 'public/images');
const publicPostsImagesDir = resolve(process.cwd(), 'public/images/posts');
mkdirSync(publicImagesDir, { recursive: true });
mkdirSync(publicPostsImagesDir, { recursive: true });

const THEMES = {
  'ios-voice-control-hands-free-navigation-guide': {
    category: 'iOS GUIDES',
    title: 'iOS Voice Control',
    subtitle: 'Hands-Free System Navigation & Commands',
    gradient1: '#4F46E5',
    gradient2: '#06B6D4',
    accent: '#818CF8',
    iconPath: `<circle cx="688" cy="300" r="50" fill="none" stroke="#818CF8" stroke-width="4"/><path d="M688 275 v30 M688 325 v15 M673 340 h30" stroke="#818CF8" stroke-width="4" stroke-linecap="round"/><path d="M660 295 a28 28 0 0 0 56 0" fill="none" stroke="#818CF8" stroke-width="4" stroke-linecap="round"/>`
  },
  'macos-spotlight-rebuild-index-troubleshooting': {
    category: 'MAC & MACOS',
    title: 'macOS Spotlight Index',
    subtitle: 'Diagnostic Protocols & mdutil Terminal Recovery',
    gradient1: '#0284C7',
    gradient2: '#6366F1',
    accent: '#38BDF8',
    iconPath: `<circle cx="680" cy="295" r="40" fill="none" stroke="#38BDF8" stroke-width="5"/><line x1="710" y1="325" x2="735" y2="350" stroke="#38BDF8" stroke-width="6" stroke-linecap="round"/><circle cx="680" cy="295" r="18" fill="#38BDF8" opacity="0.3"/>`
  },
  'macos-screen-sharing-remote-access-guide': {
    category: 'MAC & MACOS',
    title: 'macOS Screen Sharing',
    subtitle: 'High-Performance Low-Latency Remote Workstations',
    gradient1: '#0D9488',
    gradient2: '#2563EB',
    accent: '#2DD4BF',
    iconPath: `<rect x="630" y="260" width="75" height="50" rx="8" fill="none" stroke="#2DD4BF" stroke-width="4"/><rect x="670" y="285" width="75" height="50" rx="8" fill="none" stroke="#60A5FA" stroke-width="4"/><path d="M670 310 h-10 v20 h40" stroke="#2DD4BF" stroke-width="3" stroke-linecap="round"/>`
  },
  'apple-mail-smart-mailboxes-organization-guide': {
    category: 'MAC & MACOS',
    title: 'Apple Mail Smart Mailboxes',
    subtitle: 'Automated Query Dashboards & Zero Inbox Rules',
    gradient1: '#0284C7',
    gradient2: '#1D4ED8',
    accent: '#60A5FA',
    iconPath: `<rect x="640" y="270" width="96" height="64" rx="10" fill="none" stroke="#60A5FA" stroke-width="4"/><path d="M642 274 l46 36 l46 -36" fill="none" stroke="#60A5FA" stroke-width="4" stroke-linecap="round"/><circle cx="720" cy="275" r="8" fill="#38BDF8"/>`
  },
  'macos-login-items-background-daemons-guide': {
    category: 'MAC & MACOS',
    title: 'macOS Login Items & Daemons',
    subtitle: 'Optimize Boot Times & Audit launchd Services',
    gradient1: '#D97706',
    gradient2: '#475569',
    accent: '#FBBF24',
    iconPath: `<circle cx="688" cy="300" r="42" fill="none" stroke="#FBBF24" stroke-width="4" stroke-dasharray="8 6"/><circle cx="688" cy="300" r="18" fill="#FBBF24" opacity="0.3"/><line x1="688" y1="245" x2="688" y2="258" stroke="#FBBF24" stroke-width="5" stroke-linecap="round"/><line x1="688" y1="342" x2="688" y2="355" stroke="#FBBF24" stroke-width="5" stroke-linecap="round"/>`
  },
  'apple-watch-sleep-tracking-stages-guide': {
    category: 'APPLE WATCH',
    title: 'Apple Watch Sleep Stages',
    subtitle: 'REM, Core, Deep Sleep & Vitals Analysis',
    gradient1: '#7C3AED',
    gradient2: '#3B82F6',
    accent: '#A78BFA',
    iconPath: `<path d="M670 265 a36 36 0 1 0 36 60 a42 42 0 0 1 -36 -60" fill="#A78BFA" opacity="0.8"/><circle cx="725" cy="275" r="3" fill="#E0E7FF"/><circle cx="715" cy="260" r="2" fill="#E0E7FF"/>`
  },
  'apple-watch-fall-crash-detection-emergency-guide': {
    category: 'APPLE WATCH',
    title: 'Fall & Crash Detection',
    subtitle: 'Autonomous Emergency SOS & Telemetry Protocols',
    gradient1: '#DC2626',
    gradient2: '#D97706',
    accent: '#F87171',
    iconPath: `<path d="M688 255 l45 20 v35 c0 30 -45 50 -45 50 s-45 -20 -45 -50 v-35 z" fill="none" stroke="#F87171" stroke-width="4"/><line x1="688" y1="285" x2="688" y2="310" stroke="#F87171" stroke-width="5" stroke-linecap="round"/><circle cx="688" cy="325" r="3.5" fill="#F87171"/>`
  },
  'apple-watch-sensor-calibration-accuracy-guide': {
    category: 'APPLE WATCH',
    title: 'Apple Watch Sensor Calibration',
    subtitle: 'Maximizing GPS, Cadence & Heart Rate Accuracy',
    gradient1: '#059669',
    gradient2: '#0D9488',
    accent: '#34D399',
    iconPath: `<circle cx="688" cy="300" r="46" fill="none" stroke="#34D399" stroke-width="4"/><circle cx="688" cy="300" r="28" fill="none" stroke="#34D399" stroke-width="2" stroke-dasharray="4 4"/><circle cx="688" cy="300" r="8" fill="#34D399"/><line x1="688" y1="245" x2="688" y2="355" stroke="#34D399" stroke-width="2" opacity="0.4"/>`
  },
  'continuity-camera-iphone-mac-webcam-guide': {
    category: 'APPLE ECOSYSTEM',
    title: 'Continuity Camera Masterclass',
    subtitle: 'Studio Light, Desk View & Center Stage Setup',
    gradient1: '#BE185D',
    gradient2: '#4F46E5',
    accent: '#F472B6',
    iconPath: `<rect x="642" y="270" width="92" height="60" rx="12" fill="none" stroke="#F472B6" stroke-width="4"/><circle cx="688" cy="300" r="18" fill="none" stroke="#F472B6" stroke-width="4"/><circle cx="688" cy="300" r="7" fill="#F472B6"/><circle cx="715" cy="282" r="4" fill="#F472B6"/>`
  },
  'apple-airplay-multiroom-audio-video-streaming-guide': {
    category: 'APPLE ECOSYSTEM',
    title: 'AirPlay 2 Wireless Streaming',
    subtitle: 'Multi-Room Audio, Low Latency & Screen Mirroring',
    gradient1: '#EA580C',
    gradient2: '#854D0E',
    accent: '#FB923C',
    iconPath: `<rect x="646" y="260" width="84" height="54" rx="8" fill="none" stroke="#FB923C" stroke-width="4"/><polygon points="688,318 668,348 708,348" fill="#FB923C"/>`
  },
  'apple-family-passwords-passkeys-sharing-guide': {
    category: 'APPLE ECOSYSTEM',
    title: 'Shared Passwords & Passkeys',
    subtitle: 'Secure End-to-End Encrypted Family Vaults',
    gradient1: '#059669',
    gradient2: '#1E40AF',
    accent: '#10B981',
    iconPath: `<circle cx="676" cy="290" r="22" fill="none" stroke="#10B981" stroke-width="4"/><path d="M694 300 l32 32 M714 320 l10 -10 M720 326 l6 -6" stroke="#10B981" stroke-width="4" stroke-linecap="round"/>`
  },
  'flighty-app-review-ios': {
    category: 'APP REVIEWS',
    title: 'Flighty iOS App Review',
    subtitle: 'Live Activities, Delay Predictions & Flight Tracking',
    gradient1: '#0284C7',
    gradient2: '#0F172A',
    accent: '#38BDF8',
    iconPath: `<path d="M688 250 l12 28 l34 6 l-24 20 l8 32 l-30 -18 l-30 18 l8 -32 l-24 -20 l34 -6 z" fill="#38BDF8" opacity="0.9"/>`
  },
  'overcast-vs-apple-podcasts-review': {
    category: 'APP REVIEWS',
    title: 'Overcast vs Apple Podcasts',
    subtitle: 'Smart Speed, Voice Boost & Audio Engine Face-Off',
    gradient1: '#EA580C',
    gradient2: '#7C3AED',
    accent: '#F97316',
    iconPath: `<line x1="648" y1="310" x2="648" y2="290" stroke="#F97316" stroke-width="5" stroke-linecap="round"/><line x1="664" y1="330" x2="664" y2="270" stroke="#F97316" stroke-width="5" stroke-linecap="round"/><line x1="680" y1="345" x2="680" y2="255" stroke="#F97316" stroke-width="5" stroke-linecap="round"/><line x1="696" y1="335" x2="696" y2="265" stroke="#F97316" stroke-width="5" stroke-linecap="round"/><line x1="712" y1="320" x2="712" y2="280" stroke="#F97316" stroke-width="5" stroke-linecap="round"/><line x1="728" y1="305" x2="728" y2="295" stroke="#F97316" stroke-width="5" stroke-linecap="round"/>`
  }
};

async function buildImage(slug, theme) {
  const svg = `
  <svg width="1376" height="768" viewBox="0 0 1376 768" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#090D16"/>
        <stop offset="50%" stop-color="#111827"/>
        <stop offset="100%" stop-color="#0A0E17"/>
      </linearGradient>
      <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${theme.gradient1}" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="${theme.gradient2}" stop-opacity="0.05"/>
      </linearGradient>
      <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#1F2937" stop-opacity="0.7"/>
        <stop offset="100%" stop-color="#111827" stop-opacity="0.9"/>
      </linearGradient>
      <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#FFFFFF"/>
        <stop offset="100%" stop-color="#E2E8F0"/>
      </linearGradient>
      <filter id="blurFilter" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="80"/>
      </filter>
      <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="20" stdDeviation="30" flood-color="#000000" flood-opacity="0.6"/>
      </filter>
    </defs>

    <!-- Base Canvas -->
    <rect width="1376" height="768" fill="url(#bgGrad)"/>

    <!-- Subtle Ambient Glow Orbs -->
    <circle cx="688" cy="300" r="320" fill="url(#glowGrad)" filter="url(#blurFilter)"/>
    <circle cx="1100" cy="650" r="220" fill="${theme.gradient2}" fill-opacity="0.15" filter="url(#blurFilter)"/>
    <circle cx="250" cy="150" r="200" fill="${theme.gradient1}" fill-opacity="0.12" filter="url(#blurFilter)"/>

    <!-- Geometric Grid Matrix Pattern -->
    <g opacity="0.06">
      <path d="M 0 128 L 1376 128 M 0 256 L 1376 256 M 0 384 L 1376 384 M 0 512 L 1376 512 M 0 640 L 1376 640" stroke="#FFFFFF" stroke-width="1"/>
      <path d="M 172 0 L 172 768 M 344 0 L 344 768 M 516 0 L 516 768 M 688 0 L 688 768 M 860 0 L 860 768 M 1032 0 L 1032 768 M 1204 0 L 1204 768" stroke="#FFFFFF" stroke-width="1"/>
    </g>

    <!-- Hero Card Container -->
    <g filter="url(#cardShadow)">
      <rect x="238" y="144" width="900" height="480" rx="28" fill="url(#cardGrad)" stroke="#374151" stroke-width="1.5"/>
      <rect x="238" y="144" width="900" height="480" rx="28" fill="none" stroke="${theme.accent}" stroke-width="1" stroke-opacity="0.2"/>
    </g>

    <!-- Category Pill Badge -->
    <g>
      <rect x="588" y="184" width="200" height="34" rx="17" fill="${theme.gradient1}" fill-opacity="0.2" stroke="${theme.accent}" stroke-width="1" stroke-opacity="0.5"/>
      <text x="688" y="206" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="12" font-weight="700" letter-spacing="2" fill="${theme.accent}" text-anchor="middle">
        ${theme.category.replace(/&/g, '&amp;')}
      </text>
    </g>

    <!-- Feature Icon Graphic -->
    <g>
      ${theme.iconPath}
    </g>

    <!-- Article Typography -->
    <text x="688" y="440" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="38" font-weight="800" letter-spacing="-0.5" fill="url(#textGrad)" text-anchor="middle">
      ${theme.title.replace(/&/g, '&amp;')}
    </text>

    <text x="688" y="485" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="20" font-weight="400" fill="#94A3B8" text-anchor="middle">
      ${theme.subtitle.replace(/&/g, '&amp;')}
    </text>

    <!-- Brand Watermark Bottom -->
    <g opacity="0.6">
      <circle cx="638" cy="565" r="4" fill="${theme.accent}"/>
      <text x="688" y="570" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="14" font-weight="600" letter-spacing="3" fill="#64748B" text-anchor="middle">
        PANFEAST EDITORIAL
      </text>
      <circle cx="738" cy="565" r="4" fill="${theme.accent}"/>
    </g>
  </svg>
  `;

  const primaryFile = resolve(publicImagesDir, `${slug}.jpg`);
  const postsFile = resolve(publicPostsImagesDir, `${slug}.jpg`);

  const buffer = await sharp(Buffer.from(svg))
    .jpeg({ quality: 90, chromaSubsampling: '4:2:0' })
    .toBuffer();

  writeFileSync(primaryFile, buffer);
  writeFileSync(postsFile, buffer);
  console.log(`✅ Generated image for ${slug} (${(buffer.length / 1024).toFixed(1)} KB)`);
}

async function run() {
  for (const [slug, theme] of Object.entries(THEMES)) {
    const postsFile = resolve(publicPostsImagesDir, `${slug}.jpg`);
    if (!existsSync(postsFile)) {
      await buildImage(slug, theme);
    } else {
      console.log(`ℹ️ Already exists: ${slug}`);
    }
  }
}

run().catch(console.error);
