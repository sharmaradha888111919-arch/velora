import React, { useState } from 'react';
import { PageType } from '../types';
import { Instagram, ArrowRight, Check, MapPin, Clock, Mail, Phone } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageType) => void;
  onOpenAppointment: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAppointment }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 2500);
  };

  return (
    <footer className="bg-[#09090c] border-t border-[#22222d] text-[#e5e2db] pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Upper Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-[#1c1c24]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full border border-[#dfccad]/40 flex items-center justify-center font-serif text-[#dfccad]">
                V
              </span>
              <span className="font-serif text-2xl tracking-[0.25em] text-[#f5f2eb]">
                VELORA
              </span>
            </div>
            <p className="text-xs font-mono tracking-[0.3em] text-[#cbb38d] uppercase">
              WEAR THE MOMENT.
            </p>
            <p className="text-xs text-[#8e8a82] leading-relaxed max-w-sm">
              Contemporary Indian luxury fashion atelier. Sculptural silhouettes, handspun heritage textiles, and architectural tailoring designed for the way you move.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#15151e] border border-[#282834] flex items-center justify-center text-[#cbb38d] hover:text-[#fff] hover:border-[#dfccad] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <span className="text-xs font-mono text-[#777]">@VELORA.ATELIER</span>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono tracking-[0.2em] text-[#cbb38d] uppercase">
              SHOWROOM
            </h4>
            <ul className="space-y-2 text-xs text-[#a09c94]">
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('home');
                  }}
                  className="hover:text-[#dfccad] transition-colors"
                >
                  Home / Overview
                </a>
              </li>
              <li>
                <a
                  href="/collection"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('collection');
                  }}
                  className="hover:text-[#dfccad] transition-colors"
                >
                  The Collection 2026
                </a>
              </li>
              <li>
                <a
                  href="/showroom"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('showroom');
                  }}
                  className="hover:text-[#dfccad] transition-colors"
                >
                  3D Digital Experience
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenAppointment}
                  className="hover:text-[#dfccad] transition-colors text-[#dfccad]"
                >
                  Private Salon Booking &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Flagship Hours & Contact Column */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono tracking-[0.2em] text-[#cbb38d] uppercase">
              FLAGSHIP ATELIER
            </h4>
            <div className="space-y-2 text-xs text-[#8e8a82]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#dfccad] flex-shrink-0 mt-0.5" />
                <span>VELORA Flagship, C-Scheme, Jaipur, Rajasthan 302001</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#dfccad] flex-shrink-0" />
                <span>Daily: 10:00 AM — 9:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#dfccad] flex-shrink-0" />
                <span>concierge@velora-atelier.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#dfccad] flex-shrink-0" />
                <span>+91 141 492 8800</span>
              </div>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono tracking-[0.2em] text-[#cbb38d] uppercase">
              PRIVATE DISPATCH
            </h4>
            <p className="text-xs text-[#8e8a82]">
              Receive private invitations to seasonal salon previews and limited edition releases.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative flex items-center">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-[#13131a] border border-[#282834] rounded-lg px-3 py-2.5 text-xs text-[#f5f2eb] placeholder-[#555] focus:outline-none focus:border-[#dfccad]"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1.5 p-1.5 rounded-md bg-[#dfccad] text-[#0c0c0e] hover:bg-[#ebdcc4] transition-colors"
                >
                  {isSubscribed ? <Check className="w-3.5 h-3.5 text-emerald-900" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
              {isSubscribed && (
                <p className="text-[10px] font-mono text-[#dfccad] animate-fadeIn">
                  Thank you. You have been added to the private registry.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Lower Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#666]">
          <p>© 2026 VELORA ATELIER INDIA. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#999] cursor-pointer">PRIVACY POLICY</span>
            <span className="hover:text-[#999] cursor-pointer">TERMS OF ATELIER</span>
            <span className="hover:text-[#999] cursor-pointer">SUSTAINABILITY & CRAFT</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
