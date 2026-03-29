import { useEffect } from 'react';
import { useSeo, injectSchema, removeSchema, type SeoOptions } from '../hooks/useSeo';
import { PAGE_META, SITE_CONFIG, type PageMeta } from '../constants/meta';
import { organizationSchema, generateBreadcrumbSchema } from '../schemas';

interface SeoProps extends SeoOptions {
  pageKey: keyof typeof PAGE_META;
  schema?: object | object[];
}

export function Seo({ pageKey, schema, ...options }: SeoProps) {
  useSeo(pageKey, options);

  useEffect(() => {
    const schemas: object[] = [organizationSchema];

    if (options.breadcrumbs && options.breadcrumbs.length > 0) {
      schemas.push(generateBreadcrumbSchema(options.breadcrumbs));
    }

    if (schema) {
      if (Array.isArray(schema)) {
        schemas.push(...schema);
      } else {
        schemas.push(schema);
      }
    }

    injectSchema(schemas.length === 1 ? schemas[0] : {
      '@context': 'https://schema.org',
      '@graph': schemas,
    });

    return () => {
      removeSchema();
    };
  }, [schema, options.breadcrumbs]);

  return null;
}

export function SeoHead({ 
  title, 
  description, 
  keywords, 
  canonicalPath,
  ogImage,
  noIndex,
  schema,
}: PageMeta & { schema?: object }) {
  useEffect(() => {
    document.title = title;

    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords?.join(', ') || '' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: `${SITE_CONFIG.url}${canonicalPath || ''}` },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: SITE_CONFIG.name },
      { property: 'og:image', content: ogImage || SITE_CONFIG.ogImage },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: SITE_CONFIG.twitterHandle },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage || SITE_CONFIG.ogImage },
    ];

    if (noIndex) {
      metaTags.push({ name: 'robots', content: 'noindex, nofollow' });
    }

    metaTags.forEach((tag) => {
      const selector = tag.name ? 'name' : 'property';
      const value = tag.name || tag.property;
      if (!value) return;

      let element = document.querySelector(`meta[${selector}="${value}"]`) as HTMLMetaElement;
      if (element) {
        element.content = tag.content;
      } else {
        element = document.createElement('meta');
        if (tag.name) {
          element.name = tag.name;
        } else if (tag.property) {
          element.setAttribute('property', tag.property);
        }
        element.content = tag.content;
        document.head.appendChild(element);
      }
    });

    if (canonicalPath) {
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.href = `${SITE_CONFIG.url}${canonicalPath}`;
    }

    if (schema) {
      const schemas = [organizationSchema, schema];
      injectSchema({
        '@context': 'https://schema.org',
        '@graph': schemas,
      });
    }

    return () => {
      removeSchema();
    };
  }, [title, description, keywords, canonicalPath, ogImage, noIndex, schema]);

  return null;
}

export { PAGE_META, SITE_CONFIG };
export type { PageMeta, SeoOptions };
