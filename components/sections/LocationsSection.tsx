import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, Navigation, Clock, ShieldCheck, Mail, MessageSquare, ExternalLink, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/data';

export default function LocationsSection() {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Kathgodam call tax HP Petrol Pump Haldwani'
  )}`;

  return (
    <section id="locations" className="bg-[#F1F4F6] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block text-xs font-bold uppercase tracking-widest text-orange-500 bg-orange-50 border border-orange-100 px-4 py-2 rounded-full mb-4">
            Shop Location
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12334A] mb-4">
            Our Shop in Kathgodam
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            We operate exclusively from our single, well-known shop at{' '}
            <strong>Kathgodam calltax, HP Petrol Pump, Haldwani</strong>.
          </p>
        </div>

        {/* Exclusive Single Shop Highlight Card */}
        <div className="relative bg-gradient-to-br from-[#0c2333] via-[#12334A] to-[#0a1e2d] rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-2xl border border-white/15 mb-10 overflow-hidden">
          {/* Ambient lighting orb */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2.5 mb-5">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-amber-500/15 text-orange-300 border border-orange-500/40 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-xs">
                  <MapPin className="w-3.5 h-3.5 text-orange-400" />
                  Official Storefront
                </div>
                <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Open 7:00 AM – 10:00 PM Daily</span>
                </div>
              </div>

              {/* Official Shop Banner - Illuminated Signboard style with breathing neon glow */}
              <div className="bg-white rounded-2xl p-3.5 inline-block mb-6 shadow-2xl border-2 border-orange-400/50 animate-pulse-glow">
                <Image
                  src="/images/logo.png"
                  alt="Rehan Bike Rental Official Banner"
                  width={280}
                  height={75}
                  className="h-12 sm:h-16 w-auto object-contain"
                />
              </div>

              <div className="flex items-start gap-2.5 text-amber-300 font-extrabold text-lg sm:text-xl mb-4">
                <Navigation className="w-5 h-5 flex-shrink-0 text-orange-400 mt-1 animate-bounce" />
                <span>{SITE_CONFIG.address}</span>
              </div>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
                Located right at the <strong>Kathgodam Call Tax barrier</strong> next to the HP Petrol Pump.
                Whether you arrive by train at Kathgodam Railway Station or by road, our shop sits directly at the foot of the hills on the direct ascent to Nainital, Bhimtal, and Almora.
              </p>

              {/* Route Timeline Mini-Card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6 backdrop-blur-sm max-w-xl">
                <p className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-2.5">
                  Direct Hill Travel Corridor:
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-gray-200">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <span>🚉 Kathgodam Station</span>
                    <span className="text-orange-400 font-bold">➔</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-orange-500/20 px-3 py-1.5 rounded-xl border border-orange-400/40 font-bold text-white shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>📍 Rehan Shop (HP Pump)</span>
                    <span className="text-orange-400 font-bold">➔</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-semibold text-amber-300">
                    <span>🏔️ Nainital (35 km)</span>
                  </div>
                </div>
              </div>

              {/* Direct Booking & Navigation Buttons */}
              <div className="flex flex-wrap gap-3 items-center mb-6">
                <a
                  href={`tel:${SITE_CONFIG.phones[0]}`}
                  className="shimmer-btn inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm rounded-xl transition-all shadow-lg shadow-orange-500/25 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Phone className="w-4 h-4" />
                  Call {SITE_CONFIG.phones[0]}
                </a>
                <a
                  href="https://wa.me/919286535286"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shimmer-btn animate-pulse-emerald inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm rounded-xl transition-all shadow-lg shadow-emerald-900/30 hover:scale-[1.02] active:scale-[0.98] border border-emerald-400/30"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp {SITE_CONFIG.phones[0]}
                </a>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-xl transition-all border border-white/20 hover:-translate-y-0.5 backdrop-blur-sm"
                >
                  <ExternalLink className="w-4 h-4 text-orange-400" />
                  Open in Google Maps
                </a>
              </div>

              {/* Contact info strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-5 border-t border-white/10 text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                  <span>Alt Phone: <a href={`tel:${SITE_CONFIG.phones[1]}`} className="text-white hover:text-amber-300 font-bold transition-colors">{SITE_CONFIG.phones[1]}</a></span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                  <span>Email: <a href={`mailto:${SITE_CONFIG.email}`} className="text-white hover:text-amber-300 font-bold transition-colors">{SITE_CONFIG.email}</a></span>
                </div>
              </div>
            </div>

            {/* Right Information Details Box */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 flex-shrink-0 mt-0.5 shadow-sm">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-white mb-0.5">Shop Operating Hours</h4>
                    <p className="text-xs text-gray-300">Open 7 Days a Week, 365 Days</p>
                    <p className="text-xs text-amber-300 font-bold mt-0.5">7:00 AM – 10:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0 mt-0.5 shadow-sm">
                    <Navigation className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-white mb-0.5">Prime Highway Landmark</h4>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      Kathgodam Call Tax Chowk, directly adjacent to HP Petrol Pump, Haldwani, Uttarakhand.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5 shadow-sm">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-white mb-0.5">Quick 5-Minute Handover</h4>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      Show your original Driving License & Aadhaar, collect your helmet, and ride straight to the hills!
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <Link
                    href="/booking"
                    className="shimmer-btn animate-pulse-glow w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-sm rounded-2xl transition-all shadow-xl shadow-orange-500/25 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Reserve Scooty at this Shop ➔
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Key Shop Advantages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#12334A] text-sm mb-1">Direct Gateway to Nainital</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Located right at the Kathgodam toll exit where the hill road starts. No city traffic delays.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#12334A] text-sm mb-1">Mountain-Tested Vehicles</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                All scooters are inspected and tuned specifically for steep inclines and uphill safety.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#12334A] text-sm mb-1">Owner Direct Support</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Speak directly with the shop owner at 9286535286 for instant queries and booking assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
