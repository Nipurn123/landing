import { SITE_CONFIG } from '../constants/meta';

export interface OrganizationSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs: string[];
  contactPoint: {
    '@type': string;
    contactType: string;
    availableLanguage: string[];
  };
  knowsAbout: string[];
  areaServed?: {
    '@type': string;
    name: string;
  };
}

export const organizationSchema: OrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  logo: `${SITE_CONFIG.url}/logo.png`,
  description: 'The world\'s leading full-stack sovereign AI platform. Self-hosted LLMs, private GPU infrastructure, and agentic CLI.',
  sameAs: [
    'https://x.com/100XPrompt',
    'https://www.linkedin.com/company/100xprompt',
    'https://www.instagram.com/100xprompt/',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    availableLanguage: ['English'],
  },
  knowsAbout: [
    'Sovereign AI',
    'Large Language Models',
    'AI Infrastructure',
    'GPU Computing',
    'Data Privacy',
    'Global Compliance',
    'Enterprise AI',
    'Agentic AI',
  ],
};

export const organizationJsonLd = JSON.stringify(organizationSchema);
