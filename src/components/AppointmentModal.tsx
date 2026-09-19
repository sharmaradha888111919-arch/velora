import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Calendar, Clock, MapPin, User, Mail, Phone, CheckCircle2 } from 'lucide-react';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '11:00 AM',
    service: 'Private Showroom Styling & Fit Concierge',
    guests: '1 Guest',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div
      id="appointment-modal-overlay"
      className="fixed inset-0 z-[115] flex items-center justify-center p-4 bg-[#070709]/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-[#111116] border border-[#dfccad]/30 rounded-2xl p-6 sm:p-8 shadow-2xl my-auto text-[#f5f2eb]"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#888] hover:text-[#fff] hover:bg-[#1f1f2a]"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-12 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-[#dfccad]/10 border border-[#dfccad] flex items-center justify-center text-[#dfccad] mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl text-[#f5f2eb] mb-2">Private Appointment Confirmed</h3>
            <p className="text-xs text-[#a39f97] max-w-sm mb-6 leading-relaxed">
              We look forward to welcoming you to the VELORA Flagship in C-Scheme, Jaipur. A styling director has been reserved for your session.
            </p>
            <div className="px-4 py-2 rounded-lg bg-[#181822] border border-[#2a2935] text-[11px] font-mono text-[#dfccad]">
              CONFIRMATION SENT TO {formData.email || 'YOUR EMAIL'}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#cbb38d] mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>C-SCHEME, JAIPUR FLAGSHIP SHOWROOM</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#f5f2eb] mb-1">
              Reserve Private Salon
            </h3>
            <p className="text-xs text-[#8c8880] mb-6">
              Experience one-on-one tailored silhouette consultations, made-to-measure fittings, and private atelier viewings.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[10px] text-[#777] mb-1 uppercase">Full Name</label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 absolute left-3 top-3 text-[#666]" />
                    <input
                      required
                      type="text"
                      placeholder="e.g. Radhika Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#181822] border border-[#2b2a37] rounded-lg pl-9 pr-3 py-2 text-[#f5f2eb] placeholder-[#555] focus:outline-none focus:border-[#dfccad]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] text-[#777] mb-1 uppercase">Phone Number</label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 absolute left-3 top-3 text-[#666]" />
                    <input
                      required
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#181822] border border-[#2b2a37] rounded-lg pl-9 pr-3 py-2 text-[#f5f2eb] placeholder-[#555] focus:outline-none focus:border-[#dfccad]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] text-[#777] mb-1 uppercase">Email Address</label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 absolute left-3 top-3 text-[#666]" />
                  <input
                    required
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#181822] border border-[#2b2a37] rounded-lg pl-9 pr-3 py-2 text-[#f5f2eb] placeholder-[#555] focus:outline-none focus:border-[#dfccad]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[10px] text-[#777] mb-1 uppercase">Preferred Date</label>
                  <div className="relative">
                    <Calendar className="w-3.5 h-3.5 absolute left-3 top-3 text-[#666]" />
                    <input
                      required
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-[#181822] border border-[#2b2a37] rounded-lg pl-9 pr-3 py-2 text-[#f5f2eb] focus:outline-none focus:border-[#dfccad]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] text-[#777] mb-1 uppercase">Time Slot</label>
                  <div className="relative">
                    <Clock className="w-3.5 h-3.5 absolute left-3 top-3 text-[#666]" />
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full bg-[#181822] border border-[#2b2a37] rounded-lg pl-9 pr-3 py-2 text-[#f5f2eb] focus:outline-none focus:border-[#dfccad]"
                    >
                      <option>10:30 AM</option>
                      <option>12:00 PM</option>
                      <option>02:30 PM</option>
                      <option>04:30 PM</option>
                      <option>06:30 PM</option>
                      <option>08:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] text-[#777] mb-1 uppercase">Consultation Type</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-[#181822] border border-[#2b2a37] rounded-lg px-3 py-2 text-[#f5f2eb] focus:outline-none focus:border-[#dfccad]"
                >
                  <option>Private Showroom Styling & Fit Concierge</option>
                  <option>Made-to-Measure Architectural Eveningwear</option>
                  <option>Bridal & Celebration Atelier Consultation</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#dfccad] text-[#0c0c0e] font-sans font-semibold text-xs tracking-widest uppercase hover:bg-[#ebdec8] transition-all cursor-pointer shadow-lg"
                >
                  CONFIRM SALON RESERVATION
                </button>
              </div>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
};
