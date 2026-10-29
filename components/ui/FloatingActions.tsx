'use client';

import { useState, useEffect } from 'react';
import { Phone, MessageCircle, ArrowUp, Zap } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/data';

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappMessage = encodeURIComponent(
    'Hello Rehan Bike Rental, I would like to book a scooty/bike from your Kathgodam calltax HP Petrol Pump shop.'
  );

  return (
    <aside aria-label="Quick contact and navigation" className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-2.5">
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-gray-200 text-[#12334A] hover:text-orange-600 hover:border-orange-300 shadow-lg flex items-center justify-center transition-all duration-300 hover:-translate-y-1 active:scale-95 cursor-pointer"
        >
          <ArrowUp className="w-4 h-4 stroke-[2.5]" />
        </button>
      )}

      {/* Floating Call Button */}
      <a
        href={`tel:${SITE_CONFIG.phones[0]}`}
        className="group shimmer-btn bg-[#12334A] hover:bg-[#0c2435] text-white pl-3.5 pr-4 py-2.5 rounded-full shadow-xl border border-white/20 flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-md"
        aria-label={`Call ${SITE_CONFIG.phones[0]}`}
      >
        <div className="w-7 h-7 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center">
          <Phone className="w-3.5 h-3.5 animate-bounce-subtle" />
        </div>
        <div className="text-left hidden sm:block">
          <p className="text-[10px] text-gray-400 font-semibold uppercase leading-none">Instant Call</p>
          <p className="text-xs font-black text-white">{SITE_CONFIG.phones[0]}</p>
        </div>
        <span className="sm:hidden text-xs font-bold">Call</span>
      </a>

      {/* Primary Floating WhatsApp Booking Button */}
      <a
        href={`https://wa.me/919286535286?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group shimmer-btn animate-pulse-emerald bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white pl-3.5 pr-4 py-3 rounded-full shadow-2xl shadow-emerald-500/30 border border-emerald-300/40 flex items-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Book on WhatsApp"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
        </span>
        <MessageCircle className="w-5 h-5 fill-white/20 stroke-[2.2]" />
        <div className="text-left">
          <p className="text-[10px] text-emerald-100 font-bold uppercase leading-none">Book on WhatsApp</p>
          <p className="text-xs font-black text-white">9286535286</p>
        </div>
      </a>
    </aside>
  );
}
