'use client';

import { notFound } from 'next/navigation';
import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  Star, MapPin, Zap, Fuel, Users, HardHat, ArrowLeft,
  Check, ChevronRight, Shield, Clock
} from 'lucide-react';
import { SCOOTERS } from '@/lib/data';
import { formatPrice, calculateRentalPrice } from '@/lib/utils';

const today = new Date().toISOString().split('T')[0];
const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

export default function ScooterDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const scooter = SCOOTERS.find((s) => s.id === id);
  if (!scooter) notFound();

  const [pickupDate, setPickupDate] = useState(today);
  const [pickupTime, setPickupTime] = useState('09:00');
  const [returnDate, setReturnDate] = useState(tomorrow);
  const [returnTime, setReturnTime] = useState('09:00');
  const rental = calculateRentalPrice(scooter, pickupDate, pickupTime, returnDate, returnTime);
  const total = rental.total;

  const specs = [
    { label: 'Engine / Motor', value: scooter.engine, icon: Zap },
    { label: 'Mileage / Range', value: scooter.mileage, icon: Clock },
    { label: 'Fuel Type', value: scooter.fuelType === 'electric' ? 'Electric' : 'Petrol', icon: Fuel },
    { label: 'Transmission', value: 'Automatic', icon: Check },
    { label: 'Seating Capacity', value: `${scooter.seats} Person`, icon: Users },
    { label: 'Helmet', value: scooter.helmetAvailable ? 'Included' : 'Not Included', icon: HardHat },
  ];

  return (
    <div className="pt-20 min-h-screen bg-[#06090e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link href="/fleet" className="hover:text-orange-400 flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Fleet
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-600" />
          <span className="text-white font-medium">{scooter.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Image + Specs */}
          <div className="lg:col-span-3 space-y-6">
            {/* Image */}
            <div className="bg-[#0D1520] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
              <div className="relative h-72 sm:h-96 bg-gradient-to-br from-[#121c2b] to-[#0A1017]">
                <Image
                  src={scooter.image}
                  alt={scooter.name}
                  fill
                  className="object-contain p-8"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
                <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold ${
                  scooter.available ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/10 text-red-400 border border-red-500/30'
                }`}>
                  {scooter.available ? '● Available Now' : '● Unavailable'}
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-[#0D1520] rounded-2xl border border-white/10 p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{scooter.name}</h1>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-white">{scooter.rating}</span>
                      <span className="text-gray-400 text-sm">({scooter.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 text-sm">
                      <MapPin className="w-3.5 h-3.5 text-orange-400" />
                      {scooter.location}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-extrabold text-orange-400">{formatPrice(scooter.pricePerDay)}</div>
                  <div className="text-xs text-gray-400">per day</div>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed mb-4">{scooter.description}</p>

              {/* Features */}
              <div className="flex flex-wrap gap-2">
                {scooter.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full text-xs font-medium text-emerald-300">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    {feat}
                  </div>
                ))}
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-[#0D1520] rounded-2xl border border-white/10 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-white mb-4">Specifications</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {specs.map((spec) => (
                  <div key={spec.label} className="bg-[#15202e] rounded-xl p-3 border border-white/5">
                    <spec.icon className="w-4 h-4 text-orange-400 mb-1.5" />
                    <div className="text-xs text-gray-400 mb-0.5">{spec.label}</div>
                    <div className="font-semibold text-white text-sm">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Booking Panel */}
          <div className="lg:col-span-2">
            <div className="bg-[#0D1520] rounded-2xl border border-white/10 p-6 shadow-sm sticky top-24">
              <h2 className="text-lg font-bold text-white mb-5">Configure Your Rental</h2>

              {/* Date/Time Pickers */}
              <div className="space-y-4 mb-5">
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">Pickup Date & Time</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input type="date" value={pickupDate} min={today} onChange={(e) => setPickupDate(e.target.value)} className="w-full px-3 py-2.5 text-sm bg-[#15202e] text-white border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50" />
                    <input type="time" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} className="w-full px-3 py-2.5 text-sm bg-[#15202e] text-white border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">Return Date & Time</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input type="date" value={returnDate} min={pickupDate} onChange={(e) => setReturnDate(e.target.value)} className="w-full px-3 py-2.5 text-sm bg-[#15202e] text-white border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50" />
                    <input type="time" value={returnTime} onChange={(e) => setReturnTime(e.target.value)} className="w-full px-3 py-2.5 text-sm bg-[#15202e] text-white border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50" />
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-[#15202e] rounded-xl p-4 mb-5 space-y-2 border border-white/5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Daily rate</span>
                  <span className="font-medium text-white">
                    {formatPrice(scooter.pricePerDay)} × {rental.days} {rental.days === 1 ? 'day' : 'days'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Rental total</span>
                  <span className="font-medium text-white">{formatPrice(rental.total)}</span>
                </div>
                <div className="border-t border-white/10 pt-2 flex justify-between">
                  <span className="font-bold text-white">Total</span>
                  <span className="font-extrabold text-orange-400 text-lg">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Reserve Button */}
              <Link
                href={scooter.available ? `/booking?scooter=${scooter.id}&pickupDate=${pickupDate}&pickupTime=${pickupTime}&returnDate=${returnDate}&returnTime=${returnTime}` : '#'}
                onClick={(e) => !scooter.available && e.preventDefault()}
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base transition-all duration-200 ${
                  scooter.available
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-0.5 shimmer-btn'
                    : 'bg-[#15202e] text-gray-500 cursor-not-allowed border border-white/5'
                }`}
                id="reserve-now-btn"
              >
                <Shield className="w-5 h-5" />
                {scooter.available ? 'Reserve Now' : 'Currently Unavailable'}
              </Link>

              <p className="text-center text-xs text-gray-400 mt-3">
                Free cancellation up to 24 hours before pickup
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
