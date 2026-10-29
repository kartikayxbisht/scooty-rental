'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, MapPin, Phone, ShieldCheck, Sparkles, Navigation, CheckCircle2, Zap } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/data';

const quickPrices = [
  { label: 'All Scooters', price: '₹500/day', tag: 'Activa · Access · Ntorq · Jupiter · Burgman · Avenis', href: '/booking?scooter=activa' },
  { label: 'RE Hunter 350', price: '₹1,000/day', tag: 'Punchy Roadster', href: '/booking?scooter=hunter' },
  { label: 'Classic & Meteor', price: '₹1,200/day', tag: 'Cruiser Thump', href: '/booking?scooter=classic' },
  { label: 'RE Himalayan', price: '₹1,400/day', tag: 'Adventure Tourer', href: '/booking?scooter=himalayan' },
];

const stats = [
  { icon: Star, value: '4.9 / 5', label: '2,500+ happy hill riders', color: 'text-amber-400', bg: 'bg-amber-400/10' },
  { icon: MapPin, value: 'Kathgodam', label: 'Calltax HP Petrol Pump', color: 'text-orange-400', bg: 'bg-orange-400/10' },
  { icon: Phone, value: 'Instant', label: '1-Tap Booking Dispatch', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
];

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-[#0a1e2d] via-[#12334A] to-[#0e2738] min-h-[92vh] flex flex-col justify-between pt-24 sm:pt-28 overflow-hidden text-white">
      {/* Background decoration & glowing orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-[36rem] h-[36rem] bg-orange-500/20 rounded-full blur-[140px] animate-pulse-glow" />
        <div className="absolute bottom-10 -left-20 w-[32rem] h-[32rem] bg-amber-500/15 rounded-full blur-[120px] animate-float-slow" />
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[22rem] bg-blue-500/10 rounded-full blur-[150px]" />
        {/* Subtle grid mesh overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 w-full flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center w-full">
          {/* LEFT: Content (7 cols) */}
          <div className="lg:col-span-7 animate-fade-in">
            {/* Pill badge with glowing ping indicator */}
            <div className="inline-flex items-center gap-2.5 bg-gradient-to-r from-orange-500/20 to-amber-500/10 border border-orange-500/40 text-orange-300 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 backdrop-blur-md shadow-lg shadow-orange-500/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
              </span>
              Rehan Bike Rental · Kathgodam & Haldwani
            </div>

            {/* Heading with gradient highlight */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.12] mb-5 tracking-tight">
              Rent Your Ride in{' '}
              <span className="relative inline-block">
                <span className="text-gradient-animated drop-shadow-md">
                  Kathgodam
                </span>
                <span className="absolute -bottom-1.5 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 rounded-full animate-pulse" />
              </span>
              <br />
              <span className="text-white/95">& Explore the Hills.</span>
            </h1>

            {/* Address Banner Pill */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl text-xs sm:text-sm text-gray-200 mb-6 shadow-sm hover:border-orange-400/50 transition-colors">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-radar absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                <MapPin className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
              </span>
              <span>
                <strong>Shop:</strong> {SITE_CONFIG.address}
              </span>
            </div>

            {/* Subtext */}
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6 max-w-xl">
              Self-drive scooters from <strong className="text-amber-300 font-extrabold underline decoration-orange-400 decoration-2">₹500/day</strong> and Royal Enfield bikes for Nainital, Bhimtal, and Almora hill adventures.
              Transparent flat daily rates with zero hidden charges!
            </p>

            {/* Quick Price Cards Ticker */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-8 max-w-2xl">
              {quickPrices.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="group bg-white/5 hover:bg-white/15 border border-white/10 hover:border-orange-400/60 rounded-xl p-3 transition-all duration-300 backdrop-blur-sm hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/20"
                >
                  <p className="text-[11px] text-gray-300 font-medium truncate group-hover:text-white transition-colors">{item.label}</p>
                  <p className="text-base font-extrabold text-amber-300 group-hover:text-orange-400 transition-colors">
                    {item.price}
                  </p>
                  <p className="text-[10px] text-gray-400 truncate mt-0.5">{item.tag}</p>
                </Link>
              ))}
            </div>

            {/* CTAs with glowing effect */}
            <div className="flex flex-col sm:flex-row gap-3.5 mb-6">
              <Link
                href="/booking"
                id="hero-book-btn"
                className="shimmer-btn animate-pulse-glow inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-base rounded-2xl transition-all duration-300 shadow-xl shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Book Your Ride Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={`tel:${SITE_CONFIG.phones[0]}`}
                id="hero-call-btn"
                className="shimmer-btn animate-pulse-emerald inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold text-base rounded-2xl transition-all duration-300 shadow-lg shadow-emerald-900/30 border border-emerald-400/30 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm"
              >
                <Phone className="w-5 h-5 text-emerald-200" />
                <span>Call {SITE_CONFIG.phones[0]}</span>
              </a>
            </div>

            {/* Direct Booking Call Numbers Pill */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-300 mb-10 bg-white/5 border border-white/10 rounded-xl p-3 max-w-lg backdrop-blur-sm">
              <span className="text-orange-400 font-bold flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                Direct Bookings:
              </span>
              <a href={`tel:${SITE_CONFIG.phones[0]}`} className="font-extrabold text-white hover:text-amber-400 transition-colors underline decoration-dotted">
                {SITE_CONFIG.phones[0]}
              </a>
              <span className="text-gray-500">·</span>
              <a href={`tel:${SITE_CONFIG.phones[1]}`} className="font-extrabold text-white hover:text-amber-400 transition-colors underline decoration-dotted">
                {SITE_CONFIG.phones[1]}
              </a>
              <span className="text-gray-500">·</span>
              <span className="text-emerald-400 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                WhatsApp Live
              </span>
            </div>

            {/* Stats row with glass cards */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-xl">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-4 backdrop-blur-sm hover:border-orange-400/40 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
                  <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center mb-2`}>
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                  <div className={`text-base sm:text-lg font-black ${stat.color}`}>{stat.value}</div>
                  <div className="text-[11px] text-gray-300 leading-tight mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Image (5 cols) with Floating Animation */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end animate-fade-in-delay">
            <div className="relative w-full max-w-[420px] animate-float-slow">
              {/* Outer decorative glowing aura */}
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-500/30 to-amber-500/30 rounded-[2.5rem] blur-xl opacity-75" />

              {/* Main image card */}
              <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-gradient-to-b from-[#1a3d54] to-[#0c2435]">
                <Image
                  src="/images/uttarakhand-hero.jpg"
                  alt="Riding along scenic Uttarakhand mountain highway near Nainital with Rehan Bike Rental"
                  width={420}
                  height={560}
                  className="w-full h-[400px] sm:h-[480px] object-cover transition-transform duration-700 hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e2738]/90 via-transparent to-transparent" />

                {/* Floating bottom vehicle pill card */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/80 backdrop-blur-md border border-white/25 rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <p className="text-white text-xs font-bold">Kathgodam to Nainital Hills</p>
                      </div>
                      <p className="text-amber-300 font-bold text-xs">Royal Enfield & Scooters Ready</p>
                    </div>
                    <div className="text-right pl-2">
                      <p className="text-gray-300 text-[10px] uppercase font-semibold">Starts At</p>
                      <p className="text-amber-400 font-black text-xl">₹500<span className="text-xs text-white/80 font-normal">/day</span></p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating top rating badge with complementary gentle float */}
              <div className="absolute -top-4 -left-4 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-2.5 shadow-2xl border border-orange-100 flex items-center gap-2.5 animate-float">
                <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 font-bold text-base shadow-sm">
                  ★
                </div>
                <div>
                  <p className="text-[#12334A] font-extrabold text-sm leading-tight">4.9 / 5 Rating</p>
                  <p className="text-orange-600 font-bold text-[11px]">Kathgodam&apos;s #1 Choice</p>
                </div>
              </div>

              {/* Floating bottom landmark badge */}
              <div className="absolute -bottom-4 -right-2 bg-gradient-to-r from-[#0e2a3d] to-[#12334A] border border-orange-500/50 text-white rounded-2xl px-4 py-2.5 shadow-2xl hidden sm:flex items-center gap-2.5 backdrop-blur-md">
                <div className="w-8 h-8 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400">
                  <Navigation className="w-4 h-4 animate-bounce" />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-white">Calltax HP Petrol Pump</p>
                  <p className="text-orange-300 text-[11px]">Direct Hill Gate, Haldwani</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cool Animated Marquee Ticker with Glass Glow */}
      <div className="relative z-10 w-full bg-slate-950/70 backdrop-blur-xl border-y border-white/10 py-3.5 mb-14 overflow-hidden text-xs font-semibold text-gray-200 shadow-2xl">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
          <span className="flex items-center gap-2 text-amber-300 font-bold">🛵 Flat ₹500/Day Scooters</span>
          <span className="text-orange-400 font-black">✦</span>
          <span className="flex items-center gap-2 text-white">🏔️ Direct Hill Gateway: Nainital, Bhimtal & Almora</span>
          <span className="text-orange-400 font-black">✦</span>
          <span className="flex items-center gap-2 text-emerald-300 font-bold">⛑️ Free Sanitized Helmet Included</span>
          <span className="text-orange-400 font-black">✦</span>
          <span className="flex items-center gap-2 text-amber-200">🏍️ Hunter (₹1000) · Classic (₹1200) · Meteor (₹1200) · Himalayan (₹1400)</span>
          <span className="text-orange-400 font-black">✦</span>
          <span className="flex items-center gap-2 text-sky-300 font-bold">🚉 Kathgodam Railway Station Pickup Available</span>
          <span className="text-orange-400 font-black">✦</span>
          <span className="flex items-center gap-2 text-white">⏱️ 5-Minute Paperless Handover</span>
          <span className="text-orange-400 font-black">✦</span>
          <span className="flex items-center gap-2 text-emerald-300 font-bold">📞 Instant Bookings: 9286535286 & 8057862900</span>
          <span className="text-orange-400 font-black">✦</span>
          {/* Duplicate set for seamless continuous marquee */}
          <span className="flex items-center gap-2 text-amber-300 font-bold">🛵 Flat ₹500/Day Scooters</span>
          <span className="text-orange-400 font-black">✦</span>
          <span className="flex items-center gap-2 text-white">🏔️ Direct Hill Gateway: Nainital, Bhimtal & Almora</span>
          <span className="text-orange-400 font-black">✦</span>
          <span className="flex items-center gap-2 text-emerald-300 font-bold">⛑️ Free Sanitized Helmet Included</span>
          <span className="text-orange-400 font-black">✦</span>
          <span className="flex items-center gap-2 text-amber-200">🏍️ Hunter (₹1000) · Classic (₹1200) · Meteor (₹1200) · Himalayan (₹1400)</span>
          <span className="text-orange-400 font-black">✦</span>
          <span className="flex items-center gap-2 text-sky-300 font-bold">🚉 Kathgodam Railway Station Pickup Available</span>
          <span className="text-orange-400 font-black">✦</span>
          <span className="flex items-center gap-2 text-white">⏱️ 5-Minute Paperless Handover</span>
          <span className="text-orange-400 font-black">✦</span>
          <span className="flex items-center gap-2 text-emerald-300 font-bold">📞 Instant Bookings: 9286535286 & 8057862900</span>
          <span className="text-orange-400 font-black">✦</span>
        </div>
      </div>

      {/* Bottom wave separator */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 60" className="w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60L1440 60L1440 30C1200 60 960 0 720 0C480 0 240 60 0 30L0 60Z" fill="#080D14" />
        </svg>
      </div>
    </section>
  );
}
