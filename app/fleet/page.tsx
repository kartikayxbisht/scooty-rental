'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { SCOOTERS, LOCATIONS } from '@/lib/data';
import { filterScooters } from '@/lib/utils';
import { FilterOptions } from '@/types';
import ScooterCard from '@/components/ui/ScooterCard';
import { Search, SlidersHorizontal, MapPin } from 'lucide-react';

const categories = [
  { value: 'all', label: 'All Fleet (10)' },
  { value: 'scooter', label: 'Scooters (₹500/day)' },
  { value: 'bike', label: 'Roadster & Classic' },
  { value: 'cruiser', label: 'Cruiser' },
  { value: 'adventure', label: 'Adventure' },
];

function FleetContent() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    fuelType: 'all',
    location: searchParams.get('location') || 'all',
    search: '',
    available: undefined,
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const loc = searchParams.get('location');
    if (loc) setFilters((f) => ({ ...f, location: loc }));
  }, [searchParams]);

  const filtered = filterScooters(SCOOTERS, filters);

  return (
    <div className="pt-24 min-h-screen bg-[#F1F4F6]">
      {/* Header */}
      <div className="bg-[#12334A] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-white mb-2">Browse Our Fleet</h1>
          <p className="text-gray-300 text-lg">
            Scooters & Royal Enfield bikes in Kathgodam & Haldwani — strictly flat per-day pricing.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Bar */}
        <div className="bg-white rounded-2xl p-4 mb-8 shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-wrap">
            {/* Search */}
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search scooters..."
                value={filters.search || ''}
                onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                id="fleet-page-search"
              />
            </div>

            {/* Location */}
            <div className="flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-[#12334A] bg-orange-50 border border-orange-200/80 rounded-xl">
              <MapPin className="w-3.5 h-3.5 text-orange-500" />
              <span>Kathgodam calltax, HP Petrol Pump</span>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setFilters((f) => ({ ...f, category: cat.value }))}
                  className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ${
                    filters.category === cat.value
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* More filters */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              More
            </button>
          </div>

          {/* Extended Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-6">
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-2">Fuel Type</label>
                <div className="flex gap-2">
                  {[
                    { value: 'all', label: 'All' },
                    { value: 'petrol', label: 'Petrol' },
                    { value: 'electric', label: 'Electric' },
                  ].map((ft) => (
                    <button
                      key={ft.value}
                      onClick={() => setFilters((f) => ({ ...f, fuelType: ft.value }))}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
                        filters.fuelType === ft.value
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
                    { value: true, label: 'Available Only' },
                  ].map((opt) => (
                    <button
                      key={String(opt.value)}
                      onClick={() => setFilters((f) => ({ ...f, available: opt.value }))}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
                        filters.available === opt.value
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

        {/* Count + Clear */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            <span className="font-bold text-[#12334A]">{filtered.length}</span> scooters found
          </p>
          {(filters.search || filters.category !== 'all' || filters.fuelType !== 'all' || (filters.location && filters.location !== 'all')) && (
            <button
              onClick={() => setFilters({ category: 'all', fuelType: 'all', search: '', location: 'all' })}
              className="text-sm text-orange-500 hover:text-orange-600 font-medium"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((scooter) => (
              <ScooterCard key={scooter.id} scooter={scooter} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-2xl border border-gray-100">
            <div className="text-5xl mb-4">🛵</div>
            <h3 className="text-xl font-bold text-[#12334A] mb-2">No scooters found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters.</p>
            <button
              onClick={() => setFilters({ category: 'all', fuelType: 'all', search: '', location: 'all' })}
              className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FleetPage() {
  return (
    <Suspense fallback={<div className="pt-24 min-h-screen bg-[#F1F4F6] flex items-center justify-center"><div className="text-gray-500">Loading fleet...</div></div>}>
      <FleetContent />
    </Suspense>
  );
}
