import { SITE_CONFIG } from '../constants/meta';

export interface SoftwareApplicationSchema {
  '@context': string;
  '@type': string;
  name: string;
  applicationCategory: string;
  operatingSystem: string;
  offers: {
    '@type': string;
    price: string;
    priceCurrency: string;
  };
  aggregateRating?: {
    '@type': string;
    ratingValue: string;
    ratingCount: string;
  };
  description: string;
  url: string;
  author: {
    '@type': string;
    name: string;
  };
}

export const codeAppSchema: SoftwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '100X Code',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Linux, macOS, Windows',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description: 'Terminal-native AI assistant for sovereign development. Autonomous coding, multi-session orchestration, and MCP tool integration.',
  url: `${SITE_CONFIG.url}/code`,
  author: {
    '@type': 'Organization',
    name: SITE_CONFIG.name,
  },
};

export const proModelSchema: SoftwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '100X Prompt Pro',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Linux',
  offers: {
    '@type': 'Offer',
    price: 'CUSTOM',
    priceCurrency: 'USD',
  },
  description: 'Flagship sovereign LLM for deep reasoning. 128K context, MoE architecture, on-premise deployment.',
  url: `${SITE_CONFIG.url}/pro`,
  author: {
    '@type': 'Organization',
    name: SITE_CONFIG.name,
  },
};

export const flashModelSchema: SoftwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '100X Prompt Flash',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Linux',
  offers: {
    '@type': 'Offer',
    price: 'CUSTOM',
    priceCurrency: 'USD',
  },
  description: 'Lightweight sovereign LLM optimized for speed. Sub-500ms latency, 128K context, production-ready.',
  url: `${SITE_CONFIG.url}/flash`,
  author: {
    '@type': 'Organization',
    name: SITE_CONFIG.name,
  },
};
