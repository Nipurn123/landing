import { m, AnimatePresence } from 'framer-motion';
import { useState, useRef, useCallback, useMemo, memo } from 'react';
import { 
  Loader2, Globe, ShoppingBag, ArrowRight, Instagram, Twitter, 
  Lock, RefreshCw, ChevronLeft, ChevronRight, Share2, Heart, 
  Star, Leaf, Shield, Award, X, Plus, Minus, Menu
} from 'lucide-react';

const AURA_PHASES = ['tailwind', 'layout', 'navbar', 'hero', 'products', 'features', 'footer', 'complete'];
const NAVBAR_PHASES = ['navbar', 'hero', 'products', 'features', 'footer', 'complete'];
const SECTION_IDS = ['hero', 'products', 'features', 'journal', 'footer'] as const;

interface LivePreviewProps {
  phase: string;
}

const PRODUCTS = [
  {
    id: 1,
    name: "Pure Dew Serum",
    desc: "Hyaluronic Acid & Vitamin C",
    price: 48,
    img: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 2,
    name: "Silk Essence",
    desc: "Overnight Renewal Mask",
    price: 62,
    img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 3,
    name: "Alpine Mist",
    desc: "Refreshing Facial Toner",
    price: 34,
    img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600"
  }
];

const FEATURES = [
  { icon: Leaf, title: "100% Organic", desc: "Responsibly sourced ingredients" },
  { icon: Heart, title: "Cruelty Free", desc: "Never tested on animals" },
  { icon: Shield, title: "Dermatologist Tested", desc: "Clinically proven results" },
];

const JOURNAL_POSTS = [
  {
    title: "The Art of Layering Serums",
    excerpt: "Master the perfect skincare routine...",
    img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=400"
  },
  {
    title: "Winter Skin Survival Guide",
    excerpt: "Keep your skin glowing all season...",
    img: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=400"
  }
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  img: string;
}

export default memo(function LivePreview({ phase }: LivePreviewProps) {
  const isAura = AURA_PHASES.includes(phase);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotification, setShowNotification] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(`aura-${sectionId}`);
    if (element && contentRef.current) {
      const container = contentRef.current;
      const offsetTop = element.offsetTop - 60;
      container.scrollTo({ top: offsetTop, behavior: 'smooth' });
      setActiveSection(sectionId);
      setShowMobileMenu(false);
    }
  }, []);

  const addToCart = useCallback((product: typeof PRODUCTS[0]) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { 
        id: product.id, 
        name: product.name, 
        price: product.price, 
        quantity: 1,
        img: product.img
      }];
    });
    setShowNotification(`${product.name} added to bag`);
    setTimeout(() => setShowNotification(null), 2000);
  }, []);

  const updateQuantity = useCallback((id: number, delta: number) => {
    setCart(prev => prev.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(0, item.quantity + delta) }
        : item
    ).filter(item => item.quantity > 0));
  }, []);

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const showNavbar = useMemo(() => NAVBAR_PHASES.includes(phase), [phase]);

  const handleScroll = useCallback(() => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setScrollProgress(progress);

      for (const section of SECTION_IDS) {
        const element = document.getElementById(`aura-${section}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    }
  }, []);

  return (
    <div className={`w-full rounded-2xl border transition-all duration-1000 shadow-2xl overflow-hidden flex flex-col bg-gradient-to-b from-stone-50 to-white border-stone-200/80 h-[550px]`}>
      {/* Premium Browser Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-stone-50 via-white to-stone-50 border-b border-stone-200/60 flex items-center gap-3 shrink-0 z-50">
        {/* Traffic Lights */}
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400 hover:bg-red-500 transition-colors cursor-pointer" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors cursor-pointer" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400 hover:bg-green-500 transition-colors cursor-pointer" />
        </div>

        {/* Navigation Arrows */}
        <div className="flex gap-0.5">
          <button className="w-6 h-6 rounded-md bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors">
            <ChevronLeft className="w-3 h-3 text-stone-400" />
          </button>
          <button className="w-6 h-6 rounded-md bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors">
            <ChevronRight className="w-3 h-3 text-stone-400" />
          </button>
        </div>

        {/* URL Bar */}
        <div className="flex-grow max-w-sm">
          <div className="h-6 rounded-md bg-stone-100 border border-stone-200/80 flex items-center px-2.5 gap-2">
            {phase === 'complete' ? (
              <Lock className="w-2.5 h-2.5 text-emerald-500" />
            ) : (
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            )}
            <span className="text-[10px] font-medium text-stone-600 flex-grow">
              {phase === 'complete' ? 'aura-skin.com' : 'localhost:3000'}
            </span>
            <RefreshCw className="w-2.5 h-2.5 text-stone-400 hover:text-stone-600 cursor-pointer transition-colors" />
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex gap-1.5">
          <button className="w-6 h-6 rounded-md hover:bg-stone-100 flex items-center justify-center transition-colors">
            <Share2 className="w-3 h-3 text-stone-400" />
          </button>
          <button className="w-6 h-6 rounded-md hover:bg-stone-100 flex items-center justify-center transition-colors">
            <Heart className="w-3 h-3 text-stone-400" />
          </button>
        </div>
      </div>

      {/* Scroll Progress Bar */}
      <div className="h-0.5 bg-stone-100 w-full">
        <m.div 
          className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Content Area - SCROLLABLE */}
      <div 
        ref={contentRef}
        onScroll={handleScroll}
        className="flex-grow relative overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-stone-50 [&::-webkit-scrollbar-thumb]:bg-stone-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-stone-400"
      >
        <AnimatePresence mode="wait">
          {(!isAura || phase === 'init' || phase === 'install') && (
            <m.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center space-y-4 bg-stone-50"
            >
              <m.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              >
                <Loader2 className="w-8 h-8 text-stone-300" />
              </m.div>
              <div className="text-center">
                <p className="text-stone-400 text-[11px] font-medium tracking-wide">Compiling Next.js Project</p>
                <p className="text-stone-300 text-[10px] mt-1">Installing dependencies...</p>
              </div>
            </m.div>
          )}

          {isAura && (
            <m.div 
              key="aura-site"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full flex flex-col bg-[#F9F6F2]"
            >
              {/* Navbar */}
              {showNavbar && (
                <m.nav 
                  initial={{ y: -100 }}
                  animate={{ y: 0 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  className="sticky top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-stone-100/50 px-6 py-4 flex justify-between items-center"
                >
                  <button 
                    onClick={() => scrollToSection('hero')}
                    className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                  >
                    <div className="w-9 h-9 rounded-xl bg-stone-900 flex items-center justify-center">
                      <span className="text-white font-serif text-lg font-semibold">A</span>
                    </div>
                    <span className="font-serif text-xl tracking-wide text-stone-900">AURA</span>
                  </button>
                  
                  <div className="hidden md:flex gap-8 text-[9px] font-bold uppercase tracking-[0.15em]">
                    {['Shop', 'Rituals', 'About', 'Journal'].map((link) => (
                      <button 
                        key={link}
                        onClick={() => scrollToSection(link.toLowerCase())}
                        className={`transition-colors ${activeSection === link.toLowerCase() ? 'text-stone-900' : 'text-stone-400 hover:text-stone-900'}`}
                      >
                        {link}
                      </button>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setShowCart(true)}
                      className="relative hover:text-stone-900 transition-colors"
                    >
                      <ShoppingBag className="w-4 h-4 text-stone-600" />
                      {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 w-4 h-4 bg-stone-900 text-white text-[8px] rounded-full flex items-center justify-center font-bold">
                          {cartCount}
                        </span>
                      )}
                    </button>
                    <button 
                      onClick={() => setShowMobileMenu(true)}
                      className="md:hidden"
                    >
                      <Menu className="w-4 h-4 text-stone-600" />
                    </button>
                  </div>
                </m.nav>
              )}

              {/* Mobile Menu */}
              <AnimatePresence>
                {showMobileMenu && (
                  <m.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[60] bg-stone-900/50 backdrop-blur-sm flex"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <m.div 
                      initial={{ x: '-100%' }}
                      animate={{ x: 0 }}
                      exit={{ x: '-100%' }}
                      transition={{ type: "spring", damping: 25 }}
                      className="bg-white w-48 h-full p-6 flex flex-col"
                      onClick={e => e.stopPropagation()}
                    >
                      <button 
                        onClick={() => setShowMobileMenu(false)}
                        className="self-end mb-6"
                      >
                        <X className="w-5 h-5 text-stone-400" />
                      </button>
                      {['Shop', 'Rituals', 'About', 'Journal'].map((link) => (
                        <button 
                          key={link}
                          onClick={() => scrollToSection(link.toLowerCase())}
                          className="text-left py-3 text-stone-600 hover:text-stone-900 font-medium text-sm"
                        >
                          {link}
                        </button>
                      ))}
                    </m.div>
                  </m.div>
                )}
              </AnimatePresence>

              {/* Cart Drawer */}
              <AnimatePresence>
                {showCart && (
                  <m.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[60] bg-stone-900/50 backdrop-blur-sm flex justify-end"
                    onClick={() => setShowCart(false)}
                  >
                    <m.div 
                      initial={{ x: '100%' }}
                      animate={{ x: 0 }}
                      exit={{ x: '100%' }}
                      transition={{ type: "spring", damping: 25 }}
                      className="bg-white w-72 h-full p-6 flex flex-col shadow-2xl"
                      onClick={e => e.stopPropagation()}
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="font-serif text-lg text-stone-900">Your Bag</h3>
                        <button onClick={() => setShowCart(false)}>
                          <X className="w-5 h-5 text-stone-400" />
                        </button>
                      </div>
                      
                      {cart.length === 0 ? (
                        <div className="flex-grow flex flex-col items-center justify-center text-center">
                          <ShoppingBag className="w-12 h-12 text-stone-200 mb-4" />
                          <p className="text-stone-400 text-sm">Your bag is empty</p>
                        </div>
                      ) : (
                        <>
                          <div className="flex-grow space-y-4 overflow-auto">
                            {cart.map(item => (
                              <div key={item.id} className="flex gap-3">
                                <img src={item.img} className="w-14 h-14 object-cover rounded-lg" alt={item.name} />
                                <div className="flex-grow">
                                  <h4 className="text-xs font-medium text-stone-900">{item.name}</h4>
                                  <p className="text-xs text-stone-400">${item.price}</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <button 
                                      onClick={() => updateQuantity(item.id, -1)}
                                      className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center"
                                    >
                                      <Minus className="w-3 h-3 text-stone-600" />
                                    </button>
                                    <span className="text-xs font-medium">{item.quantity}</span>
                                    <button 
                                      onClick={() => updateQuantity(item.id, 1)}
                                      className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center"
                                    >
                                      <Plus className="w-3 h-3 text-stone-600" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="border-t pt-4 mt-4">
                            <div className="flex justify-between mb-4">
                              <span className="text-stone-600 text-sm">Total</span>
                              <span className="font-serif text-lg text-stone-900">${cartTotal}</span>
                            </div>
                            <button className="w-full bg-stone-900 text-white py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-stone-800 transition-colors">
                              Checkout
                            </button>
                          </div>
                        </>
                      )}
                    </m.div>
                  </m.div>
                )}
              </AnimatePresence>

              {/* Notification Toast */}
              <AnimatePresence>
                {showNotification && (
                  <m.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[70] bg-stone-900 text-white px-4 py-2 rounded-full text-xs font-medium shadow-xl flex items-center gap-2"
                  >
                    <span>✓</span>
                    {showNotification}
                  </m.div>
                )}
              </AnimatePresence>

              {/* Hero Section */}
              <section id="aura-hero">
                {['hero', 'products', 'features', 'footer', 'complete'].includes(phase) && (
                  <m.section 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative h-[340px] flex items-center overflow-hidden"
                  >
                    <div className="absolute inset-0 z-0">
                      <img 
                        src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=1400" 
                        className="w-full h-full object-cover"
                        alt="Hero"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-stone-900/50 via-stone-900/20 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#F9F6F2] via-transparent to-transparent" />
                    </div>
                    
                    <div className="relative z-10 max-w-xl px-6 py-8">
                      <m.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-1.5 mb-4"
                      >
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                        ))}
                        <span className="text-[9px] text-white/70 font-medium ml-1.5">50,000+ Happy Customers</span>
                      </m.div>
                      
                      <m.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl font-serif text-white leading-[0.95] mb-3 drop-shadow-lg"
                      >
                        Radiance,<br/><span className="italic">Defined.</span>
                      </m.h1>
                      
                      <m.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-white/60 text-[11px] max-w-xs mb-5 leading-relaxed"
                      >
                        Premium skincare crafted with nature's finest ingredients for your daily ritual.
                      </m.p>
                      
                      <m.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex gap-3"
                      >
                        <button 
                          onClick={() => scrollToSection('shop')}
                          className="group flex items-center gap-2 bg-white text-stone-900 px-5 py-2.5 rounded-full text-[9px] font-bold uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all duration-300 shadow-lg"
                        >
                          Shop Collection
                          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                        </button>
                        <button 
                          onClick={() => scrollToSection('about')}
                          className="flex items-center bg-white/10 backdrop-blur-sm text-white px-4 py-2.5 rounded-full text-[9px] font-bold uppercase tracking-widest border border-white/20 hover:bg-white/20 transition-all duration-300"
                        >
                          Learn More
                        </button>
                      </m.div>
                    </div>
                  </m.section>
                )}
              </section>

              {/* Stats Section */}
              {['hero', 'products', 'features', 'footer', 'complete'].includes(phase) && (
                <div className="py-6 bg-white border-y border-stone-100/50 grid grid-cols-3 divide-x divide-stone-100">
                  {[
                    { icon: Award, label: "Organic", val: "100%" },
                    { icon: Shield, label: "Tested", val: "Yes" },
                    { icon: Globe, label: "Shipping", val: "Global" }
                  ].map((stat, i) => (
                    <div key={i} className="flex flex-col items-center text-center px-3">
                      <stat.icon className="w-4 h-4 text-amber-500 mb-1" />
                      <span className="text-sm font-serif text-stone-900">{stat.val}</span>
                      <span className="text-[8px] uppercase tracking-widest text-stone-400 font-bold">{stat.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Products Section */}
              <section id="aura-shop">
                {['products', 'features', 'footer', 'complete'].includes(phase) && (
                  <m.section 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-10 px-6 bg-[#F9F6F2]"
                  >
                    <div className="flex justify-between items-end mb-6">
                      <div>
                        <h2 className="text-2xl font-serif text-stone-900 mb-1">The Essentials</h2>
                        <p className="text-stone-400 text-[10px] max-w-xs">Curated products for your natural glow.</p>
                      </div>
                      <button className="text-[9px] font-bold border-b border-stone-900 pb-0.5 hover:text-amber-600 hover:border-amber-600 transition-all uppercase tracking-widest">
                        View All
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {PRODUCTS.map((p, i) => (
                        <m.div 
                          key={p.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="group cursor-pointer"
                        >
                          <div className="relative aspect-[4/5] mb-3 overflow-hidden rounded-lg shadow-sm">
                            <img src={p.img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={p.name} />
                            <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/5 transition-all duration-300" />
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                addToCart(p);
                              }}
                              className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white text-stone-900 px-4 py-1.5 rounded-full text-[8px] font-bold uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 shadow-lg hover:bg-stone-900 hover:text-white"
                            >
                              Add to Bag
                            </button>
                          </div>
                          <div className="flex justify-between items-start gap-2">
                            <div className="min-w-0">
                              <h3 className="text-[10px] font-bold text-stone-900 uppercase tracking-wider truncate">{p.name}</h3>
                              <p className="text-[9px] text-stone-400 truncate">{p.desc}</p>
                            </div>
                            <span className="text-xs font-serif text-stone-900 shrink-0">${p.price}</span>
                          </div>
                        </m.div>
                      ))}
                    </div>
                  </m.section>
                )}
              </section>

              {/* Features Section (About) */}
              <section id="aura-about">
                {['features', 'footer', 'complete'].includes(phase) && (
                  <m.section 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-10 px-6 bg-white text-center"
                  >
                    <span className="text-[9px] font-bold text-amber-600 uppercase tracking-[0.2em] mb-2 block">Our Promise</span>
                    <h2 className="text-xl font-serif text-stone-900 max-w-md mx-auto mb-6 leading-tight">
                      Harnessing nature's power, refined for your ritual.
                    </h2>
                    
                    <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
                      {FEATURES.map((f) => (
                        <div key={f.title} className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center mb-2">
                            <f.icon className="w-4 h-4 text-stone-600" />
                          </div>
                          <h3 className="text-[10px] font-bold text-stone-900 mb-0.5">{f.title}</h3>
                          <p className="text-[8px] text-stone-400 text-center leading-tight">{f.desc}</p>
                        </div>
                      ))}
                    </div>
                  </m.section>
                )}
              </section>

              {/* Journal Section */}
              <section id="aura-journal">
                {['footer', 'complete'].includes(phase) && (
                  <m.section 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-10 px-6 bg-[#F9F6F2]"
                  >
                    <div className="flex justify-between items-end mb-6">
                      <div>
                        <h2 className="text-2xl font-serif text-stone-900 mb-1">Journal</h2>
                        <p className="text-stone-400 text-[10px]">Skincare tips & rituals</p>
                      </div>
                      <button className="text-[9px] font-bold border-b border-stone-900 pb-0.5 hover:text-amber-600 hover:border-amber-600 transition-all uppercase tracking-widest">
                        All Posts
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {JOURNAL_POSTS.map((post, i) => (
                        <m.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="group cursor-pointer"
                        >
                          <div className="relative aspect-[4/3] mb-2 overflow-hidden rounded-lg">
                            <img src={post.img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={post.title} />
                          </div>
                          <h3 className="text-[10px] font-bold text-stone-900 group-hover:text-amber-600 transition-colors">{post.title}</h3>
                          <p className="text-[9px] text-stone-400">{post.excerpt}</p>
                        </m.div>
                      ))}
                    </div>
                  </m.section>
                )}
              </section>

              {/* Rituals Section (hidden anchor for nav) */}
              <section id="aura-rituals" className="hidden" />

              {/* Footer */}
              <section id="aura-footer">
                {['footer', 'complete'].includes(phase) && (
                  <m.footer 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-stone-900 py-8 px-6"
                  >
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="col-span-2">
                        <span className="font-serif text-2xl text-white mb-3 block">AURA</span>
                        <p className="text-stone-400 text-[9px] max-w-[180px] leading-relaxed mb-4">
                          Join our community for early access to new launches and exclusive content.
                        </p>
                        <div className="flex gap-2">
                          {[Instagram, Twitter].map((Icon, i) => (
                            <button key={i} className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-500 transition-colors">
                              <Icon className="w-3 h-3 text-white" />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-white text-[9px] font-bold uppercase tracking-[0.15em] mb-3">Support</h4>
                        <ul className="space-y-2 text-stone-400 text-[9px]">
                          <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
                          <li className="hover:text-white cursor-pointer transition-colors">Shipping</li>
                          <li className="hover:text-white cursor-pointer transition-colors">Returns</li>
                        </ul>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-white/10 flex justify-between items-center text-[8px] text-stone-500 uppercase tracking-wider">
                      <span>© 2026 AURA Skin</span>
                      <span>Built with 100x Code</span>
                    </div>
                  </m.footer>
                )}
              </section>
            </m.div>
          )}
        </AnimatePresence>

        {/* Success Overlay */}
        <AnimatePresence>
          {phase === 'complete' && (
            <m.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-3 right-3 bg-emerald-500 text-white px-3 py-1.5 rounded-full text-[9px] font-bold flex items-center gap-2 shadow-xl z-[100]"
            >
              <Globe className="w-3 h-3" />
              LIVE
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
});
