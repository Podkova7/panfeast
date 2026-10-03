export interface AuthorProfile {
  name: string;
  slug: string;
  bio: string;
}

export const AUTHORS: AuthorProfile[] = [
  {
    name: 'Sylvie Fox',
    slug: 'sylvie-fox',
    bio: 'Sylvie Fox covers iOS, iPadOS, and the broader Apple ecosystem for Panfeast. Her articles focus on practical setup guides, hidden system settings, and getting the most out of Apple devices in daily life.',
  },
  {
    name: 'Olivia Williams',
    slug: 'olivia-williams',
    bio: 'Olivia Williams writes about iOS applications, productivity tools, and creative apps on iPhone and iPad for Panfeast. Her deep-dive reviews help readers discover exceptional software.',
  },
  {
    name: 'Amelia Thomas',
    slug: 'amelia-thomas',
    bio: 'Amelia Thomas covers Apple hardware, Continuity features, and iOS system updates. She specializes in workflow optimization across Mac, iPad, and iPhone.',
  },
  {
    name: 'Daniel Clark',
    slug: 'daniel-clark',
    bio: 'Daniel Clark is a systems analyst and Apple ecosystem specialist writing for Panfeast. He focuses on macOS performance, iOS security, iCloud privacy, and software comparisons.',
  },
  {
    name: 'Andrew Wright',
    slug: 'andrew-wright',
    bio: 'Andrew Wright covers Apple Arcade, mobile gaming performance on Apple Silicon, and iOS peripheral integration. His articles focus on hands-on benchmarks and practical gaming advice.',
  },
  {
    name: 'Sophia Garcia',
    slug: 'sophia-garcia',
    bio: 'Sophia Garcia covers watchOS, Apple Watch fitness tracking, health sensors, and wearable technology for Panfeast. She breaks down complex health algorithms into actionable tips.',
  },
  {
    name: 'Michael Wilson',
    slug: 'michael-wilson',
    bio: 'Michael Wilson writes about iOS camera techniques, computational photography, Shortcuts automation, and power-user customizations on Apple platforms.',
  },
  {
    name: 'Alexander Davis',
    slug: 'alexander-davis',
    bio: 'Alexander Davis writes hardware analyses and accessories reviews for Panfeast. He covers MagSafe, USB-C peripherals, external storage, and monitor setups for Mac and iPad.',
  },
  {
    name: 'James Smith',
    slug: 'james-smith',
    bio: 'James Smith covers Apple platform announcements, WWDC developments, and operating system roadmaps, explaining what new API and software updates mean for users.',
  },
  {
    name: 'Mia Martinez',
    slug: 'mia-martinez',
    bio: 'Mia Martinez covers digital privacy, Apple device security, Focus modes, and family sharing setups for Apple users on Panfeast.',
  },
  {
    name: 'Panfeast Editorial',
    slug: 'panfeast-editorial',
    bio: 'Panfeast Editorial is the collective byline used for guides, tutorials, and ecosystem overviews researched, tested, and vetted collaboratively by the Panfeast technical staff.',
  },
  {
    name: 'Panfest Editorial',
    slug: 'panfest-editorial',
    bio: 'Panfeast Editorial is the collective byline used for guides, tutorials, and ecosystem overviews researched, tested, and vetted collaboratively by the Panfeast technical staff.',
  },
];

export const authorByName = (name: string) => AUTHORS.find((author) => author.name === name);
export const authorUrl = (name: string) => {
  const author = authorByName(name);
  return author ? `/author/${author.slug}/` : '/about/';
};
