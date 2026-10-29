'use client';

import { Star, MapPin, Zap, Fuel, Users, HardHat, Clock, Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Scooter } from '@/types';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface ScooterCardProps {
  scooter: Scooter;
  className?: string;
}

const categoryColors: Record<string, string> = {
  scooter: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-xs',
  bike: 'bg-amber-50 text-amber-800 border border-amber-200/80 shadow-xs',
  cruiser: 'bg-purple-50 text-purple-700 border border-purple-200/80 shadow-xs',
  adventure: 'bg-teal-50 text-teal-800 border border-teal-200/80 shadow-xs font-bold',
  commuter: 'bg-blue-50 text-blue-700 border border-blue-200/80',
  sports: 'bg-red-50 text-red-700 border border-red-200/80',
  electric: 'bg-green-50 text-green-700 border border-green-200/80',
  premium: 'bg-purple-50 text-purple-700 border border-purple-200/80',
};

const categoryLabels: Record<string, string> = {
  scooter: 'Scooter · 110-125cc',
  bike: 'Roadster · 350cc',
  cruiser: 'Cruiser · 350cc',
  adventure: 'Adventure · 450cc',
  commuter: 'Commuter',
  sports: 'Sports',
  electric: 'Electric',
  premium: 'Premium',
};

export default function ScooterCard({ scooter, className }: ScooterCardProps) {
  return (
    <div
      className={cn(
        'bg-[#0D1520] rounded-3xl border border-white/10 overflow-hidden',
        'card-luxury-hover vehicle-card-glow group flex flex-col relative',
        className
      )}
    >
      {/* Top subtle highlight bar on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

      {/* Image container with gradient ambient backlight & wheel underglow */}
      <div className="relative h-52 bg-gradient-to-tr from-slate-950 via-slate-900/80 to-slate-950 overflow-hidden flex items-center justify-center">
        {/* Ambient Underglow Light that illuminates on hover */}
        <div className="absolute bottom-2 w-3/4 h-12 bg-orange-400/0 group-hover:bg-orange-500/25 blur-xl rounded-full transition-all duration-500 pointer-events-none" />

        <Image
          src={scooter.image}
          alt={scooter.name}
          fill
          className="object-contain p-5 group-hover:scale-110 group-hover:-translate-y-1.5 transition-all duration-500 ease-out drop-shadow-xl"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Ambient radial glow behind bike */}
        <div className="absolute inset-0 bg-radial from-orange-400/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Availability Badge */}
        <div
          className={cn(
            'absolute top-3.5 right-3.5 px-3 py-1 rounded-full text-xs font-bold shadow-xs flex items-center gap-1.5 backdrop-blur-md transition-transform group-hover:scale-105',
            scooter.available
              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/50'
              : 'bg-red-950/80 text-red-300 border border-red-500/50'
          )}
        >
          <span className={cn('w-1.5 h-1.5 rounded-full', scooter.available ? 'bg-emerald-400 animate-pulse' : 'bg-red-400')} />
          {scooter.available ? 'Available' : 'Booked'}
        </div>

        {/* Category Pill */}
        <div
          className={cn(
            'absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide backdrop-blur-md transition-transform group-hover:scale-105',
            categoryColors[scooter.category] || 'bg-slate-800 text-gray-300'
          )}
        >
          {categoryLabels[scooter.category] || scooter.category}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between mb-3.5">
          <div>
            <h3 className="font-extrabold text-white text-lg leading-tight group-hover:text-orange-400 transition-colors">
              {scooter.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
              <span className="text-xs text-gray-400 font-medium">Kathgodam HP Petrol Pump</span>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-amber-950/50 border border-amber-500/40 px-2.5 py-1 rounded-xl shadow-xs">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-xs font-black text-amber-300">{scooter.rating}</span>
          </div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-2 text-xs text-gray-300 bg-slate-900/90 border border-white/5 rounded-xl px-2.5 py-2">
            {scooter.fuelType === 'electric' ? (
              <Zap className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            ) : (
              <Fuel className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
            )}
            <span className="truncate font-medium">{scooter.mileage}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-300 bg-slate-900/90 border border-white/5 rounded-xl px-2.5 py-2">
            <Clock className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
            <span className="truncate font-medium">{scooter.engine}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-300 bg-slate-900/90 border border-white/5 rounded-xl px-2.5 py-2">
            <Users className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
            <span className="font-medium">{scooter.seats} Seats</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-300 bg-slate-900/90 border border-white/5 rounded-xl px-2.5 py-2">
            <HardHat className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span className="truncate font-medium text-emerald-300">Helmet Free</span>
          </div>
        </div>

        {/* Eye-Catchy Daily Pricing Block */}
        <div className="flex items-center justify-between py-3 px-4 bg-gradient-to-r from-orange-950/60 via-slate-900/90 to-amber-950/50 rounded-2xl border border-orange-500/30 mb-5 shadow-xs">
          <div>
            <div className="text-[10px] font-extrabold text-orange-400 uppercase tracking-wider">Flat Daily Rate</div>
            <div className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Zero Hidden Fees
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-baseline gap-1 justify-end">
              <span className="text-2xl font-black text-amber-300 tracking-tight">{formatPrice(scooter.pricePerDay)}</span>
              <span className="text-xs font-bold text-gray-400">/ day</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2.5 mt-auto">
          <Link
            href={`/fleet/${scooter.id}`}
            className="flex-1 py-3 text-center text-xs font-bold text-gray-300 border border-slate-700/80 rounded-xl hover:border-orange-400 hover:bg-slate-800/80 hover:text-white transition-all duration-200"
          >
            Specs & Details
          </Link>
          <Link
            href={scooter.available ? `/booking?scooter=${scooter.id}` : '#'}
            className={cn(
              'flex-1 py-3 text-center text-xs font-extrabold rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5',
              scooter.available
                ? 'shimmer-btn bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/35 hover:-translate-y-0.5 group/btn'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            )}
            onClick={(e) => !scooter.available && e.preventDefault()}
          >
            <span>{scooter.available ? 'Book Now' : 'Unavailable'}</span>
            {scooter.available && (
              <span className="transition-transform duration-200 group-hover/btn:translate-x-1 font-black">➔</span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}
