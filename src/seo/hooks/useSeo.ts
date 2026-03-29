import { useEffect } from 'react';
import { PAGE_META, SITE_CONFIG, type PageMeta } from '../constants/meta';

type MetaTag = {
  name?: string;
  property?: string;
  content: string;
};

type LinkTag = {
  rel: string;
  href: string;
  hrefLang?: string;
};

function updateOrCreateMeta(selector: string, attribute: string, value: string, content: string) {
  let element = document.querySelector(`meta[${selector}="${value}"]`) as HTMLMetaElement;
  if (element) {
    element.content = content;
  } else {
    element = document.createElement('meta');
    element.setAttribute(attribute, value);
    element.content = content;
    document.head.appendChild(element);
  }
}

function updateOrCreateLink(rel: string, href: string, extra?: Record<string, string>) {
  let element = document.querySelector(`link[rel="${rel}"]${extra ? `[href="${extra.href || ''}"]` : ''}`) as HTMLLinkElement;
  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    document.head.appendChild(element);
  }
  element.href = href;
  if (extra) {
    Object.entries(extra).forEach(([key, val]) => {
      if (key !== 'href') element.setAttribute(key, val);
    });
  }
}

function removeMeta(selector: string, value: string) {
  const element = document.querySelector(`meta[${selector}="${value}"]`);
  if (element) element.remove();
}

function removeLink(rel: string) {
  const element = document.querySelector(`link[rel="${rel}"]`);
  if (element && rel === 'canonical') element.remove();
}

export interface SeoOptions extends Partial<PageMeta> {
  breadcrumbs?: Array<{ name: string; path: string }>;
  schema?: object;
}

export function useSeo(pageKey: keyof typeof PAGE_META, options?: SeoOptions) {
  const defaultMeta = PAGE_META[pageKey];
  const meta: PageMeta = {
    ...defaultMeta,
    ...options,
  };

  useEffect(() => {
    const metaTags: MetaTag[] = [];
    const linkTags: LinkTag[] = [];
    
    document.title = meta.title;

    metaTags.push({ name: 'description', content: meta.description });
    metaTags.push({ name: 'keywords', content: meta.keywords.join(', ') });

    metaTags.push({ property: 'og:title', content: meta.title });
    metaTags.push({ property: 'og:description', content: meta.description });
    metaTags.push({ property: 'og:url', content: `${SITE_CONFIG.url}${meta.canonicalPath || ''}` });
    metaTags.push({ property: 'og:type', content: 'website' });
    metaTags.push({ property: 'og:site_name', content: SITE_CONFIG.name });
    metaTags.push({ property: 'og:locale', content: SITE_CONFIG.locale });
    
    if (meta.ogImage) {
      metaTags.push({ property: 'og:image', content: meta.ogImage });
    } else {
      metaTags.push({ property: 'og:image', content: SITE_CONFIG.ogImage });
    }

    metaTags.push({ name: 'twitter:card', content: 'summary_large_image' });
    metaTags.push({ name: 'twitter:site', content: SITE_CONFIG.twitterHandle });
    metaTags.push({ name: 'twitter:title', content: meta.title });
    metaTags.push({ name: 'twitter:description', content: meta.description });
    metaTags.push({ name: 'twitter:image', content: meta.ogImage || SITE_CONFIG.ogImage });

    if (meta.canonicalPath) {
      linkTags.push({ rel: 'canonical', href: `${SITE_CONFIG.url}${meta.canonicalPath}` });
    }

    if (meta.noIndex) {
      metaTags.push({ name: 'robots', content: 'noindex, nofollow' });
    } else {
      metaTags.push({ name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' });
    }

    metaTags.forEach((tag) => {
      if (tag.name) {
        updateOrCreateMeta('name', 'name', tag.name, tag.content);
      } else if (tag.property) {
        updateOrCreateMeta('property', 'property', tag.property, tag.content);
      }
    });

    linkTags.forEach((tag) => {
      updateOrCreateLink(tag.rel, tag.href);
    });

    return () => {
      metaTags.forEach((tag) => {
        if (tag.name && !['description', 'keywords'].includes(tag.name)) {
          removeMeta('name', tag.name);
        } else if (tag.property) {
          removeMeta('property', tag.property);
        }
      });
      if (meta.canonicalPath) {
        removeLink('canonical');
      }
    };
  }, [meta]);
}

export function injectSchema(schema: object) {
  const existingScript = document.querySelector('script[type="application/ld+json"][data-seo="true"]');
  if (existingScript) {
    existingScript.textContent = JSON.stringify(schema);
    return;
  }

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-seo', 'true');
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

export function removeSchema() {
  const script = document.querySelector('script[type="application/ld+json"][data-seo="true"]');
  if (script) script.remove();
}
