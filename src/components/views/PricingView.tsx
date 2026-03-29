import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import MainLayout from '../layout/MainLayout';
import CTASection from '../sections/CTASection';
import { Seo, generateFAQSchema, NAVIGATION_BREADCRUMBS } from '../../seo';

const GREEN = "#4aab6d";
const DARK = "#111827";

const pricingTiers = [
  {
    name: "Flash",
    subtitle: "Speed-first inference",
    description: "High-speed inference for production workloads. Sub-100ms responses for real-time applications.",
    features: [
      "Optimized for low latency",
      "High throughput API access",
      "Production-ready infrastructure",
      "Standard support",
      "99.5% uptime SLA"
    ],
    cta: "Contact Sales",
    gradient: ["#f8fafc", "#f1f5f9"]
  },
  {
    name: "Pro",
    subtitle: "Enterprise intelligence",
    description: "Deep reasoning capabilities. Sovereign AI for legal, financial, and medical workloads.",
    features: [
      "Extended context window",
      "Deep reasoning mode",
      "Fine-tuning on your data",
      "Priority support",
      "99.9% uptime SLA",
      "On-premise deployment option",
      "DPDP compliance toolkit"
    ],
    cta: "Contact Sales",
    popular: true,
    gradient: ["#f0fdf4", "#dcfce7"]
  },
  {
    name: "Enterprise",
    subtitle: "Sovereign infrastructure",
    description: "Air-gapped deployment. Your datacenter. Your rules. Complete sovereignty.",
    features: [
      "Unlimited scale",
      "Air-gapped deployment",
      "Custom model training",
      "Dedicated infrastructure",
      "24/7 dedicated support",
      "Custom SLA",
      "Security audit support",
      "On-site training"
    ],
    cta: "Contact Sales",
    gradient: ["#fefce8", "#fef9c3"]
  }
];

const faqs = [
  {
    question: "What's the difference between Flash and Pro?",
    answer: "Flash is optimized for speed and real-time applications like chatbots and instant translations. Pro offers deep reasoning capabilities for complex analysis, legal review, and enterprise intelligence tasks."
  },
  {
    question: "Can I deploy on my own infrastructure?",
    answer: "Yes. Pro and Enterprise plans include on-premise deployment options. We support major cloud providers and private datacenter deployments with full data sovereignty."
  },
  {
    question: "What does sovereign AI mean?",
    answer: "Your data never leaves your infrastructure. We provide zero-leakage training, DPDP Act 2023 compliance tooling, and complete control over model behavior and outputs."
  },
  {
    question: "How does pricing work?",
    answer: "We offer flexible pricing based on your usage and deployment requirements. Contact our sales team for a customized quote tailored to your enterprise needs."
  },
  {
    question: "What support options are available?",
    answer: "Flash includes standard support, Pro offers priority support, and Enterprise comes with 24/7 dedicated support with your own customer success team."
  },
  {
    question: "Can I fine-tune on my own data?",
    answer: "Yes, Pro and Enterprise plans include fine-tuning capabilities. Your training data never leaves your infrastructure with our zero-leakage model adaptation techniques."
  }
];

const comparisonFeatures = [
  { feature: "Model Type", flash: "Speed Optimized", pro: "Deep Reasoning", enterprise: "Custom Trained" },
  { feature: "Context Window", flash: "Standard", pro: "Extended", enterprise: "Maximum" },
  { feature: "Response Speed", flash: "Ultra-fast", pro: "Standard", enterprise: "Custom" },
  { feature: "API Access", flash: true, pro: true, enterprise: true },
  { feature: "Fine-tuning", flash: false, pro: true, enterprise: true },
  { feature: "On-premise", flash: false, pro: true, enterprise: true },
  { feature: "Air-gapped", flash: false, pro: false, enterprise: true },
  { feature: "Support", flash: "Standard", pro: "Priority", enterprise: "24/7 Dedicated" },
  { feature: "SLA", flash: "99.5%", pro: "99.9%", enterprise: "Custom" },
];

const pricingFaqs = [
  {
    question: "What's the difference between Flash and Pro?",
    answer: "Flash is optimized for speed and real-time applications like chatbots and instant translations. Pro offers deep reasoning capabilities for complex analysis, legal review, and enterprise intelligence tasks."
  },
  {
    question: "Can I deploy on my own infrastructure?",
    answer: "Yes. Pro and Enterprise plans include on-premise deployment options. We support major cloud providers and private datacenter deployments with full data sovereignty."
  },
  {
    question: "What does sovereign AI mean?",
    answer: "Your data never leaves your infrastructure. We provide zero-leakage training, DPDP Act 2023 compliance tooling, and complete control over model behavior and outputs."
  },
];

export default function PricingView() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <MainLayout>
      <Seo 
        pageKey="pricing" 
        breadcrumbs={NAVIGATION_BREADCRUMBS.pricing}
        schema={generateFAQSchema(pricingFaqs)}
      />
      <main className="flex-grow pt-32 md:pt-40">
        <section className="px-6 pb-20">
          <div className="max-w-5xl mx-auto text-center">
            <m.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <span 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest"
                style={{ background: `${GREEN}15`, color: GREEN }}
              >
                <span className="w-2 h-2 rounded-full" style={{ background: GREEN }} />
                Enterprise Pricing
              </span>
            </m.div>
            
            <m.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl font-normal leading-[1.1] tracking-tight mb-6"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif", color: DARK }}
            >
              Invest in Sovereignty
            </m.h1>
            
            <m.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              No hidden fees. No data leakage. No vendor lock-in.<br />
              Custom pricing tailored to your enterprise needs.
            </m.p>
          </div>
        </section>

        <section className="px-6 pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {pricingTiers.map((tier, index) => (
                <m.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 ${
                    tier.popular 
                      ? 'ring-2 ring-[#4aab6d] shadow-xl' 
                      : 'border border-gray-200 shadow-lg hover:shadow-xl'
                  }`}
                  style={{ 
                    background: `linear-gradient(180deg, ${tier.gradient[0]} 0%, ${tier.gradient[1]} 100%)`,
                    boxShadow: tier.popular ? `0 20px 60px -20px ${GREEN}40` : undefined
                  }}
                >
                  {tier.popular && (
                    <div 
                      className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white"
                      style={{ background: GREEN }}
                    >
                      Most Popular
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {tier.name}
                    </h3>
                    <p className="text-sm text-gray-500">{tier.subtitle}</p>
                  </div>

                  <div className="mb-6">
                    <div className="text-3xl font-bold text-gray-900">Custom Pricing</div>
                    <p className="text-sm text-gray-500 mt-1">Tailored to your needs</p>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-8 min-h-[60px]">
                    {tier.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-gray-700">
                        <svg className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: GREEN }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => window.location.href = '/contact'}
                    className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                      tier.popular
                        ? 'text-white hover:opacity-90'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                    style={tier.popular ? { background: GREEN } : undefined}
                  >
                    {tier.cta}
                  </button>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-24" style={{ background: '#f5f7f9' }}>
          <div className="max-w-6xl mx-auto">
            <m.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-normal text-center mb-4"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif", color: DARK }}
            >
              Feature Comparison
            </m.h2>
            <m.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gray-500 text-center mb-12"
            >
              Everything you need to know at a glance.
            </m.p>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left p-5 text-sm font-semibold text-gray-900 bg-gray-50">Feature</th>
                      <th className="p-5 text-center text-sm font-semibold text-gray-900 bg-gray-50">Flash</th>
                      <th className="p-5 text-center text-sm font-semibold bg-gray-50" style={{ color: GREEN }}>Pro</th>
                      <th className="p-5 text-center text-sm font-semibold text-gray-900 bg-gray-50">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFeatures.map((row, i) => (
                      <tr key={row.feature} className={`border-b border-gray-100 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                        <td className="p-5 text-sm font-medium text-gray-900">{row.feature}</td>
                        <td className="p-5 text-center text-sm text-gray-600">
                          {typeof row.flash === 'boolean' ? (
                            row.flash ? (
                              <svg className="w-5 h-5 mx-auto" style={{ color: GREEN }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg className="w-5 h-5 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            )
                          ) : row.flash}
                        </td>
                        <td className="p-5 text-center text-sm font-medium" style={{ color: typeof row.pro === 'boolean' ? (row.pro ? GREEN : '#9ca3af') : DARK }}>
                          {typeof row.pro === 'boolean' ? (
                            row.pro ? (
                              <svg className="w-5 h-5 mx-auto" style={{ color: GREEN }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg className="w-5 h-5 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            )
                          ) : row.pro}
                        </td>
                        <td className="p-5 text-center text-sm text-gray-600">
                          {typeof row.enterprise === 'boolean' ? (
                            row.enterprise ? (
                              <svg className="w-5 h-5 mx-auto" style={{ color: GREEN }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg className="w-5 h-5 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            )
                          ) : row.enterprise}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </m.div>
          </div>
        </section>

        <section className="px-6 py-24 bg-white">
          <div className="max-w-3xl mx-auto">
            <m.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-normal text-center mb-4"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif", color: DARK }}
            >
              Frequently Asked Questions
            </m.h2>
            <m.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gray-500 text-center mb-12"
            >
              Everything you need to know about our pricing.
            </m.p>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="border border-gray-200 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                    <m.svg
                      animate={{ rotate: openFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-5 h-5 flex-shrink-0 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </m.svg>
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <m.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                          {faq.answer}
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
    </MainLayout>
  );
}
