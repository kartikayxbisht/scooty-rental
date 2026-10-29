'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Bike, LayoutDashboard, ClipboardList, Users, CreditCard,
  Plus, Pencil, Trash2, Check, X, Search, Bell, TrendingUp,
  BarChart3, Package
} from 'lucide-react';
import { SCOOTERS, MOCK_BOOKINGS } from '@/lib/data';
import { formatPrice, formatDate, getStatusColor } from '@/lib/utils';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'scooters', label: 'Scooters', icon: Bike },
  { id: 'bookings', label: 'Bookings', icon: ClipboardList },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'payments', label: 'Payments', icon: CreditCard },
];

const stats = [
  { label: 'Total Scooters', value: '24', change: '+2', icon: Bike, color: 'bg-blue-50 text-blue-500' },
  { label: 'Available', value: '18', change: '-1', icon: Package, color: 'bg-green-50 text-green-500' },
  { label: 'Active Rentals', value: '6', change: '+3', icon: TrendingUp, color: 'bg-orange-50 text-orange-500' },
  { label: 'Total Revenue', value: '₹1.2L', change: '+12%', icon: BarChart3, color: 'bg-purple-50 text-purple-500' },
  { label: 'Total Users', value: '342', change: '+18', icon: Users, color: 'bg-amber-50 text-amber-500' },
];

const mockUsers = [
  { id: 'u1', name: 'Arjun Sharma', email: 'arjun@example.com', phone: '+91 98765 43210', rides: 12, spent: 8450, joined: '2026-01-15' },
  { id: 'u2', name: 'Priya Mehta', email: 'priya@example.com', phone: '+91 91234 56789', rides: 7, spent: 4200, joined: '2026-02-20' },
  { id: 'u3', name: 'Rohan Kapoor', email: 'rohan@example.com', phone: '+91 99876 54321', rides: 3, spent: 1200, joined: '2026-03-10' },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [search, setSearch] = useState('');
  const [scooters, setScooters] = useState(SCOOTERS);

  const filteredScooters = scooters.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) || s.brand.toLowerCase().includes(search.toLowerCase())
  );

  const toggleAvailability = (id: string) => {
    setScooters((prev) => prev.map((s) => (s.id === id ? { ...s, available: !s.available } : s)));
  };

  return (
    <div className="pt-16 min-h-screen bg-[#F1F4F6]">
      {/* Top Admin Bar */}
      <div className="bg-[#12334A] border-b border-white/10 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <div className="bg-white px-2.5 py-1 rounded-lg shadow-sm">
                <Image
                  src="/images/logo.png"
                  alt="Rehan Bike Rental"
                  width={140}
                  height={35}
                  className="h-6 w-auto object-contain"
                />
              </div>
              <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full font-semibold">Admin Panel</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 text-gray-300 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full" />
              </button>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">A</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      activeTab === item.id
                        ? 'bg-[#12334A] text-white shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-[#12334A]'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-4 space-y-6">
            {/* Dashboard Overview */}
            {activeTab === 'dashboard' && (
              <>
                <div>
                  <h1 className="text-2xl font-extrabold text-[#12334A]">Dashboard Overview</h1>
                  <p className="text-gray-500 text-sm">Real-time platform statistics</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {stats.map((stat, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                      <div className={`w-9 h-9 ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
                        <stat.icon className="w-4 h-4" />
                      </div>
                      <p className="text-xl font-extrabold text-[#12334A]">{stat.value}</p>
                      <p className="text-xs text-gray-400">{stat.label}</p>
                      <p className="text-xs text-green-500 font-semibold mt-1">{stat.change} this week</p>
                    </div>
                  ))}
                </div>

                {/* Recent Bookings */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h3 className="font-bold text-[#12334A]">Recent Bookings</h3>
                    <button onClick={() => setActiveTab('bookings')} className="text-sm text-orange-500 hover:text-orange-600 font-medium">View all</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                          {['Booking ID', 'Customer', 'Scooter', 'Duration', 'Amount', 'Status'].map((h) => (
                            <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {MOCK_BOOKINGS.map((b) => (
                          <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-xs font-mono text-gray-500">#{b.id}</td>
                            <td className="px-4 py-3 text-sm font-medium text-[#12334A]">{b.customerName}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{b.scooterName}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{b.duration} days</td>
                            <td className="px-4 py-3 text-sm font-bold text-orange-500">{formatPrice(b.totalPrice)}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getStatusColor(b.status)}`}>
                                {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {/* Scooter Management */}
            {activeTab === 'scooters' && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 border-b border-gray-100">
                  <h3 className="font-bold text-[#12334A] text-lg">Scooter Management</h3>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                      />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors" id="add-scooter-btn">
                      <Plus className="w-4 h-4" />
                      Add Scooter
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        {['Scooter', 'Category', 'Price/Day', 'Location', 'Status', 'Actions'].map((h) => (
                          <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filteredScooters.map((s) => (
                        <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-9 bg-gray-50 rounded-lg relative overflow-hidden flex-shrink-0">
                                <Image src={s.image} alt={s.name} fill className="object-contain p-1" />
                              </div>
                              <span className="text-sm font-semibold text-[#12334A]">{s.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm capitalize text-gray-600">{s.category}</td>
                          <td className="px-4 py-3 text-sm font-bold text-orange-500">{formatPrice(s.pricePerDay)}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{s.location}</td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => toggleAvailability(s.id)}
                              className={`px-2.5 py-1 rounded-full text-xs font-bold transition-colors ${
                                s.available ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-red-100 text-red-600 hover:bg-red-200'
                              }`}
                            >
                              {s.available ? '● Available' : '● Unavailable'}
                            </button>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <button className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Edit scooter">
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                              <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete scooter">
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Bookings Management */}
            {activeTab === 'bookings' && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="font-bold text-[#12334A] text-lg">Booking Management</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        {['ID', 'Customer', 'Scooter', 'Pickup', 'Return', 'Amount', 'Status', 'Actions'].map((h) => (
                          <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {MOCK_BOOKINGS.map((b) => (
                        <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-xs font-mono text-gray-500">#{b.id}</td>
                          <td className="px-4 py-3 text-sm font-medium text-[#12334A]">{b.customerName}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{b.scooterName}</td>
                          <td className="px-4 py-3 text-xs text-gray-500">{formatDate(b.pickupDate)}</td>
                          <td className="px-4 py-3 text-xs text-gray-500">{formatDate(b.returnDate)}</td>
                          <td className="px-4 py-3 text-sm font-bold text-orange-500">{formatPrice(b.totalPrice)}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getStatusColor(b.status)}`}>
                              {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <button className="p-1.5 text-green-500 hover:bg-green-50 rounded-lg transition-colors" title="Confirm booking">
                                <Check className="w-3.5 h-3.5" />
                              </button>
                              <button className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors" title="Cancel booking">
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Users */}
            {activeTab === 'users' && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="font-bold text-[#12334A] text-lg">User Management</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        {['User', 'Contact', 'Total Rides', 'Total Spent', 'Joined', 'Actions'].map((h) => (
                          <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {mockUsers.map((u) => (
                        <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-orange-600 font-bold text-sm">{u.name.charAt(0)}</span>
                              </div>
                              <span className="text-sm font-semibold text-[#12334A]">{u.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <p className="text-xs text-gray-600">{u.email}</p>
                            <p className="text-xs text-gray-400">{u.phone}</p>
                          </td>
                          <td className="px-4 py-3 text-sm text-[#12334A] font-semibold">{u.rides}</td>
                          <td className="px-4 py-3 text-sm font-bold text-orange-500">{formatPrice(u.spent)}</td>
                          <td className="px-4 py-3 text-xs text-gray-400">{formatDate(u.joined)}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1">
                              <button className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                              <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 shadow-sm text-center">
                <div className="text-5xl mb-4">💳</div>
                <h3 className="text-lg font-bold text-[#12334A] mb-2">Payment Management</h3>
                <p className="text-gray-500">Payment gateway integration coming soon. Connect Razorpay or Stripe here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
