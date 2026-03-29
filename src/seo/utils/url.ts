import { SITE_CONFIG } from '../constants/meta';

export function generateCanonicalUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_CONFIG.url}${cleanPath}`;
}

export function generateAlternateUrls(path: string, languages: string[] = ['en']): Array<{ hrefLang: string; href: string }> {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return languages.map((lang) => ({
    hrefLang: lang,
    href: `${SITE_CONFIG.url}${cleanPath}`,
  }));
}

export function truncateDescription(description: string, maxLength: number = 160): string {
  if (description.length <= maxLength) return description;
  return description.slice(0, maxLength - 3) + '...';
}

export function generateMetaTitle(title: string, includeSiteName: boolean = true): string {
  if (!includeSiteName) return title;
  return `${title} | ${SITE_CONFIG.name}`;
}

export function generateOgImageUrl(options: {
  title: string;
  description?: string;
  theme?: 'light' | 'dark';
}): string {
  const params = new URLSearchParams({
    title: options.title,
    ...(options.description && { description: options.description }),
    ...(options.theme && { theme: options.theme }),
  });
  return `${SITE_CONFIG.url}/api/og?${params.toString()}`;
}

export function validateMeta(meta: { title?: string; description?: string }): string[] {
  const errors: string[] = [];

  if (meta.title) {
    if (meta.title.length < 30) {
      errors.push('Title is too short (recommended: 50-60 characters)');
    }
    if (meta.title.length > 60) {
      errors.push('Title is too long (recommended: 50-60 characters)');
    }
  }

  if (meta.description) {
    if (meta.description.length < 120) {
      errors.push('Description is too short (recommended: 150-160 characters)');
    }
    if (meta.description.length > 160) {
      errors.push('Description is too long (recommended: 150-160 characters)');
    }
  }

  return errors;
}
