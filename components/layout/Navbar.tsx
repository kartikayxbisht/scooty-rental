'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone, MapPin, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SITE_CONFIG } from '@/lib/data';

const navLinks = [
  { label: 'Fleet', href: '/fleet' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Shop Location', href: '/#locations' },
  { label: 'Reviews', href: '/#reviews' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const id = href.replace('/#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
      }
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white shadow-md border-b border-gray-100'
          : 'bg-white/95 backdrop-blur-md border-b border-gray-100/50'
      )}
    >
      {/* Top micro-bar with address and booking phones */}
      <div className="bg-[#12334A] text-gray-200 text-xs py-1.5 px-4 sm:px-6 lg:px-8 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-gray-300 truncate">
            <MapPin className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
            <span className="truncate">{SITE_CONFIG.address}</span>
          </div>
          <div className="flex items-center gap-3 lg:gap-4 flex-shrink-0">
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="text-gray-300 hover:text-orange-400 transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3 h-3 text-orange-400" />
              <span>{SITE_CONFIG.email}</span>
            </a>
            <span className="text-gray-600">|</span>
            <span className="text-gray-400 font-medium">Booking:</span>
            <a
              href={`tel:${SITE_CONFIG.phones[0]}`}
              className="text-white hover:text-orange-400 font-semibold transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-orange-400" />
              {SITE_CONFIG.phones[0]}
            </a>
            <span className="text-gray-500">|</span>
            <a
              href={`tel:${SITE_CONFIG.phones[1]}`}
              className="text-white hover:text-orange-400 font-semibold transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-orange-400" />
              {SITE_CONFIG.phones[1]}
            </a>
          </div>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center group flex-shrink-0 py-1">
            <Image
              src="/images/logo.png"
              alt="Rehan Bike Rental"
              width={260}
              height={70}
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="px-3.5 py-2 text-sm font-medium text-gray-600 hover:text-[#12334A] rounded-lg hover:bg-gray-50 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${SITE_CONFIG.phones[0]}`}
              className="flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold text-orange-600 bg-orange-50/80 hover:bg-orange-100 rounded-xl transition-all border border-orange-200/80 shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <Phone className="w-3.5 h-3.5 text-orange-500" />
              <span>Call: {SITE_CONFIG.phones[0]}</span>
            </a>
            <Link
              href="/booking"
              className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-sm font-extrabold rounded-xl transition-all duration-200 shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5"
            >
              Book Now ➔
            </Link>
          </div>

          {/* Mobile Right Controls: Quick Call Button + Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${SITE_CONFIG.phones[0]}`}
              className="p-2 rounded-lg bg-orange-50 text-orange-600 border border-orange-200 flex items-center justify-center"
              aria-label="Call for booking"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
              id="mobile-menu-btn"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300 ease-in-out',
            isMobileMenuOpen ? 'max-h-[32rem] opacity-100 pb-4' : 'max-h-0 opacity-0'
          )}
        >
          <div className="flex flex-col gap-1 pt-2 border-t border-gray-100">
            {/* Mobile Contact Quick Box */}
            <div className="p-3 bg-orange-50/70 rounded-xl mb-2 border border-orange-100 text-xs">
              <p className="font-bold text-[#12334A] flex items-center gap-1.5 mb-1.5">
                <Phone className="w-3.5 h-3.5 text-orange-500" />
                Call for Instant Booking:
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href={`tel:${SITE_CONFIG.phones[0]}`}
                  className="px-2.5 py-1.5 bg-white rounded-lg border border-orange-200 font-semibold text-orange-600 inline-block"
                >
                  📞 {SITE_CONFIG.phones[0]}
                </a>
                <a
                  href={`tel:${SITE_CONFIG.phones[1]}`}
                  className="px-2.5 py-1.5 bg-white rounded-lg border border-orange-200 font-semibold text-orange-600 inline-block"
                >
                  📞 {SITE_CONFIG.phones[1]}
                </a>
              </div>
              <p className="text-gray-500 text-[11px] mt-2 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-orange-500 flex-shrink-0" />
                {SITE_CONFIG.address}
              </p>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="text-orange-600 font-medium text-[11px] mt-1.5 flex items-center gap-1 hover:underline"
              >
                <Mail className="w-3 h-3 text-orange-500 flex-shrink-0" />
                {SITE_CONFIG.email}
              </a>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-[#12334A] hover:bg-gray-50 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <div className="flex gap-3 pt-3 px-2">
              <Link
                href="/login"
                className="flex-1 py-2.5 text-center text-sm font-medium text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/booking"
                className="flex-1 py-2.5 text-center text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-xl transition-colors"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
