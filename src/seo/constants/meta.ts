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
  locale: 'en_US',
} as const;

export const PAGE_META: Record<string, PageMeta> = {
  home: {
    title: '100xprompt | Global Sovereign AI Infrastructure - Private LLM & GPU',
    description: 'The world\'s leading sovereign AI platform. Self-hosted LLMs, private GPU infrastructure, and agentic CLI. 100% data sovereignty, globally compliant. Deploy AI that never leaves your control.',
    keywords: [
      'sovereign AI', 'global sovereign AI', 'sovereign AI platform', 'sovereign artificial intelligence',
      'data sovereignty AI', 'sovereign AI solution', 'sovereign LLM',
      'AI infrastructure', 'self-hosted LLM', 'private AI', 'private LLM', 'on-premise AI',
      'global AI platform', 'compliant AI', 'privacy standards AI',
      'enterprise AI', 'government AI', 'air-gapped AI', 'private GPU infrastructure',
      'sovereign AI data center', 'self-hosted AI model', 'private AI deployment', 'AI sovereignty',
      '100xprompt', '100X Prompt', '100X Code', 'global AI company'
    ],
    canonicalPath: '/',
  },
  code: {
    title: '100X Code | Agentic CLI for Sovereign Development - AI Coding Assistant',
    description: 'Terminal-native AI coding assistant. Autonomous code generation, debugging, multi-session orchestration, MCP tool integration. The AI co-pilot that runs on YOUR infrastructure.',
    keywords: [
      'AI CLI', 'AI coding assistant', 'agentic coding', 'terminal AI', 'AI code generator',
      'autonomous coding', 'developer tools', 'MCP protocol', 'AI pair programmer',
      'command line AI', 'AI for developers', 'coding AI assistant', 'AI code completion',
      'sovereign development', 'private coding AI', 'on-premise coding assistant',
      '100X Code', '100xprompt CLI', 'global developer tools', 'AI programming assistant'
    ],
    canonicalPath: '/code',
  },
  model: {
    title: 'Sovereign AI Models | Pro & Flash LLMs - Self-Hosted Language Models',
    description: 'Self-hosted large language models for global enterprises. 128K context, FP8 quantization, sovereign compliance. Pro for deep reasoning, Flash for high-speed inference. Your data, your model.',
    keywords: [
      'LLM', 'global LLM', 'self-hosted language model', 'sovereign LLM', 'private LLM',
      'enterprise AI model', 'large language model', 'LLM deployment',
      'on-premise LLM', 'air-gapped LLM', 'compliant LLM', 'foundation model',
      'AI model', 'language model deployment', 'private AI model', 'sovereign AI model',
      '100X Prompt Pro', '100X Prompt Flash', 'sovereign foundation model', 'enterprise LLM'
    ],
    canonicalPath: '/model',
  },
  pro: {
    title: '100X Prompt Pro | Enterprise Sovereign LLM for Deep Reasoning',
    description: 'Flagship sovereign LLM for complex reasoning. 128K context, Mixture of Experts architecture, on-premise deployment. Built for legal, financial, medical, and government workloads.',
    keywords: [
      'enterprise LLM', 'reasoning AI', 'deep reasoning LLM', 'sovereign language model',
      'sovereign AI', 'private LLM', 'enterprise AI', 'MoE architecture', 'mixture of experts LLM',
      'legal AI', 'financial AI', 'medical AI', 'government AI',
      'AI for law firms', 'AI for banks', 'AI for healthcare', 'AI for government',
      'high context LLM', '128K context LLM', 'reasoning model', 'enterprise AI model'
    ],
    canonicalPath: '/pro',
  },
  flash: {
    title: '100X Prompt Flash | High-Speed Sovereign LLM - Low Latency AI',
    description: 'Lightweight sovereign LLM optimized for speed. Sub-500ms latency, 128K context, production-ready. Perfect for real-time applications, chatbots, and high-throughput workloads.',
    keywords: [
      'fast LLM', 'low latency AI', 'production AI', 'sovereign inference',
      'high speed LLM', 'real-time AI', 'fast inference LLM', 'low latency language model',
      'production LLM', 'chatbot LLM', 'conversational AI', 'AI chatbot',
      'fast AI model', 'speed optimized LLM', 'real-time language model', 'enterprise chatbot AI',
      'sub-500ms LLM', 'high throughput AI', 'production-ready LLM'
    ],
    canonicalPath: '/flash',
  },
  infrastructure: {
    title: 'Sovereign AI Infrastructure | Private GPU Deployment - AI Data Center',
    description: 'End-to-end GPU orchestration for global enterprises. Air-gapped deployment, private compute clusters, zero data leakage. Your infrastructure, your rules. On-premise AI at scale.',
    keywords: [
      'GPU infrastructure', 'private AI compute', 'sovereign GPU', 'AI datacenter',
      'sovereign cloud', 'GPU cluster', 'AI compute', 'private GPU cloud',
      'on-premise GPU', 'air-gapped deployment', 'private AI infrastructure', 'GPU orchestration',
      'sovereign AI data center', 'sovereign compute', 'private ML infrastructure',
      'enterprise GPU', 'government GPU infrastructure', 'AI hardware',
      'NVIDIA GPU', 'AI server', 'ML infrastructure', 'GPU as a service'
    ],
    canonicalPath: '/infrastructure',
  },
  pricing: {
    title: 'Pricing | Sovereign AI for Every Scale - Transparent AI Pricing',
    description: 'Transparent pricing for sovereign AI infrastructure. Flash for speed, Pro for reasoning, Enterprise for air-gapped deployment. No hidden fees. ROI-focused AI investment.',
    keywords: [
      'AI pricing', 'sovereign AI cost', 'LLM pricing', 'enterprise AI pricing',
      'AI model pricing', 'LLM cost', 'GPU pricing', 'AI infrastructure cost',
      'private AI pricing', 'on-premise AI cost', 'enterprise AI ROI', 'AI investment',
      'affordable AI', 'AI for startups', 'AI for SMB',
      '100xprompt pricing', 'sovereign AI subscription', 'AI platform pricing'
    ],
    canonicalPath: '/pricing',
  },
  contact: {
    title: 'Contact Us | Start Your Sovereign AI Journey - Free AI Consultation',
    description: 'Get in touch with 100xprompt team. Free AI consultation for enterprises and government. Tell us your use case and we\'ll design your sovereign AI deployment roadmap.',
    keywords: [
      'contact 100xprompt', 'AI consultation', 'enterprise AI inquiry', 'AI consultation',
      'sovereign AI consultation', 'AI strategy consultation', 'enterprise AI advisor',
      'government AI consultation', 'AI deployment consultation', 'private AI consultation',
      'AI demo request', 'LLM demo', 'sovereign AI demo', 'AI partnership inquiry',
      'AI vendor', 'AI solutions', 'enterprise AI contact'
    ],
    canonicalPath: '/contact',
  },
  docs: {
    title: 'Documentation | 100xprompt Developer Docs - AI API & CLI Documentation',
    description: 'Complete documentation for 100X Code CLI, sovereign LLM APIs, and infrastructure deployment. Quickstart guides, API references, and best practices. Start building in minutes.',
    keywords: [
      '100xprompt docs', 'AI documentation', 'CLI docs', 'LLM API docs',
      'sovereign AI documentation', 'AI API documentation', 'LLM API reference',
      'AI CLI documentation', 'developer documentation', 'API reference',
      '100X Code documentation', '100X Prompt API', 'AI integration guide',
      'LLM integration docs', 'private AI API', 'sovereign AI API docs',
      'AI SDK documentation', 'machine learning API docs', 'NLP API documentation'
    ],
    canonicalPath: '/docs',
  },
  blog: {
    title: 'Blog | Sovereign AI Insights - AI News, Policy & Technology',
    description: 'Latest updates on sovereign AI, global AI policy, enterprise AI adoption, and technical deep-dives. Expert insights from 100xprompt team on AI sovereignty and compliance.',
    keywords: [
      'AI blog', 'sovereign AI news', 'AI policy', 'enterprise AI insights',
      'global AI news', 'AI technology blog', 'LLM blog', 'AI infrastructure blog',
      'data sovereignty blog', 'AI privacy blog', 'compliance blog', 'AI regulation',
      'enterprise AI trends', 'government AI news', 'AI innovation',
      'sovereign AI', 'AI thought leadership', 'AI research', 'LLM research blog'
    ],
    canonicalPath: '/blog',
  },
  login: {
    title: 'Login | Access Your Sovereign AI Dashboard - 100xprompt Portal',
    description: 'Sign in to your 100xprompt account. Access your CLI, manage models, monitor infrastructure, and deploy sovereign AI. Secure, private, and fully controlled by you.',
    keywords: [
      '100xprompt login', 'AI dashboard', 'sovereign AI access', 'AI platform login',
      'LLM dashboard', 'AI management console', 'private AI portal', 'sovereign AI portal',
      'AI infrastructure dashboard', 'model management dashboard', 'GPU dashboard',
      '100xprompt account', 'AI platform access', 'enterprise AI login'
    ],
    canonicalPath: '/login',
  },
  privacy: {
    title: 'Privacy Policy | Data Sovereignty Commitment - Globally Compliant',
    description: 'Our commitment to data privacy and sovereignty. Learn how 100xprompt protects your data under global privacy standards. Zero data sharing, complete transparency, absolute control.',
    keywords: [
      'privacy policy', 'compliance', 'data protection', 'AI privacy',
      'data protection laws', 'AI data privacy', 'sovereign AI privacy', 'data sovereignty policy',
      'enterprise data privacy', 'privacy compliance',
      'AI privacy policy', 'LLM privacy', 'private AI data handling', 'secure AI data'
    ],
    canonicalPath: '/privacy',
  },
  terms: {
    title: 'Terms of Use | 100xprompt - Sovereign AI Platform Terms',
    description: 'Terms and conditions for using 100xprompt\'s sovereign AI platform and services. Clear, fair terms for enterprises, government, and developers.',
    keywords: [
      'terms of use', 'legal', 'agreement', 'AI terms of service', 'LLM terms',
      'sovereign AI terms', 'enterprise AI agreement', 'AI service agreement',
      '100xprompt terms', 'AI platform terms', 'software license',
      'AI subscription terms', 'enterprise software terms'
    ],
    canonicalPath: '/terms',
  },
  machine: {
    title: 'Machine View | AI-Optimized Content - Structured Data for AI Systems',
    description: 'Structured content optimized for AI consumption. Complete information about 100xprompt\'s sovereign AI platform in machine-readable format. Perfect for AI agents and automated systems.',
    keywords: [
      'AI readable', 'structured content', 'machine optimized', 'llms.txt',
      'AI agent content', 'machine readable content', 'structured AI data',
      'AI consumable content', 'llm optimized content', 'AI-parseable content'
    ],
    canonicalPath: '/machine',
  },
  millennial: {
    title: '100X Engine | Interactive Sovereign AI Experience - Product Demo',
    description: 'Explore the 100X Engine through an interactive flipbook experience. Discover sovereign AI infrastructure built for global scale. Visual product tour and demo.',
    keywords: [
      '100xprompt experience', 'interactive AI', 'sovereign AI demo', 'AI product demo',
      '100X Engine', 'AI platform demo', 'interactive AI tour', 'sovereign AI walkthrough',
      '100xprompt demo', 'AI infrastructure demo', 'LLM demo'
    ],
    canonicalPath: '/millennial',
  },
} as const;
