import { SITE_CONFIG } from '../constants/meta';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface BreadcrumbListSchema {
  '@context': string;
  '@type': string;
  itemListElement: Array<{
    '@type': string;
    position: number;
    name: string;
    item: string;
  }>;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]): BreadcrumbListSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.path}`,
    })),
  };
}

export const NAVIGATION_BREADCRUMBS: Record<string, BreadcrumbItem[]> = {
  code: [
    { name: 'Home', path: '/' },
    { name: '100X Code', path: '/code' },
  ],
  model: [
    { name: 'Home', path: '/' },
    { name: 'Models', path: '/model' },
  ],
  pro: [
    { name: 'Home', path: '/' },
    { name: 'Models', path: '/model' },
    { name: 'Pro', path: '/pro' },
  ],
  flash: [
    { name: 'Home', path: '/' },
    { name: 'Models', path: '/model' },
    { name: 'Flash', path: '/flash' },
  ],
  infrastructure: [
    { name: 'Home', path: '/' },
    { name: 'Infrastructure', path: '/infrastructure' },
  ],
  pricing: [
    { name: 'Home', path: '/' },
    { name: 'Pricing', path: '/pricing' },
  ],
  docs: [
    { name: 'Home', path: '/' },
    { name: 'Documentation', path: '/docs' },
  ],
  blog: [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
  ],
  about: [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ],
  contact: [
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
  ],
  machine: [
    { name: 'Home', path: '/' },
    { name: 'Machine View', path: '/machine' },
  ],
  millennial: [
    { name: 'Home', path: '/' },
    { name: '100X Engine', path: '/millennial' },
  ],
};
