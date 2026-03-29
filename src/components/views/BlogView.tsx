import { useState } from 'react';
import { m } from 'framer-motion';
import MainLayout from '../layout/MainLayout';
import CTASection from '../sections/CTASection';
import { Seo, NAVIGATION_BREADCRUMBS } from '../../seo';

const GREEN = "#4aab6d";
const DARK = "#111827";

const allPosts = [
  {
    category: "Engineering",
    title: "Building Sovereign AI: Why We Chose GLM-5",
    excerpt: "A deep dive into our decision to build on Zhipu AI's GLM-5 and what it means for Indian enterprises.",
    date: "Coming Soon",
    readTime: "8 min read"
  },
  {
    category: "Product",
    title: "From 0 to 128K: Mastering Context Windows",
    excerpt: "How we optimized our inference pipeline to handle massive context without sacrificing latency.",
    date: "Coming Soon",
    readTime: "6 min read"
  },
  {
    category: "Compliance",
    title: "DPDP Act 2023: A Developer's Guide",
    excerpt: "Everything you need to know about India's data protection law and how to build compliant AI systems.",
    date: "Coming Soon",
    readTime: "12 min read"
  },
  {
    category: "Engineering",
    title: "FP8 Quantization in Production",
    excerpt: "Lessons from deploying quantized models at scale. Performance, accuracy, and tradeoffs.",
    date: "Coming Soon",
    readTime: "10 min read"
  },
  {
    category: "Case Studies",
    title: "How a PSU Reduced Contract Review Time by 80%",
    excerpt: "A detailed case study on deploying sovereign AI in a public sector undertaking.",
    date: "Coming Soon",
    readTime: "9 min read"
  },
  {
    category: "Company",
    title: "Our Mission: AI Sovereignty for India",
    excerpt: "Why we started 100X Prompt and our vision for the future of Indian AI infrastructure.",
    date: "Coming Soon",
    readTime: "5 min read"
  }
];

const categories = ["All", "Engineering", "Product", "Compliance", "Case Studies", "Company"];

export default function BlogView() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filteredPosts = activeCategory === "All" 
    ? allPosts 
    : allPosts.filter(post => post.category === activeCategory);

  const handleSubscribe = () => {
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <MainLayout>
      <Seo pageKey="blog" breadcrumbs={NAVIGATION_BREADCRUMBS.blog} />
      <main className="flex-grow pt-32 md:pt-40 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest mb-8" style={{ background: `${GREEN}12`, color: GREEN }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: GREEN }} />
              Blog
            </div>
            
            <h1 
              className="text-5xl sm:text-6xl md:text-7xl font-normal leading-[1.1] tracking-tight mb-6"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif", color: DARK }}
            >
              Stories from the Frontlines
            </h1>
            
            <p 
              className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Insights on sovereign AI, enterprise infrastructure, and building for India.
            </p>
          </m.div>

          {/* Category Pills */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat 
                    ? 'text-white' 
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900'
                }`}
                style={activeCategory === cat ? { background: GREEN } : undefined}
              >
                {cat}
              </button>
            ))}
          </m.div>

          {/* Featured Post - Only show on "All" category */}
          {activeCategory === "All" && (
            <m.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-16"
            >
              <div 
                className="relative rounded-3xl overflow-hidden p-10 md:p-14"
                style={{ 
                  background: `linear-gradient(135deg, ${GREEN}15 0%, ${GREEN}05 100%)`,
                  border: `1px solid ${GREEN}20`
                }}
              >
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6" style={{ background: GREEN, color: 'white' }}>
                    Featured
                  </div>
                  <h2 
                    className="text-3xl md:text-4xl font-normal leading-tight mb-4"
                    style={{ fontFamily: "'Instrument Serif', Georgia, serif", color: DARK }}
                  >
                    The Sovereign AI Manifesto
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Why Indian enterprises need AI that respects borders, laws, and data sovereignty. A vision for the next decade of enterprise intelligence.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Coming Soon</span>
                    <span>•</span>
                    <span>15 min read</span>
                  </div>
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block">
                  <div 
                    className="absolute inset-8 rounded-2xl"
                    style={{ 
                      background: `linear-gradient(180deg, ${GREEN}30, transparent)`,
                    }}
                  />
                </div>
              </div>
            </m.div>
          )}

          {/* Post Grid */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid md:grid-cols-2 gap-8 mb-16"
          >
            {filteredPosts.map((post, i) => (
              <m.article
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                className="group bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ background: `${GREEN}12`, color: GREEN }}
                  >
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400">{post.readTime}</span>
                </div>
                <h3 
                  className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#4aab6d] transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{post.date}</span>
                  <div className="flex items-center gap-1 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: GREEN }}>
                    Read more
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </m.article>
            ))}
          </m.div>

          {/* Newsletter CTA */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
            style={{ 
              background: "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #f0fdf4 100%)",
              border: "1px solid rgba(74, 171, 109, 0.2)"
            }}
          >
            <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 30% 50%, rgba(74, 171, 109, 0.15) 0%, transparent 50%)" }} />
            <div className="relative z-10">
            {subscribed ? (
              <div className="py-8">
                <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: "rgba(74, 171, 109, 0.15)" }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4aab6d" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-normal text-[hsl(var(--color-text-primary))] mb-2" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                  You're on the list!
                </h3>
                <p className="text-[hsl(var(--color-text-secondary))]">We'll notify you when new posts launch.</p>
              </div>
            ) : (
              <>
                <h3 
                  className="text-2xl md:text-3xl font-normal text-[hsl(var(--color-text-primary))] mb-4"
                  style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                >
                  Get the latest insights
                </h3>
                <p className="text-[hsl(var(--color-text-secondary))] mb-8 max-w-lg mx-auto">
                  Subscribe to our newsletter for engineering deep-dives, product updates, and thought pieces on sovereign AI.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-5 py-3 rounded-xl bg-white border border-[rgba(74,171,109,0.3)] text-[hsl(var(--color-text-primary))] placeholder:text-[hsl(var(--color-text-muted))] focus:outline-none focus:ring-2 focus:ring-[#4aab6d] focus:border-transparent transition-all"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                  <m.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubscribe}
                    className="px-6 py-3 rounded-xl font-semibold text-white transition-all"
                    style={{ background: GREEN }}
                  >
                    Subscribe
                  </m.button>
                </div>
                <p className="text-xs text-[hsl(var(--color-text-muted))] mt-4">No spam. Unsubscribe anytime.</p>
              </>
            )}
            </div>
          </m.div>

          {/* Floating Elements */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
            <div 
              className="absolute top-1/3 right-20 w-72 h-72 rounded-full blur-3xl opacity-20"
              style={{ background: GREEN }}
            />
            <div 
              className="absolute bottom-1/4 left-10 w-80 h-80 rounded-full blur-3xl opacity-15"
              style={{ background: '#4aab6d' }}
            />
          </div>
        </div>
      </main>

      <CTASection />
    </MainLayout>
  );
}
