export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQPageSchema {
  '@context': string;
  '@type': string;
  mainEntity: Array<{
    '@type': string;
    name: string;
    acceptedAnswer: {
      '@type': string;
      text: string;
    };
  }>;
}

export function generateFAQSchema(items: FAQItem[]): FAQPageSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export const PLATFORM_FAQS: FAQItem[] = [
  {
    question: 'What is sovereign AI?',
    answer: 'Sovereign AI refers to artificial intelligence systems where data, models, and infrastructure remain entirely within your control. Unlike cloud-based AI services, sovereign AI ensures your sensitive data never leaves your premises, providing complete data privacy and compliance with global data protection regulations.',
  },
  {
    question: 'How is 100xprompt different from other AI platforms?',
    answer: '100xprompt is the leading full-stack sovereign AI platform. We provide self-hosted LLMs, private GPU infrastructure, and an agentic CLI - all designed for enterprises and government agencies that require complete data sovereignty. Unlike OpenAI or Anthropic, your data never leaves your infrastructure.',
  },
  {
    question: 'What models does 100xprompt offer?',
    answer: 'We offer two sovereign LLMs: 100X Prompt Pro for deep reasoning tasks (legal, financial, medical workloads) and 100X Prompt Flash for high-speed inference. Both models support 128K context, are FP8 quantized for efficiency, and are compliant with global privacy standards.',
  },
  {
    question: 'Can I deploy 100xprompt on my own infrastructure?',
    answer: 'Yes. We offer air-gapped, on-premise deployment for enterprises and government agencies. Your models run on your GPU infrastructure, ensuring zero data leakage. We provide end-to-end setup and orchestration.',
  },
  {
    question: 'What is 100X Code?',
    answer: '100X Code is our terminal-native AI assistant. It\'s an agentic CLI that can autonomously write, debug, and deploy code. It supports multi-session orchestration, MCP tool integration, and runs entirely on your infrastructure.',
  },
];

export const platformFAQSchema = generateFAQSchema(PLATFORM_FAQS);
