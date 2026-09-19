import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Hero3DScene } from '../components/Hero3DScene';
import { InteractiveShowroom3D } from '../components/InteractiveShowroom3D';
import { ProductCard } from '../components/ProductCard';
import { Product, PageType } from '../types';
import { ArrowRight, Sparkles, Compass, Eye } from 'lucide-react';

interface HomeViewProps {
  products: Product[];
  onNavigate: (page: PageType) => void;
  onQuickView: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onOpenAppointment: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  products,
  onNavigate,
  onQuickView,
  wishlistIds,
  onToggleWishlist,
  onOpenAppointment,
}) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter 4 featured products for "THE NEW EDIT"
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);

  const handleShowroomHotspotProduct = (productName: string) => {
    const matched = products.find((p) => p.name.includes(productName) || productName.includes(p.name));
    if (matched) {
      onQuickView(matched);
    } else {
      onNavigate('collection');
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0c0c0e] text-[#e8e6e3] overflow-x-hidden selection:bg-[#cbb38d] selection:text-[#0c0c0e]">
      {/* ========================================================
          HERO SECTION — Full-Screen Cinematic 3D Experience
          ======================================================== */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Three.js 3D Fashion Torso & Kinetic Draped Scene */}
        <Hero3DScene scrollY={scrollY} />

        {/* Ambient atmospheric backdrop gradients */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0c0c0e]/40 to-[#0c0c0e] pointer-events-none" />
        <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none" />

        {/* Centered Editorial Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center pointer-events-none">
          {/* Subtle Atelier Tag */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-2 px-3 py-1 rounded-full border border-[#dfccad]/25 bg-[#121218]/60 backdrop-blur-md mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#dfccad] animate-ping" />
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#dfccad] uppercase">
              SPRING / SUMMER 2026 ATELIER
            </span>
          </motion.div>

          {/* Large Hero Wordmark & Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.12em] text-[#f7f4ee] uppercase leading-none mb-3 drop-shadow-2xl"
          >
            VELORA
          </motion.h1>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="text-sm sm:text-lg md:text-xl font-serif italic text-[#cbb38d] tracking-[0.25em] uppercase mb-4"
          >
            WEAR THE MOMENT.
          </motion.div>

          {/* Editorial Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 0.85, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65 }}
            className="text-xs sm:text-sm md:text-base font-sans text-[#a5a198] max-w-xl font-light tracking-wide leading-relaxed mb-8"
          >
            Contemporary fashion, designed for the way you move. Architectural silhouettes crafted with precision textiles and effortless Indian drape.
          </motion.p>

          {/* Hero Buttons (Pointer events active) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-4 pointer-events-auto"
          >
            {/* Primary Button */}
            <button
              id="hero-explore-btn"
              onClick={() => onNavigate('collection')}
              className="group relative px-8 py-3.5 rounded-full bg-[#dfccad] text-[#0c0c0e] font-sans text-xs font-semibold tracking-[0.2em] uppercase overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-[#ebdcc4] shadow-[0_0_25px_rgba(223,204,173,0.35)] cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            {/* Secondary Button */}
            <button
              id="hero-showroom-btn"
              onClick={() => onNavigate('showroom')}
              className="group relative px-8 py-3.5 rounded-full border border-[#dfccad]/50 text-[#f5f2eb] font-sans text-xs font-semibold tracking-[0.2em] uppercase overflow-hidden backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-[#dfccad] hover:bg-[#dfccad]/10 cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-[#dfccad]" />
                <span>ENTER SHOWROOM</span>
              </span>
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator at bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[9px] font-mono tracking-[0.3em] text-[#8a8780] uppercase">
            SCROLL TO DISCOVER
          </span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-[#dfccad] to-transparent animate-pulse" />
        </motion.div>
      </section>

      {/* ========================================================
          FEATURED COLLECTION — "THE NEW EDIT"
          ======================================================== */}
      <section className="relative py-24 sm:py-32 px-5 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 border-b border-[#22222b] pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#cbb38d] tracking-[0.3em] uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SEASONAL EDIT 01</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#f5f2eb] tracking-wide">
              THE NEW EDIT
            </h2>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <p className="text-xs text-[#8c8880] max-w-xs font-sans">
              Curated architectural silhouettes cut in limited numbers from Japanese double-weave cotton and mulberry silk.
            </p>
            <button
              id="view-collection-button"
              onClick={() => onNavigate('collection')}
              className="px-5 py-2.5 rounded-full border border-[#dfccad]/30 text-xs font-mono tracking-widest text-[#dfccad] hover:bg-[#dfccad]/10 transition-colors uppercase whitespace-nowrap"
            >
              VIEW COLLECTION &rarr;
            </button>
          </div>
        </div>

        {/* 4 Featured Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onQuickView={onQuickView}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      </section>

      {/* ========================================================
          3D SHOWROOM SECTION — "STEP INSIDE VELORA"
          ======================================================== */}
      <section className="relative py-16 px-5 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono tracking-[0.35em] text-[#cbb38d] uppercase block mb-2">
            IMMERSIVE SPATIAL COMMERCE
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#f5f2eb] tracking-wide mb-3">
            STEP INSIDE VELORA
          </h2>
          <p className="text-xs sm:text-sm text-[#95918a] font-light leading-relaxed">
            Interact directly with our virtual digital showroom. Click any glowing beacon to explore signature tailoring, everyday essentials, and limited atelier editions.
          </p>
        </div>

        {/* Interactive 3D Showroom Component */}
        <InteractiveShowroom3D
          onSelectProduct={handleShowroomHotspotProduct}
          onExploreCollection={() => onNavigate('collection')}
          heightClass="h-[550px] sm:h-[650px]"
        />
      </section>

      {/* ========================================================
          EDITORIAL SECTION — High-End Magazine Spread
          ======================================================== */}
      <section className="relative py-24 sm:py-36 px-5 sm:px-8 overflow-hidden bg-[#0a0a0d] border-y border-[#1c1c24]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Editorial Visual with Ambient Frame */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#dfccad]/20 shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop"
                alt="VELORA Editorial Fashion"
                className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0d] via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#121217]/80 backdrop-blur-md rounded-xl border border-[#dfccad]/20">
                <span className="text-[10px] font-mono tracking-widest text-[#dfccad] uppercase block mb-1">
                  EDITORIAL NO. 04 • JAIPUR ATELIER
                </span>
                <p className="font-serif text-lg text-[#f5f2eb]">
                  "Kinetic silhouettes structured for metropolitan life."
                </p>
              </div>
            </motion.div>
          </div>

          {/* Dramatic Typography & Manifesto */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs font-mono tracking-[0.3em] text-[#cbb38d] uppercase mb-4">
              THE VELORA MANIFESTO
            </span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#f5f2eb] uppercase tracking-wide leading-tight mb-8"
            >
              STYLE IS NOT WHAT YOU WEAR.
              <br />
              <span className="italic font-light text-[#cbb38d]">IT IS HOW YOU MOVE.</span>
            </motion.h2>

            <div className="space-y-4 text-xs sm:text-sm text-[#99958d] font-light leading-relaxed mb-8">
              <p>
                Founded on the belief that garments should possess both monumentality and ease, VELORA merges the rich artisanal heritage of Rajasthani handcraft with razor-sharp architectural tailoring.
              </p>
              <p>
                Each stitch is engineered around kinetic ergonomics: deep reverse pleats that breathe with stride, collar lines cut to honor the clavicle, and fabrics woven from sustainable organic fibers.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate('showroom')}
                className="px-6 py-3 rounded-full bg-[#dfccad] text-[#0c0c0e] text-xs font-semibold tracking-widest uppercase hover:bg-[#ebdcc4] transition-colors"
              >
                OUR CRAFT & HERITAGE
              </button>
              <button
                onClick={onOpenAppointment}
                className="px-6 py-3 rounded-full border border-[#dfccad]/30 text-[#dfccad] text-xs font-semibold tracking-widest uppercase hover:bg-[#dfccad]/10 transition-colors"
              >
                PRIVATE SALON VISIT
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          FINAL CTA — Dramatic Large Call To Action
          ======================================================== */}
      <section className="relative py-28 sm:py-40 px-6 text-center overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(203,179,141,0.08)_0%,transparent_70%)]">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-16 h-16 mx-auto mb-8 rounded-full border border-[#dfccad]/30 flex items-center justify-center font-serif text-2xl text-[#dfccad]"
          >
            V
          </motion.div>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#f7f4ee] uppercase tracking-wide mb-4 leading-tight">
            READY FOR YOUR
            <br />
            <span className="italic font-light text-[#dfccad]">NEXT LOOK?</span>
          </h2>

          <p className="text-xs sm:text-sm font-sans text-[#8f8b83] max-w-md mx-auto mb-10 leading-relaxed font-light">
            Step into the contemporary atelier. Complimentary white-glove courier shipping across India and private showroom consultations in Jaipur.
          </p>

          <button
            id="final-explore-velora-btn"
            onClick={() => onNavigate('collection')}
            className="px-10 py-4 rounded-full bg-[#dfccad] text-[#0c0c0e] font-sans text-xs font-semibold tracking-[0.25em] uppercase hover:scale-105 hover:bg-[#ebdcc4] shadow-[0_0_30px_rgba(223,204,173,0.3)] transition-all cursor-pointer"
          >
            EXPLORE VELORA
          </button>
        </div>
      </section>
    </div>
  );
};
