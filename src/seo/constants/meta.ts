export interface PageMeta {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalPath?: string;
  noIndex?: boolean;
}

export const SITE_CONFIG = {
  name: '100xprompt',
  url: 'https://100xprompt.com',
  ogImage: 'https://100xprompt.com/og-image.png',
  twitterHandle: '@100XPrompt',
  locale: 'en_IN',
} as const;

export const PAGE_META: Record<string, PageMeta> = {
  home: {
    title: '100xprompt | Sovereign AI Infrastructure for India',
    description: 'India\'s full-stack sovereign AI platform. Self-hosted LLMs, private GPU infrastructure, and agentic CLI. Your data never leaves your control.',
    keywords: ['sovereign AI', 'AI infrastructure India', 'self-hosted LLM', 'private AI', 'Indian AI platform', 'DPDP compliant AI'],
    canonicalPath: '/',
  },
  code: {
    title: '100X Code | Agentic CLI for Sovereign Development',
    description: 'Terminal-native AI assistant. Autonomous coding, multi-session orchestration, and MCP tool integration. Your co-pilot that lives on your infrastructure.',
    keywords: ['AI CLI', 'agentic coding', 'terminal AI', 'developer tools', 'MCP protocol', 'autonomous coding'],
    canonicalPath: '/code',
  },
  model: {
    title: 'Sovereign AI Models | Pro & Flash LLMs',
    description: 'Self-hosted large language models optimized for Indian enterprises. 128K context, FP8 quantization, DPDP compliant. Pro for reasoning, Flash for speed.',
    keywords: ['LLM India', 'self-hosted language model', 'sovereign LLM', 'enterprise AI model', 'Indian AI model'],
    canonicalPath: '/model',
  },
  pro: {
    title: '100X Prompt Pro | Enterprise Sovereign LLM',
    description: 'Flagship sovereign LLM for deep reasoning. 128K context, MoE architecture, on-premise deployment. Built for legal, financial, and medical workloads.',
    keywords: ['enterprise LLM', 'reasoning AI', 'sovereign language model', 'Indian AI', 'private LLM'],
    canonicalPath: '/pro',
  },
  flash: {
    title: '100X Prompt Flash | High-Speed Sovereign LLM',
    description: 'Lightweight sovereign LLM optimized for speed. Sub-500ms latency, 128K context, production-ready. Perfect for real-time applications.',
    keywords: ['fast LLM', 'low latency AI', 'production AI', 'sovereign inference', 'Indian AI'],
    canonicalPath: '/flash',
  },
  infrastructure: {
    title: 'Sovereign AI Infrastructure | Private GPU Deployment',
    description: 'End-to-end GPU orchestration for Indian enterprises. Air-gapped deployment, private compute, zero data leakage. Your infrastructure, your rules.',
    keywords: ['GPU infrastructure India', 'private AI compute', 'sovereign GPU', 'AI datacenter', 'Indian cloud'],
    canonicalPath: '/infrastructure',
  },
  pricing: {
    title: 'Pricing | Sovereign AI for Every Scale',
    description: 'Transparent pricing for sovereign AI infrastructure. Flash for speed, Pro for reasoning, Enterprise for air-gapped deployment. No hidden fees.',
    keywords: ['AI pricing India', 'sovereign AI cost', 'LLM pricing', 'enterprise AI pricing'],
    canonicalPath: '/pricing',
  },
  contact: {
    title: 'Contact Us | Start Your Sovereign AI Journey',
    description: 'Get in touch with our team. Tell us about your use case and we\'ll find the right path forward for your sovereign AI deployment.',
    keywords: ['contact 100xprompt', 'AI consultation', 'enterprise AI inquiry'],
    canonicalPath: '/contact',
  },
  docs: {
    title: 'Documentation | 100xprompt Developer Docs',
    description: 'Complete documentation for 100X Code CLI, sovereign LLM APIs, and infrastructure deployment. Get started with India\'s sovereign AI platform.',
    keywords: ['100xprompt docs', 'AI documentation', 'CLI docs', 'LLM API docs'],
    canonicalPath: '/docs',
  },
  blog: {
    title: 'Blog | Sovereign AI Insights',
    description: 'Latest updates on sovereign AI, Indian AI policy, enterprise AI adoption, and technical deep-dives from the 100xprompt team.',
    keywords: ['AI blog India', 'sovereign AI news', 'AI policy India', 'enterprise AI insights'],
    canonicalPath: '/blog',
  },
  login: {
    title: 'Login | Access Your Sovereign AI Dashboard',
    description: 'Sign in to your 100xprompt account. Access your CLI, manage models, and monitor your sovereign AI infrastructure.',
    keywords: ['100xprompt login', 'AI dashboard', 'sovereign AI access'],
    canonicalPath: '/login',
  },
  privacy: {
    title: 'Privacy Policy | Data Sovereignty Commitment',
    description: 'Our commitment to data privacy and sovereignty. Learn how 100xprompt protects your data under DPDP Act 2023 compliance.',
    keywords: ['privacy policy', 'DPDP compliance', 'data protection', 'AI privacy'],
    canonicalPath: '/privacy',
  },
  terms: {
    title: 'Terms of Use | 100xprompt',
    description: 'Terms and conditions for using 100xprompt\'s sovereign AI platform and services.',
    keywords: ['terms of use', 'legal', 'agreement'],
    canonicalPath: '/terms',
  },
  machine: {
    title: 'Machine View | AI-Optimized Content',
    description: 'Structured content optimized for AI consumption. Complete information about 100xprompt\'s sovereign AI platform in machine-readable format.',
    keywords: ['AI readable', 'structured content', 'machine optimized'],
    canonicalPath: '/machine',
  },
  millennial: {
    title: '100X Engine | Interactive Experience',
    description: 'Explore the 100X Engine through an interactive flipbook experience. Discover sovereign AI infrastructure built for India.',
    keywords: ['100xprompt experience', 'interactive AI', 'sovereign AI demo'],
    canonicalPath: '/millennial',
  },
} as const;
