import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Scooter, FilterOptions, Booking } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number | undefined | null): string {
  if (price === undefined || price === null || isNaN(price)) return '₹0';
  return `₹${price.toLocaleString('en-IN')}`;
}

export function calculateRentalPrice(
  scooter: Scooter,
  pickupDate: string,
  pickupTime: string,
  returnDate: string,
  returnTime: string
): { hours: number; days: number; total: number; type: 'days' } {
  if (!pickupDate || !returnDate) {
    return { hours: 24, days: 1, total: scooter.pricePerDay, type: 'days' };
  }

  const pickup = new Date(`${pickupDate}T${pickupTime || '09:00'}`);
  const returnDt = new Date(`${returnDate}T${returnTime || '09:00'}`);
  const diffMs = returnDt.getTime() - pickup.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  const days = Math.max(diffDays, 1);
  const hours = days * 24;

  return {
    hours,
    days,
    total: scooter.pricePerDay * days,
    type: 'days',
  };
}

export function filterScooters(scooters: Scooter[], options: FilterOptions): Scooter[] {
  return scooters.filter((scooter) => {
    if (options.category && options.category !== 'all' && scooter.category !== options.category)
      return false;
    if (options.location && options.location !== 'all' && scooter.location !== options.location)
      return false;
    if (options.fuelType && options.fuelType !== 'all' && scooter.fuelType !== options.fuelType)
      return false;
    if (options.available !== undefined && scooter.available !== options.available) return false;
    if (options.minPrice && scooter.pricePerDay < options.minPrice) return false;
    if (options.maxPrice && scooter.pricePerDay > options.maxPrice) return false;
    if (options.search) {
      const searchLower = options.search.toLowerCase();
      return (
        scooter.name.toLowerCase().includes(searchLower) ||
        scooter.brand.toLowerCase().includes(searchLower) ||
        scooter.category.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });
}

export function getBookingTotal(booking: Partial<Booking>): number {
  return booking.basePrice || 0;
}

export function generateBookingId(): string {
  return 'BK' + Math.random().toString(36).substr(2, 8).toUpperCase();
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function getStatusColor(status: Booking['status']): string {
  const map: Record<Booking['status'], string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-blue-100 text-blue-700',
    active: 'bg-green-100 text-green-700',
    completed: 'bg-gray-100 text-gray-600',
    cancelled: 'bg-red-100 text-red-700',
  };
  return map[status] || 'bg-gray-100 text-gray-600';
}
