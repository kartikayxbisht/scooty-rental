// Core TypeScript interfaces for Ridezy

export interface Scooter {
  id: string;
  name: string;
  brand: string;
  category: 'scooter' | 'bike' | 'cruiser' | 'adventure' | 'commuter' | 'sports' | 'premium';
  image: string;
  images: string[];
  rating: number;
  reviewCount: number;
  engine: string;
  mileage: string;
  fuelType: 'petrol' | 'electric';
  transmission: 'automatic' | 'manual';
  seats: number;
  helmetAvailable: boolean;
  pricePerDay: number;
  available: boolean;
  location: string;
  features: string[];
  description: string;
  color: string;
  year: number;
}

export interface Location {
  id: string;
  name: string;
  city: string;
  state: string;
  image: string;
  scooterCount: number;
  address: string;
  isActive: boolean;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  scooterId?: string;
  scooterName?: string;
  rating: number;
  comment: string;
  rentalDuration: string;
  createdAt: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  label: string;
  priceFrom: number;
  unit: string;
  features: string[];
  popular?: boolean;
}

export interface BookingFormData {
  pickupLocation: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  scooterId?: string;
}

export interface Booking {
  id: string;
  userId: string;
  scooterId: string;
  scooterName: string;
  scooterImage: string;
  pickupLocation: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  duration: number;
  durationType: 'hours' | 'days';
  basePrice: number;
  additionalHelmet: boolean;
  doorstepDelivery: boolean;
  insurance: boolean;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  createdAt: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  licenseNumber: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: 'user' | 'admin';
  totalRides: number;
  totalSpent: number;
  createdAt: string;
  licenseNumber?: string;
}

export interface AdminStats {
  totalScooters: number;
  availableScooters: number;
  activeRentals: number;
  totalRevenue: number;
  totalUsers: number;
  totalBookings: number;
}

export interface FilterOptions {
  category?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  fuelType?: string;
  available?: boolean;
  search?: string;
}
