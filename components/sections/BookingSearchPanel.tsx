'use client';

import { useState } from 'react';
import { MapPin, Calendar, Clock, Search, Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { BookingFormData } from '@/types';
import { LOCATIONS, SITE_CONFIG } from '@/lib/data';

const today = new Date().toISOString().split('T')[0];
const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

export default function BookingSearchPanel() {
  const router = useRouter();
  const [form, setForm] = useState<BookingFormData>({
    pickupLocation: 'Kathgodam / Haldwani',
    pickupDate: today,
    pickupTime: '09:00',
    returnDate: tomorrow,
    returnTime: '09:00',
  });

  const handleChange = (field: keyof BookingFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      location: form.pickupLocation,
      pickupDate: form.pickupDate,
      pickupTime: form.pickupTime,
      returnDate: form.returnDate,
      returnTime: form.returnTime,
    });
    router.push(`/fleet?${params.toString()}`);
  };

  return (
    <section className="relative z-20 -mt-10 sm:-mt-12 px-4 sm:px-6 lg:px-8 pb-8">
      <div className="max-w-6xl mx-auto">
        <form
          onSubmit={handleSearch}
          className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-slate-900/10 border border-orange-100 p-6 sm:p-7 relative overflow-hidden"
        >
          {/* Subtle top amber highlight line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500" />

          {/* Quick Notice & Live Shop Indicators */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-5 border-b border-gray-100 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-700 font-bold rounded-full border border-orange-200/60">
                <MapPin className="w-3.5 h-3.5 text-orange-500" />
                Pickup Shop: {SITE_CONFIG.address}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 font-semibold rounded-full text-[11px]">
                ● Open Now (7 AM - 10 PM)
              </span>
              <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 font-semibold rounded-full text-[11px]">
                ⚡ Flat Daily Rates • Free Helmet
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-gray-400 font-medium">Instant Booking:</span>
              <a
                href={`tel:${SITE_CONFIG.phones[0]}`}
                className="font-bold text-orange-600 hover:text-orange-700 hover:underline flex items-center gap-1 text-xs bg-orange-50/80 px-2.5 py-1 rounded-lg border border-orange-200/50"
              >
                <Phone className="w-3 h-3 text-orange-500" />
                {SITE_CONFIG.phones[0]}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            {/* Pickup Location */}
            <div className="sm:col-span-2 lg:col-span-1">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Pickup Shop
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500" />
                <div
                  className="w-full pl-10 pr-3 py-3 rounded-2xl border border-orange-200/80 text-xs font-extrabold text-[#12334A] bg-orange-50/50 flex items-center select-none shadow-sm"
                  id="pickup-location"
                  title={SITE_CONFIG.address}
                >
                  <span className="truncate">Kathgodam calltax, HP Petrol Pump</span>
                </div>
              </div>
            </div>

            {/* Pickup Date */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Pickup Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500" />
                <input
                  type="date"
                  value={form.pickupDate}
                  min={today}
                  onChange={(e) => handleChange('pickupDate', e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-2xl border border-gray-200 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-gray-50/60 shadow-sm transition-all"
                  id="pickup-date"
                />
              </div>
            </div>

            {/* Pickup Time */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Pickup Time
              </label>
              <div className="relative">
                <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500" />
                <input
                  type="time"
                  value={form.pickupTime}
                  onChange={(e) => handleChange('pickupTime', e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-2xl border border-gray-200 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-gray-50/60 shadow-sm transition-all"
                  id="pickup-time"
                />
              </div>
            </div>

            {/* Return Date */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Return Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500" />
                <input
                  type="date"
                  value={form.returnDate}
                  min={form.pickupDate || today}
                  onChange={(e) => handleChange('returnDate', e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-2xl border border-gray-200 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-gray-50/60 shadow-sm transition-all"
                  id="return-date"
                />
              </div>
            </div>

            {/* Search Button */}
            <div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm rounded-2xl transition-all duration-200 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 cursor-pointer"
                id="search-scooters-btn"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
                Explore Available Fleet
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
