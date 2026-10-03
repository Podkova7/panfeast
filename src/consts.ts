/* ---------------------------------------------------------------
   Site-wide configuration.
   Every third-party ID is empty by default. Nothing loads until an
   ID is filled in, so the site ships with zero third-party requests.
   --------------------------------------------------------------- */

export const SITE = {
  url: 'https://panfeast.com',
  name: 'Panfeast',
  tagline: 'The Definitive Guide to iOS & the Apple Ecosystem',
  description:
    'In-depth reviews, expert guides, tutorials, and breaking news on iOS, iPhone, iPad, Mac, and the Apple ecosystem.',
  locale: 'en_US',
  lang: 'en',
  postsPerPage: 12,
  founded: 2026,
};

export const PUBLISHER = {
  legalName: 'DIGITAL AI SOLUTIONS LIMITED',
  companyType: 'Private company limited by shares',
  companyNumber: '16066317',
  jurisdiction: 'England and Wales',
  sicCode: '62020',
  vatNumber: '',
  address: {
    street: 'C/O Aardvark Accounting 1 Cedar Office Park, Cobham Road',
    city: 'Wimborne',
    postcode: 'BH21 7SB',
    country: 'United Kingdom',
    countryCode: 'GB',
  },
  contactEmail: 'contact@panfeast.com',
  editorialEmail: 'editorial@panfeast.com',
  privacyEmail: 'privacy@panfeast.com',
  social: {
    twitter: 'https://twitter.com/panfeast',
    facebook: 'https://www.facebook.com/panfeast',
    instagram: 'https://www.instagram.com/panfeast',
  },
};

/* Fill these in when the accounts exist. Empty string = tag not rendered. */
export const INTEGRATIONS = {
  adsensePublisherId: '',
  adManagerNetworkCode: '',
  ga4MeasurementId: '',
  searchConsoleToken: '',
  enableConsent: false,
  enableAds: false,
};

export const NAV = [
  { label: 'iOS Guides', href: '/category/ios-guides/' },
  { label: 'iPhone Tips', href: '/category/iphone-tips/' },
  { label: 'Mac & macOS', href: '/category/mac-macos/' },
  { label: 'Apple Watch', href: '/category/apple-watch/' },
  { label: 'App Reviews', href: '/category/app-reviews/' },
  { label: 'Ecosystem', href: '/category/apple-ecosystem/' },
  { label: 'News', href: '/category/news/' },
];

export const FOOTER_LINKS = [
  { label: 'About Us', href: '/about/' },
  { label: 'Our Authors', href: '/authors/' },
  { label: 'Editorial Policy', href: '/editorial-policy/' },
  { label: 'Contact Us', href: '/contact-us/' },
  { label: 'Privacy Policy', href: '/cookies-privacy-policy/' },
  { label: 'Cookie Policy', href: '/cookie-policy/' },
  { label: 'Terms & Conditions', href: '/terms-and-conditions/' },
];
