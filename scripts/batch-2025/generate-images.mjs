// scripts/batch-2025/generate-images.mjs
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import sharp from 'sharp';

const manifest = JSON.parse(readFileSync('src/data/new-articles-manifest-2025.json', 'utf8'));

const publicImagesDir = resolve(process.cwd(), 'public/images');
const publicPostsImagesDir = resolve(process.cwd(), 'public/images/posts');
mkdirSync(publicImagesDir, { recursive: true });
mkdirSync(publicPostsImagesDir, { recursive: true });

const THEMES = {
  'iphone-standby-mode-smart-stacks-setup': {
    category: 'IPHONE TIPS',
    title: 'iPhone StandBy Mode',
    subtitle: 'Smart Stacks, Night Mode & Nightstand Displays',
    gradient1: '#D97706',
    gradient2: '#1F2937',
    accent: '#FBBF24',
    iconPath: `<rect x="635" y="270" width="106" height="60" rx="10" fill="none" stroke="#FBBF24" stroke-width="4"/><circle cx="665" cy="300" r="16" fill="none" stroke="#FBBF24" stroke-width="3"/><line x1="665" y1="300" x2="665" y2="290" stroke="#FBBF24" stroke-width="3" stroke-linecap="round"/><line x1="665" y1="300" x2="673" y2="300" stroke="#FBBF24" stroke-width="3" stroke-linecap="round"/><rect x="695" y="288" width="30" height="6" rx="3" fill="#FBBF24"/><rect x="695" y="302" width="22" height="6" rx="3" fill="#FBBF24" opacity="0.6"/>`
  },
  'iphone-icloud-photos-storage-optimization': {
    category: 'IPHONE TIPS',
    title: 'iCloud Photos Storage',
    subtitle: 'Optimize iPhone Storage & Local Cache Triage',
    gradient1: '#0284C7',
    gradient2: '#1E3A8A',
    accent: '#38BDF8',
    iconPath: `<path d="M660 320 a22 22 0 0 1 0 -44 a32 32 0 0 1 58 -8 a26 26 0 0 1 20 40 a14 14 0 0 1 -10 12 z" fill="none" stroke="#38BDF8" stroke-width="4"/><line x1="688" y1="275" x2="688" y2="310" stroke="#38BDF8" stroke-width="4" stroke-linecap="round"/><polyline points="678,300 688,310 698,300" fill="none" stroke="#38BDF8" stroke-width="4" stroke-linecap="round"/>`
  },
  'iphone-lock-screen-customization-widgets-guide': {
    category: 'IPHONE TIPS',
    title: 'iPhone Lock Screen',
    subtitle: 'Widgets, Multi-Layer Depth Effects & Focus Linking',
    gradient1: '#7C3AED',
    gradient2: '#312E81',
    accent: '#A78BFA',
    iconPath: `<rect x="650" y="255" width="76" height="90" rx="14" fill="none" stroke="#A78BFA" stroke-width="4"/><text x="688" y="295" font-family="sans-serif" font-size="24" font-weight="900" fill="#A78BFA" text-anchor="middle">9:41</text><circle cx="672" cy="318" r="6" fill="#A78BFA" opacity="0.7"/><circle cx="704" cy="318" r="6" fill="#A78BFA" opacity="0.7"/>`
  },
  'iphone-live-text-visual-look-up-guide': {
    category: 'IPHONE TIPS',
    title: 'Live Text & Visual Look Up',
    subtitle: 'Neural OCR, Translation & Object Recognition',
    gradient1: '#059669',
    gradient2: '#064E3B',
    accent: '#34D399',
    iconPath: `<path d="M650 270 h-10 v-10 M726 270 h10 v-10 M650 330 h-10 v10 M726 330 h10 v10" fill="none" stroke="#34D399" stroke-width="4" stroke-linecap="round"/><text x="688" y="308" font-family="sans-serif" font-size="28" font-weight="800" fill="#34D399" text-anchor="middle">Aa</text>`
  },
  'safari-profiles-tab-groups-ios-guide': {
    category: 'IOS GUIDES',
    title: 'Safari Profiles & Tab Groups',
    subtitle: 'Containerized Browsing Sessions for Deep Work',
    gradient1: '#0284C7',
    gradient2: '#4338CA',
    accent: '#60A5FA',
    iconPath: `<circle cx="688" cy="300" r="42" fill="none" stroke="#60A5FA" stroke-width="4"/><polygon points="688,272 696,296 720,296 700,308 708,328 688,314 668,328 676,308 656,296 680,296" fill="#60A5FA" opacity="0.4"/><polygon points="688,266 695,295 688,334 681,295" fill="#60A5FA"/>`
  },
  'apple-reminders-smart-lists-grocery-guide': {
    category: 'IOS GUIDES',
    title: 'Apple Reminders Mastery',
    subtitle: 'Smart Lists, Tags & Automatic Grocery Sorting',
    gradient1: '#EA580C',
    gradient2: '#7C2D12',
    accent: '#FB923C',
    iconPath: `<circle cx="660" cy="275" r="8" fill="none" stroke="#FB923C" stroke-width="3"/><line x1="680" y1="275" x2="725" y2="275" stroke="#FB923C" stroke-width="4" stroke-linecap="round"/><circle cx="660" cy="300" r="8" fill="#FB923C"/><polyline points="656,300 659,303 665,297" fill="none" stroke="#000" stroke-width="2.5" stroke-linecap="round"/><line x1="680" y1="300" x2="715" y2="300" stroke="#FB923C" stroke-width="4" stroke-linecap="round"/><circle cx="660" cy="325" r="8" fill="none" stroke="#FB923C" stroke-width="3"/><line x1="680" y1="325" x2="720" y2="325" stroke="#FB923C" stroke-width="4" stroke-linecap="round"/>`
  },
  'ios-interactive-widgets-home-screen-guide': {
    category: 'IOS GUIDES',
    title: 'Interactive Widgets Guide',
    subtitle: 'Execute Tasks Directly from the Home Screen',
    gradient1: '#4F46E5',
    gradient2: '#312E81',
    accent: '#818CF8',
    iconPath: `<rect x="645" y="260" width="86" height="80" rx="18" fill="none" stroke="#818CF8" stroke-width="4"/><circle cx="670" cy="285" r="8" fill="#818CF8"/><rect x="690" y="282" width="25" height="6" rx="3" fill="#818CF8" opacity="0.6"/><rect x="662" y="310" width="52" height="16" rx="8" fill="#818CF8" fill-opacity="0.2" stroke="#818CF8" stroke-width="2"/><circle cx="704" cy="318" r="6" fill="#818CF8"/>`
  },
  'ios-control-center-customization-shortcuts-guide': {
    category: 'IOS GUIDES',
    title: 'iOS Control Center',
    subtitle: 'Modular Layouts, Custom Shortcuts & Quick Toggles',
    gradient1: '#0D9488',
    gradient2: '#134E4A',
    accent: '#2DD4BF',
    iconPath: `<rect x="652" y="265" width="32" height="32" rx="10" fill="#2DD4BF" fill-opacity="0.3" stroke="#2DD4BF" stroke-width="3"/><rect x="692" y="265" width="32" height="32" rx="10" fill="#2DD4BF" fill-opacity="0.3" stroke="#2DD4BF" stroke-width="3"/><rect x="652" y="305" width="32" height="32" rx="10" fill="#2DD4BF" fill-opacity="0.3" stroke="#2DD4BF" stroke-width="3"/><rect x="692" y="305" width="32" height="32" rx="10" fill="#2DD4BF" fill-opacity="0.3" stroke="#2DD4BF" stroke-width="3"/>`
  },
  'macos-quick-look-plugins-keyboard-shortcuts': {
    category: 'MAC & MACOS',
    title: 'macOS Quick Look',
    subtitle: 'Spacebar Workflows, In-Place Markup & Code Plugins',
    gradient1: '#2563EB',
    gradient2: '#1E293B',
    accent: '#60A5FA',
    iconPath: `<rect x="640" y="260" width="96" height="68" rx="8" fill="none" stroke="#60A5FA" stroke-width="4"/><path d="M660 285 l15 15 l-15 15 M685 315 h20" fill="none" stroke="#60A5FA" stroke-width="4" stroke-linecap="round"/><circle cx="650" cy="270" r="3" fill="#EF4444"/><circle cx="658" cy="270" r="3" fill="#FBBF24"/><circle cx="666" cy="270" r="3" fill="#10B981"/>`
  },
  'macos-notifications-focus-modes-deep-work': {
    category: 'MAC & MACOS',
    title: 'macOS Focus & Notifications',
    subtitle: 'Eliminate Digital Noise for Distraction-Free Deep Work',
    gradient1: '#6366F1',
    gradient2: '#312E81',
    accent: '#A5B4FC',
    iconPath: `<path d="M668 265 a32 32 0 1 0 32 54 a38 38 0 0 1 -32 -54" fill="#A5B4FC" opacity="0.8"/><circle cx="715" cy="275" r="4" fill="#E0E7FF"/><circle cx="705" cy="260" r="2.5" fill="#E0E7FF"/>`
  },
  'macos-passwords-app-keychain-access-guide': {
    category: 'MAC & MACOS',
    title: 'macOS Passwords App',
    subtitle: 'Keychain Migration, Passkeys & Hardware 2FA',
    gradient1: '#059669',
    gradient2: '#064E3B',
    accent: '#10B981',
    iconPath: `<rect x="655" y="280" width="66" height="50" rx="8" fill="none" stroke="#10B981" stroke-width="4"/><path d="M668 280 v-15 a20 20 0 0 1 40 0 v15" fill="none" stroke="#10B981" stroke-width="4"/><circle cx="688" cy="302" r="5" fill="#10B981"/><line x1="688" y1="307" x2="688" y2="318" stroke="#10B981" stroke-width="3" stroke-linecap="round"/>`
  },
  'macos-activity-monitor-apple-silicon-metrics': {
    category: 'MAC & MACOS',
    title: 'Apple Silicon Metrics',
    subtitle: 'Activity Monitor, Memory Pressure & powermetrics CLI',
    gradient1: '#DC2626',
    gradient2: '#1F2937',
    accent: '#F87171',
    iconPath: `<rect x="645" y="260" width="86" height="70" rx="8" fill="none" stroke="#F87171" stroke-width="4"/><polyline points="655,305 670,305 680,280 690,320 700,290 710,305 720,305" fill="none" stroke="#F87171" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`
  },
  'apple-watch-smart-stack-widgets-guide': {
    category: 'APPLE WATCH',
    title: 'watchOS Smart Stack',
    subtitle: 'Dynamic Widgets, Live Activities & Digital Crown UI',
    gradient1: '#D97706',
    gradient2: '#78350F',
    accent: '#FBBF24',
    iconPath: `<rect x="652" y="255" width="72" height="85" rx="20" fill="none" stroke="#FBBF24" stroke-width="4"/><rect x="664" y="275" width="48" height="20" rx="6" fill="#FBBF24" fill-opacity="0.3"/><rect x="664" y="302" width="48" height="20" rx="6" fill="#FBBF24" fill-opacity="0.3"/><rect x="724" y="280" width="6" height="16" rx="3" fill="#FBBF24"/>`
  },
  'apple-watch-heart-rate-zone-training-guide': {
    category: 'APPLE WATCH',
    title: 'Heart Rate Zone Training',
    subtitle: 'Aerobic Base, VO2 Max & Metabolic Zone Optimization',
    gradient1: '#DC2626',
    gradient2: '#7C3AED',
    accent: '#F43F5E',
    iconPath: `<path d="M688 335 l-30 -30 a20 20 0 0 1 28 -28 l2 2 l2 -2 a20 20 0 0 1 28 28 z" fill="#F43F5E" opacity="0.8"/><polyline points="670,305 680,295 688,315 696,300 706,305" fill="none" stroke="#FFF" stroke-width="2.5" stroke-linecap="round"/>`
  },
  'apple-watch-noise-app-hearing-health-guide': {
    category: 'APPLE WATCH',
    title: 'Apple Watch Noise App',
    subtitle: 'Environmental Decibels & Headphone Audio Safety',
    gradient1: '#EAB308',
    gradient2: '#713F12',
    accent: '#FACC15',
    iconPath: `<path d="M668 280 a20 20 0 0 1 20 20 c0 15 -10 20 -15 28 h-10" fill="none" stroke="#FACC15" stroke-width="4" stroke-linecap="round"/><circle cx="663" cy="318" r="4" fill="#FACC15"/><path d="M698 275 a32 32 0 0 1 0 46" fill="none" stroke="#FACC15" stroke-width="4" stroke-linecap="round"/><path d="M708 265 a46 46 0 0 1 0 66" fill="none" stroke="#FACC15" stroke-width="3" stroke-linecap="round" opacity="0.6"/>`
  },
  'apple-namedrop-contact-sharing-iphone-watch-guide': {
    category: 'APPLE ECOSYSTEM',
    title: 'Apple NameDrop',
    subtitle: 'NFC Contact Posters & Encrypted Peer-to-Peer Sharing',
    gradient1: '#BE185D',
    gradient2: '#4F46E5',
    accent: '#F472B6',
    iconPath: `<circle cx="688" cy="285" r="18" fill="none" stroke="#F472B6" stroke-width="4"/><path d="M660 330 c0 -20 18 -25 28 -25 s28 5 28 25" fill="none" stroke="#F472B6" stroke-width="4" stroke-linecap="round"/><circle cx="688" cy="300" r="44" fill="none" stroke="#F472B6" stroke-width="2" stroke-dasharray="6 6"/>`
  },
  'apple-handoff-iphone-mac-ipad-continuity-guide': {
    category: 'APPLE ECOSYSTEM',
    title: 'Apple Handoff Mastery',
    subtitle: 'Seamless Cross-Device Task Continuity & Syncing',
    gradient1: '#0284C7',
    gradient2: '#0D9488',
    accent: '#38BDF8',
    iconPath: `<rect x="645" y="275" width="40" height="55" rx="6" fill="none" stroke="#38BDF8" stroke-width="3.5"/><rect x="690" y="265" width="55" height="40" rx="4" fill="none" stroke="#2DD4BF" stroke-width="3.5"/><path d="M675 305 c10 5 20 0 25 -10" fill="none" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/><polyline points="695,290 702,295 698,303" fill="none" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>`
  },
  'apple-homekit-home-app-automations-guide': {
    category: 'APPLE ECOSYSTEM',
    title: 'HomeKit & Matter Guide',
    subtitle: 'Local Smart Home Hubs, Thread Mesh & Automations',
    gradient1: '#D97706',
    gradient2: '#B45309',
    accent: '#FBBF24',
    iconPath: `<path d="M688 260 l38 32 v38 h-76 v-38 z" fill="none" stroke="#FBBF24" stroke-width="4" stroke-linejoin="round"/><rect x="678" y="302" width="20" height="28" fill="#FBBF24" opacity="0.4"/><polygon points="688,276 693,292 683,292" fill="#FBBF24"/>`
  },
  'craft-docs-ios-app-review': {
    category: 'APP REVIEWS',
    title: 'Craft Docs iOS Review',
    subtitle: 'Native Swift Modular Documents & PKM Architecture',
    gradient1: '#7C3AED',
    gradient2: '#4338CA',
    accent: '#A78BFA',
    iconPath: `<rect x="645" y="260" width="40" height="40" rx="8" fill="#A78BFA" opacity="0.8"/><rect x="695" y="260" width="40" height="40" rx="8" fill="none" stroke="#A78BFA" stroke-width="3"/><rect x="645" y="310" width="90" height="28" rx="6" fill="none" stroke="#A78BFA" stroke-width="3"/>`
  },
  'bear-notes-markdown-app-review': {
    category: 'APP REVIEWS',
    title: 'Bear Notes 2 Review',
    subtitle: 'The Markdown Sanctuary for Apple Writers & Thinkers',
    gradient1: '#DC2626',
    gradient2: '#18181B',
    accent: '#F87171',
    iconPath: `<circle cx="688" cy="298" r="34" fill="#F87171" opacity="0.85"/><circle cx="670" cy="268" r="10" fill="#F87171"/><circle cx="706" cy="268" r="10" fill="#F87171"/><ellipse cx="688" cy="305" rx="14" ry="10" fill="#18181B"/><circle cx="678" cy="292" r="3" fill="#18181B"/><circle cx="698" cy="292" r="3" fill="#18181B"/>`
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
