'use client';

import { useState } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import ScooterCard from '@/components/ui/ScooterCard';
import { SCOOTERS } from '@/lib/data';
import { filterScooters } from '@/lib/utils';
import { FilterOptions } from '@/types';

const categories = [
  { value: 'all', label: 'All Fleet (10)', icon: '🏍️' },
  { value: 'scooter', label: 'Scooters (₹500/d)', icon: '🛵' },
  { value: 'bike', label: 'Hunter & Classic', icon: '⚡' },
  { value: 'cruiser', label: 'Meteor Cruiser', icon: '👑' },
  { value: 'adventure', label: 'Himalayan 450', icon: '🏔️' },
];

const fuelTypes = [
  { value: 'all', label: 'All' },
  { value: 'petrol', label: 'Petrol' },
];

export default function FleetSection() {
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    fuelType: 'all',
    search: '',
    available: undefined,
  });

  const [showFilters, setShowFilters] = useState(false);

  const filtered = filterScooters(SCOOTERS, filters);

  return (
    <section id="fleet" className="bg-[#F1F4F6] py-20 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-10 right-0 w-80 h-80 bg-orange-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-orange-600 bg-orange-50 border border-orange-200/80 px-4 py-2 rounded-full mb-4 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            Verified Rental Fleet
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#12334A] mb-4 tracking-tight">
            Choose Your Ride for the Hills
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto font-medium">
            From easy 110-125cc scooters (<span className="text-orange-600 font-bold">₹500/day</span>) to iconic Royal Enfield touring machines — clean, serviced, and tested for mountain roads.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 mb-10 shadow-lg shadow-slate-900/5 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500" />
              <input
                type="text"
                placeholder="Search Activa, Classic, Himalayan..."
                value={filters.search || ''}
                onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 text-sm font-medium border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-gray-50/70"
                id="fleet-search"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setFilters((f) => ({ ...f, category: cat.value }))}
                  className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-2xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${filters.category === cat.value
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25 scale-[1.02]'
                      : 'bg-gray-100/80 text-gray-700 hover:bg-gray-200/80 hover:text-gray-900'
                    }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            {/* More Filters Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors flex-shrink-0"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Extended Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-2">Fuel Type</label>
                <div className="flex gap-2">
                  {fuelTypes.map((ft) => (
                    <button
                      key={ft.value}
                      onClick={() => setFilters((f) => ({ ...f, fuelType: ft.value }))}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${filters.fuelType === ft.value
                          ? 'bg-[#12334A] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                      {ft.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-2">Availability</label>
                <div className="flex gap-2">
                  {[
                    { value: undefined, label: 'All' },
                    { value: true, label: 'Available' },
                  ].map((opt) => (
                    <button
                      key={String(opt.value)}
                      onClick={() => setFilters((f) => ({ ...f, available: opt.value }))}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${filters.available === opt.value
                          ? 'bg-[#12334A] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-[#12334A]">{filtered.length}</span> scooters
          </p>
          {filters.search || filters.category !== 'all' || filters.fuelType !== 'all' ? (
            <button
              onClick={() => setFilters({ category: 'all', fuelType: 'all', search: '' })}
              className="text-sm text-orange-500 hover:text-orange-600 font-medium"
            >
              Clear filters
            </button>
          ) : null}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((scooter) => (
              <ScooterCard key={scooter.id} scooter={scooter} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🛵</div>
            <h3 className="text-xl font-bold text-[#12334A] mb-2">No scooters found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters or search term.</p>
            <button
              onClick={() => setFilters({ category: 'all', fuelType: 'all', search: '' })}
              className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
