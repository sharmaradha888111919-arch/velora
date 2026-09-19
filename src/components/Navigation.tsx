import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageType } from '../types';
import { Search, ShoppingBag, Menu, X, Heart, Sparkles, MapPin } from 'lucide-react';

interface NavigationProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenSearch: () => void;
  onOpenCart: () => void;
  onOpenAppointment: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  onNavigate,
  cartCount,
  wishlistCount,
  onOpenSearch,
  onOpenCart,
  onOpenAppointment,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; page: PageType }[] = [
    { label: 'HOME', page: 'home' },
    { label: 'COLLECTION', page: 'collection' },
    { label: 'SHOWROOM', page: 'showroom' },
  ];

  const handleMobileNav = (page: PageType) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        id="main-navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#09090c]/85 backdrop-blur-xl border-b border-[#dfccad]/15 py-3.5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Brand Wordmark */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full border border-[#cbb38d]/40 flex items-center justify-center text-[#dfccad] font-serif text-sm transition-transform duration-500 group-hover:scale-105 group-hover:border-[#dfccad]">
              V
            </div>
            <div className="flex flex-col">
              <span className="font-serif tracking-[0.22em] text-xl sm:text-2xl text-[#f5f2eb] font-normal leading-none">
                VELORA
              </span>
              <span className="text-[8px] font-mono tracking-[0.35em] text-[#cbb38d] uppercase mt-0.5">
                WEAR THE MOMENT
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              const href = item.page === 'home' ? '/' : `/${item.page}`;
              return (
                <a
                  key={item.page}
                  id={`nav-link-${item.page}`}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.page);
                  }}
                  className={`relative py-1 text-xs font-sans tracking-[0.2em] uppercase transition-colors duration-300 ${
                    isActive ? 'text-[#dfccad]' : 'text-[#a39f97] hover:text-[#f5f2eb]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#dfccad] to-transparent"
                      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Appointment Booking Trigger (Luxury concierge) */}
            <button
              id="nav-appointment-btn"
              onClick={onOpenAppointment}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#cbb38d]/30 text-[10px] font-mono tracking-widest text-[#dfccad] hover:bg-[#cbb38d]/10 transition-colors"
            >
              <MapPin className="w-3 h-3" />
              <span>JAIPUR SALON</span>
            </button>

            {/* Search Icon */}
            <button
              id="nav-search-btn"
              onClick={onOpenSearch}
              className="p-2 rounded-full text-[#b3af9f] hover:text-[#f5f2eb] hover:bg-[#1a1a24] transition-colors"
              aria-label="Search Collection"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Bag Icon */}
            <button
              id="nav-cart-btn"
              onClick={onOpenCart}
              className="relative p-2 rounded-full text-[#b3af9f] hover:text-[#f5f2eb] hover:bg-[#1a1a24] transition-colors"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#dfccad] text-[#0c0c0e] font-mono text-[9px] font-bold flex items-center justify-center shadow-md animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              id="nav-mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-full text-[#dfccad] hover:bg-[#1a1a24] transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Animated Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[150] bg-[#07070a]/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10"
          >
            {/* Top Bar inside mobile menu */}
            <div className="flex items-center justify-between border-b border-[#22222d] pb-6">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full border border-[#dfccad]/40 flex items-center justify-center font-serif text-[#dfccad]">
                  V
                </span>
                <span className="font-serif text-xl tracking-[0.2em] text-[#f5f2eb]">
                  VELORA
                </span>
              </div>
              <button
                id="close-mobile-menu-btn"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-full bg-[#181822] text-[#888] hover:text-[#fff]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Nav Links with Staggered Entrance */}
            <div className="flex flex-col gap-6 py-10">
              {navItems.map((item, idx) => {
                const isActive = currentPage === item.page;
                const href = item.page === 'home' ? '/' : `/${item.page}`;
                return (
                  <motion.a
                    key={item.page}
                    href={href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleMobileNav(item.page);
                    }}
                    className="text-left group flex items-center justify-between"
                  >
                    <span
                      className={`font-serif text-4xl sm:text-5xl tracking-wider transition-colors ${
                        isActive ? 'text-[#dfccad]' : 'text-[#9c978f] group-hover:text-[#f5f2eb]'
                      }`}
                    >
                      {item.label}
                    </span>
                    <span className="text-xs font-mono text-[#cbb38d] opacity-0 group-hover:opacity-100 transition-opacity">
                      EXPLORE &rarr;
                    </span>
                  </motion.a>
                );
              })}
            </div>

            {/* Mobile Footer Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="border-t border-[#22222d] pt-6 space-y-4"
            >
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAppointment();
                }}
                className="w-full py-3.5 rounded-xl bg-[#dfccad] text-[#0c0c0e] font-sans font-semibold text-xs tracking-widest uppercase hover:bg-[#ede0ca] transition-colors flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                <span>BOOK JAIPUR SALON APPOINTMENT</span>
              </button>

              <div className="flex items-center justify-between text-xs font-mono text-[#777]">
                <span>C-SCHEME, JAIPUR</span>
                <span>10:00 AM — 9:00 PM</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
