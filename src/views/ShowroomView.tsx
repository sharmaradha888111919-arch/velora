import React, { useState } from 'react';
import { motion } from 'motion/react';
import { InteractiveShowroom3D } from '../components/InteractiveShowroom3D';
import { Product, PageType } from '../types';
import { MapPin, Clock, Compass, Sparkles, Feather, Scissors, Eye, Calendar } from 'lucide-react';

interface ShowroomViewProps {
  products: Product[];
  onNavigate: (page: PageType) => void;
  onQuickView: (product: Product) => void;
  onOpenAppointment: () => void;
}

export const ShowroomView: React.FC<ShowroomViewProps> = ({
  products,
  onNavigate,
  onQuickView,
  onOpenAppointment,
}) => {
  const [selectedAtelierZone, setSelectedAtelierZone] = useState<string>('c-scheme');

  const handleShowroomHotspotProduct = (productName: string) => {
    const matched = products.find((p) => p.name.includes(productName) || productName.includes(p.name));
    if (matched) {
      onQuickView(matched);
    } else {
      onNavigate('collection');
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-[#e8e6e3] pt-24 pb-24 overflow-x-hidden selection:bg-[#cbb38d] selection:text-[#0c0c0e]">
      {/* ========================================================
          SHOWROOM HERO — Immersive 3D Spatial Environment
          ======================================================== */}
      <section className="px-5 sm:px-8 max-w-7xl mx-auto mb-24">
        <div className="text-center max-w-3xl mx-auto mb-8 pt-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#15151e] border border-[#dfccad]/25 text-[10px] font-mono tracking-[0.3em] text-[#dfccad] uppercase mb-4"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>INTERACTIVE SPATIAL SALON</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#f5f2eb] tracking-wide uppercase mb-3 leading-none"
          >
            THE VELORA SHOWROOM
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-serif italic text-[#cbb38d] text-lg sm:text-xl tracking-wide mb-3"
          >
            "Experience fashion beyond the screen."
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-xs sm:text-sm text-[#959189] font-sans font-light max-w-lg mx-auto leading-relaxed"
          >
            A continuous digital rotunda showcasing our three core pillars. Rotate to navigate the architectural space and interact with luminous beacon hotspots.
          </motion.p>
        </div>

        {/* Large 3D Showroom Viewport */}
        <div className="relative">
          <InteractiveShowroom3D
            onSelectProduct={handleShowroomHotspotProduct}
            onExploreCollection={() => onNavigate('collection')}
            heightClass="h-[600px] sm:h-[720px]"
            isFullExperience={true}
          />
        </div>
      </section>

      {/* ========================================================
          BRAND STORY — "BUILT FOR THE MODERN YOU."
          ======================================================== */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 bg-[#09090c] border-y border-[#1c1c24] relative overflow-hidden">
        {/* Subtle background monogram outline */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[400px] font-serif text-[#16161e] select-none pointer-events-none opacity-20 leading-none">
          V
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4">
              <span className="text-xs font-mono tracking-[0.3em] text-[#cbb38d] uppercase block mb-3">
                ORIGIN & MANIFESTO
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#f5f2eb] uppercase leading-tight tracking-wide">
                BUILT FOR THE
                <br />
                <span className="italic text-[#dfccad] font-light">MODERN YOU.</span>
              </h2>
            </div>

            <div className="lg:col-span-8 space-y-5 text-xs sm:text-sm text-[#9c978f] font-light leading-relaxed">
              <p>
                VELORA was born in the pink city of Jaipur, not to reproduce historical nostalgia, but to challenge what Indian luxury can become on the world stage. We strip away the unnecessary, keeping only the sculptural integrity of pure form and the unmistakable breath of bespoke tailoring.
              </p>
              <p>
                We believe clothing is architectural equipment for living. Our silhouettes honor the kinetics of human posture: shoulders that allow uninhibited reach, trousers that fall in sharp monolithic lines during motion, and silk poplins that reflect ambient evening light without ostentation.
              </p>
              <p className="font-serif italic text-base sm:text-lg text-[#dfccad] pt-2 border-t border-[#22222d]">
                "Every seam is an intention. Every drape is an unspoken dialogue between artisan and wearer."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          CRAFT SECTION — 3 Values (01 MATERIAL, 02 FORM, 03 DETAIL)
          ======================================================== */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-[0.3em] text-[#cbb38d] uppercase block mb-2">
            ATELIER ETHOS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#f5f2eb] tracking-wide">
            THE THREE VALUES
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 01 MATERIAL */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 bg-[#121217] border border-[#242430] rounded-2xl relative overflow-hidden group hover:border-[#dfccad]/40 transition-all duration-500"
          >
            <div className="text-5xl sm:text-6xl font-serif text-[#292835] group-hover:text-[#dfccad]/20 transition-colors font-light mb-4">
              01
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#dfccad] tracking-widest uppercase mb-2">
              <Feather className="w-3.5 h-3.5" />
              <span>THE FOUNDATION</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#f5f2eb] mb-3">
              MATERIAL
            </h3>
            <p className="text-xs sm:text-sm text-[#8c8880] leading-relaxed">
              We exclusively source unadulterated fibers: handspun organic khadi cottons from Rajasthan, 110 GSM mulberry silks from Varanasi, and certified mulesing-free super-130s merino wools. Textiles that breathe with your body.
            </p>
          </motion.div>

          {/* 02 FORM */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="p-8 bg-[#121217] border border-[#242430] rounded-2xl relative overflow-hidden group hover:border-[#dfccad]/40 transition-all duration-500"
          >
            <div className="text-5xl sm:text-6xl font-serif text-[#292835] group-hover:text-[#dfccad]/20 transition-colors font-light mb-4">
              02
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#dfccad] tracking-widest uppercase mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>THE ARCHITECTURE</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#f5f2eb] mb-3">
              FORM
            </h3>
            <p className="text-xs sm:text-sm text-[#8c8880] leading-relaxed">
              Kinetic ergonomics guide every pattern. Dropped shoulders allow fluid gestures, reverse pleats preserve structural line during locomotion, and collarless necklines frame the natural geometry of the throat.
            </p>
          </motion.div>

          {/* 03 DETAIL */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-8 bg-[#121217] border border-[#242430] rounded-2xl relative overflow-hidden group hover:border-[#dfccad]/40 transition-all duration-500"
          >
            <div className="text-5xl sm:text-6xl font-serif text-[#292835] group-hover:text-[#dfccad]/20 transition-colors font-light mb-4">
              03
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#dfccad] tracking-widest uppercase mb-2">
              <Scissors className="w-3.5 h-3.5" />
              <span>THE SIGNATURE</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#f5f2eb] mb-3">
              DETAIL
            </h3>
            <p className="text-xs sm:text-sm text-[#8c8880] leading-relaxed">
              Discreet masterwork: genuine water-buffalo horn buttons, hand-rolled French seams, invisible magnet closures, and internal silk bindings. Luxury that whispers intimacy only to the wearer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========================================================
          FINAL EXPERIENCE — Dramatic Flagship Visit
          ======================================================== */}
      <section className="py-24 sm:py-36 px-5 sm:px-8 bg-[#09090c] border-t border-[#1c1c24] relative">
        <div className="max-w-6xl mx-auto">
          {/* Large Dramatic Headline */}
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#f5f2eb] uppercase tracking-wide leading-tight mb-4">
              YOUR STYLE.
              <br />
              YOUR SPACE.
              <br />
              <span className="italic font-light text-[#dfccad]">YOUR MOMENT.</span>
            </h2>
            <p className="font-mono text-xs tracking-[0.3em] text-[#cbb38d] uppercase">
              VISIT VELORA FLAGSHIP
            </p>
          </div>

          {/* Interactive Flagship Map & Salon Schematic Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[#111116] border border-[#dfccad]/25 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-10">
            {/* Salon Details */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181822] border border-[#2b2a38] text-[10px] font-mono tracking-widest text-[#dfccad] uppercase mb-4">
                  <MapPin className="w-3 h-3 text-[#dfccad]" />
                  <span>RAJASTHAN, INDIA</span>
                </div>

                <h3 className="font-serif text-3xl text-[#f5f2eb] mb-2">
                  VELORA FLAGSHIP
                </h3>
                <p className="text-xs text-[#a09c94] mb-6">
                  C-Scheme, Ashok Nagar, Jaipur, Rajasthan 302001
                </p>

                <div className="space-y-3 text-xs font-mono text-[#8c8880]">
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#dfccad]" />
                    <span>HOURS: 10:00 AM — 9:00 PM (DAILY)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#dfccad]" />
                    <span>PRIVATE VIP FITTING ROOMS AVAILABLE</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#22222d]">
                <button
                  id="showroom-book-salon-btn"
                  onClick={onOpenAppointment}
                  className="w-full py-4 rounded-xl bg-[#dfccad] text-[#0c0c0e] font-medium text-xs tracking-widest uppercase hover:bg-[#ede0ca] transition-all flex items-center justify-center gap-2 shadow-xl cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>BOOK PRIVATE SALON APPOINTMENT</span>
                </button>
              </div>
            </div>

            {/* Interactive Stylized Architectural Map / Salon Floorplan */}
            <div className="lg:col-span-7 bg-[#0b0b0f] border border-[#262633] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[340px]">
              {/* Grid Background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#161622_1px,transparent_1px),linear-gradient(to_bottom,#161622_1px,transparent_1px)] bg-[size:28px_28px] opacity-70" />

              {/* Architectural Schematic Graphic */}
              <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-[#777]">
                <span>ARCHITECTURAL FLOORPLAN • JAIPUR FLAGSHIP</span>
                <span className="text-[#dfccad]">ZONE: SALON ROTUNDA</span>
              </div>

              {/* Stylized Floorplan Plan Visual */}
              <div className="relative z-10 my-auto py-8 flex flex-col items-center justify-center">
                <div className="relative w-64 h-48 border border-[#dfccad]/30 rounded-xl flex items-center justify-center">
                  {/* Central Rotunda */}
                  <div className="w-24 h-24 rounded-full border border-dashed border-[#dfccad]/50 flex items-center justify-center animate-[spin_40s_linear_infinite]">
                    <div className="w-12 h-12 rounded-full bg-[#dfccad]/10 border border-[#dfccad] flex items-center justify-center text-[10px] font-serif text-[#dfccad]">
                      ATELIER
                    </div>
                  </div>

                  {/* Private Chambers */}
                  <div className="absolute top-2 left-2 text-[9px] font-mono text-[#888] border border-[#333] px-2 py-0.5 rounded">
                    SALON A
                  </div>
                  <div className="absolute bottom-2 right-2 text-[9px] font-mono text-[#888] border border-[#333] px-2 py-0.5 rounded">
                    SALON B
                  </div>

                  {/* Beacon pin */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#dfccad] opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#dfccad]" />
                    </span>
                  </div>
                </div>

                <p className="text-[11px] font-mono text-[#8a8880] mt-4 text-center">
                  Located near Statues Circle, C-Scheme. Valet parking & bespoke beverage hospitality provided.
                </p>
              </div>

              <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-[#666] pt-3 border-t border-[#1a1a24]">
                <span>GPS: 26.9124° N, 75.8016° E</span>
                <span className="text-[#cbb38d]">WALK-INS WELCOME</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
