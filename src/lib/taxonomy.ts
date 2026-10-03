/* Category display name -> URL slug. */
export const CATEGORY_SLUGS: Record<string, string> = {
  'iOS Guides': 'ios-guides',
  'iPhone Tips': 'iphone-tips',
  'Mac & macOS': 'mac-macos',
  'Apple Watch': 'apple-watch',
  'App Reviews': 'app-reviews',
  'App Review': 'app-reviews',
  'Apple Ecosystem': 'apple-ecosystem',
  'News': 'news',
  'Comparison': 'app-comparison',
  'App Tips': 'app-tips',
  'Best Picks': 'best-picks',
  "Panfeast's Best Picks": 'best-picks',
  "Panfest's Best Picks": 'best-picks',
};

export const CATEGORY_TITLES: Record<string, string> = {
  'iOS Guides': 'iOS Guides & Tutorials',
  'iPhone Tips': 'iPhone Tips & Tricks',
  'Mac & macOS': 'Mac & macOS Mastery',
  'Apple Watch': 'Apple Watch & Wearables',
  'App Reviews': 'iOS App Reviews',
  'App Review': 'App Reviews',
  'Apple Ecosystem': 'Apple Ecosystem & Continuity',
  'News': 'Apple & iOS News',
  'Comparison': 'Device & App Comparisons',
  'App Tips': 'App Tips',
  'Best Picks': 'Best Picks',
  "Panfeast's Best Picks": "Panfeast's Best Picks",
  "Panfest's Best Picks": "Panfest's Best Picks",
};

export const CATEGORY_INTROS: Record<string, string> = {
  'ios-guides': 'Comprehensive walkthroughs, hidden configurations, and step-by-step masterclasses for iOS and iPadOS.',
  'iphone-tips': 'Essential tips, productivity shortcuts, camera masteries, and battery longevity strategies for your iPhone.',
  'mac-macos': 'In-depth workflows, terminal tricks, macOS power features, and seamless Apple Silicon performance guides.',
  'apple-watch': 'Health metrics optimization, watchOS tips, workout tracking, and wearable setup tutorials.',
  'app-reviews': 'Rigorous, independent reviews of the finest iOS and macOS applications with practical recommendations.',
  'apple-ecosystem': 'Mastering AirDrop, Universal Clipboard, Continuity, iCloud security, and hardware integration across Apple devices.',
  'news': 'Timely updates, iOS software release breakdowns, Apple event analyses, and ecosystem advancements.',
  'app-comparison': 'Head-to-head comparisons of leading apps and Apple gear to help you make informed decisions.',
  'app-tips': 'Actionable features, settings worth fine-tuning, and ways to get the absolute most out of Apple devices.',
  'best-picks': 'Hand-curated collections of apps, tools, and accessories engineered specifically for Apple users.',
};

export const slugifyTag = (t: string) =>
  t.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
