import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone, MapPin } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/data';

export default function CTASection() {
  return (
    <section className="bg-[#12334A] py-20 overflow-hidden relative">
      {/* Decoration */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
              Instant Booking Available
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
              Ready for your ride?
              <br />
              <span className="text-amber-400">{SITE_CONFIG.name}</span> is here.
            </h2>
            <p className="text-gray-300 text-base sm:text-lg mb-4 max-w-md leading-relaxed">
              Quick, easy, and affordable bike & scooter rentals for Nainital, Bhimtal, and Haldwani trips.
            </p>
            <div className="flex items-center gap-2 text-sm text-orange-300 mb-8 bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl max-w-md">
              <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0" />
              <span>{SITE_CONFIG.address}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Link
                href="/booking"
                className="shimmer-btn animate-pulse-glow inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-base rounded-2xl transition-all duration-300 shadow-xl shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98]"
                id="cta-book-btn"
              >
                <span>Book Online</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={`tel:${SITE_CONFIG.phones[0]}`}
                className="shimmer-btn animate-pulse-emerald inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-base rounded-2xl transition-all duration-300 shadow-xl shadow-emerald-900/30 hover:scale-[1.02] active:scale-[0.98] border border-emerald-400/30"
                id="cta-call-btn"
              >
                <Phone className="w-5 h-5" />
                <span>Call {SITE_CONFIG.phones[0]}</span>
              </a>
            </div>

            <p className="text-xs text-gray-400">
              Also reach us at <a href={`tel:${SITE_CONFIG.phones[1]}`} className="text-white hover:text-orange-400 font-semibold underline">{SITE_CONFIG.phones[1]}</a> or email <a href={`mailto:${SITE_CONFIG.email}`} className="text-white hover:text-orange-400 font-semibold underline">{SITE_CONFIG.email}</a> · 7 Days a week (7 AM - 10 PM)
            </p>
          </div>

          {/* Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md animate-float-slow">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-gradient-to-b from-[#1a3d54] to-[#0c2435]">
                <Image
                  src="/images/uttarakhand-hills.jpg"
                  alt={`Scenic Uttarakhand hills near Nainital with bikes from ${SITE_CONFIG.name}`}
                  width={460}
                  height={345}
                  className="w-full h-80 object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12334A]/80 via-transparent to-transparent rounded-3xl" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md rounded-2xl px-5 py-3 shadow-2xl border border-orange-100 animate-float">
                <p className="text-[#12334A] font-extrabold text-sm">🏔️ Scenic Uttarakhand Hills</p>
                <p className="text-orange-600 font-bold text-xs">Pickup at Kathgodam HP Pump</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
