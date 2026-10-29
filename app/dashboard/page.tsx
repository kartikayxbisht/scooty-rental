'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Bike, LayoutDashboard, ClipboardList, Clock, User, Settings,
  ChevronRight, Star, TrendingUp, MapPin, Calendar, LogOut
} from 'lucide-react';
import { MOCK_USER, MOCK_BOOKINGS } from '@/lib/data';
import { formatPrice, formatDate, getStatusColor } from '@/lib/utils';

const navItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'bookings', label: 'My Bookings', icon: ClipboardList },
  { id: 'history', label: 'Ride History', icon: Clock },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const user = MOCK_USER;
  const bookings = MOCK_BOOKINGS;
  const activeBooking = bookings.find((b) => b.status === 'confirmed');
  const pastBookings = bookings.filter((b) => b.status === 'completed');

  return (
    <div className="pt-16 min-h-screen bg-[#F1F4F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-4">
              {/* User info */}
              <div className="flex items-center gap-4 pb-5 border-b border-gray-100 mb-5">
                <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-orange-500 font-extrabold text-xl">{user.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-bold text-[#12334A]">{user.name}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
              </div>

              {/* Stats summary */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-orange-50 rounded-xl p-3 text-center">
                  <p className="text-2xl font-extrabold text-orange-500">{user.totalRides}</p>
                  <p className="text-xs text-gray-500">Total Rides</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-3 text-center">
                  <p className="text-xl font-extrabold text-blue-600">{formatPrice(user.totalSpent)}</p>
                  <p className="text-xs text-gray-500">Total Spent</p>
                </div>
              </div>

              {/* Nav */}
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      activeTab === item.id
                        ? 'bg-orange-500 text-white shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-[#12334A]'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            <button className="w-full flex items-center gap-3 px-4 py-3 bg-white border border-gray-100 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 hover:border-red-100 transition-all shadow-sm">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {activeTab === 'overview' && (
              <>
                {/* Welcome */}
                <div className="bg-[#12334A] rounded-2xl p-6 text-white">
                  <p className="text-orange-400 text-sm font-semibold mb-1">Welcome back!</p>
                  <h2 className="text-2xl font-extrabold">{user.name} 👋</h2>
                  <p className="text-gray-300 mt-1">You have {activeBooking ? '1 active booking' : 'no upcoming bookings'}.</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Rides', value: user.totalRides, icon: Bike, color: 'text-orange-500 bg-orange-50' },
                    { label: 'Total Spent', value: formatPrice(user.totalSpent), icon: TrendingUp, color: 'text-blue-500 bg-blue-50' },
                    { label: 'Cities Visited', value: '3', icon: MapPin, color: 'text-purple-500 bg-purple-50' },
                    { label: 'Avg Rating', value: '4.9★', icon: Star, color: 'text-amber-500 bg-amber-50' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                      <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
                        <stat.icon className="w-5 h-5" />
                      </div>
                      <p className="text-xl font-extrabold text-[#12334A]">{stat.value}</p>
                      <p className="text-xs text-gray-400">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Active Booking */}
                {activeBooking && (
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-[#12334A]">Current Booking</h3>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">Confirmed</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-16 bg-gray-50 rounded-xl flex-shrink-0 relative overflow-hidden">
                        <Image src={activeBooking.scooterImage} alt={activeBooking.scooterName} fill className="object-contain p-2" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-[#12334A]">{activeBooking.scooterName}</p>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <MapPin className="w-3.5 h-3.5 text-orange-500" />
                            {activeBooking.pickupLocation}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <Calendar className="w-3.5 h-3.5 text-orange-500" />
                            {formatDate(activeBooking.pickupDate)}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-extrabold text-orange-500 text-lg">{formatPrice(activeBooking.totalPrice)}</p>
                        <p className="text-xs text-gray-400">{activeBooking.duration} days</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Past Rentals */}
                {pastBookings.length > 0 && (
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-[#12334A]">Recent Rides</h3>
                      <button onClick={() => setActiveTab('history')} className="text-sm text-orange-500 hover:text-orange-600 font-medium">View all</button>
                    </div>
                    <div className="space-y-3">
                      {pastBookings.map((b) => (
                        <div key={b.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                          <div className="w-14 h-10 bg-white rounded-lg flex-shrink-0 relative overflow-hidden">
                            <Image src={b.scooterImage} alt={b.scooterName} fill className="object-contain p-1" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-sm text-[#12334A]">{b.scooterName}</p>
                            <p className="text-xs text-gray-400">{formatDate(b.pickupDate)} · {b.duration} days</p>
                          </div>
                          <div className="text-right">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getStatusColor(b.status)}`}>
                              {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                            </span>
                            <p className="text-sm font-bold text-[#12334A] mt-1">{formatPrice(b.totalPrice)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {activeTab === 'bookings' && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h3 className="font-bold text-[#12334A] text-lg mb-5">My Bookings</h3>
                {bookings.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-5xl mb-3">🛵</div>
                    <p className="text-gray-500">No bookings yet.</p>
                    <Link href="/fleet" className="inline-block mt-4 px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors text-sm">Browse Fleet</Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((b) => (
                      <div key={b.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors">
                        <div className="w-20 h-14 bg-gray-50 rounded-xl flex-shrink-0 relative overflow-hidden">
                          <Image src={b.scooterImage} alt={b.scooterName} fill className="object-contain p-1" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-bold text-[#12334A]">{b.scooterName}</p>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${getStatusColor(b.status)}`}>
                              {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">#{b.id} · {b.pickupLocation} · {formatDate(b.pickupDate)}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-extrabold text-orange-500">{formatPrice(b.totalPrice)}</p>
                          <p className="text-xs text-gray-400">{b.duration} days</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h3 className="font-bold text-[#12334A] text-lg mb-6">Profile Settings</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Full Name', value: user.name, id: 'profile-name' },
                    { label: 'Email Address', value: user.email, id: 'profile-email' },
                    { label: 'Phone Number', value: user.phone, id: 'profile-phone' },
                    { label: 'License Number', value: user.licenseNumber || '', id: 'profile-license' },
                  ].map((field) => (
                    <div key={field.id}>
                      <label htmlFor={field.id} className="text-xs font-semibold text-gray-500 block mb-2">{field.label}</label>
                      <input id={field.id} type="text" defaultValue={field.value} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                    </div>
                  ))}
                  <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors text-sm" id="save-profile-btn">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {(activeTab === 'history' || activeTab === 'settings') && (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 shadow-sm text-center">
                <div className="text-5xl mb-4">
                  {activeTab === 'history' ? '📋' : '⚙️'}
                </div>
                <p className="text-gray-500">
                  {activeTab === 'history' ? 'Full ride history coming soon.' : 'Settings panel coming soon.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
