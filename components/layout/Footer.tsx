import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Globe, Share2, Send, ExternalLink } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/data';

const footerLinks = {
  company: [
    { label: 'Fleet', href: '/fleet' },
    { label: 'Shop Location', href: '/#locations' },
    { label: 'Pricing Plans', href: '/#pricing' },
    { label: 'How It Works', href: '/#how-it-works' },
  ],
  support: [
    { label: 'Book Scooter', href: '/booking' },
    { label: 'Customer Reviews', href: '/#reviews' },
    { label: 'Call 9286535286', href: `tel:${SITE_CONFIG.phones[0]}` },
    { label: 'Call 8057862900', href: `tel:${SITE_CONFIG.phones[1]}` },
  ],
  social: [
    { label: 'Instagram', href: '#', icon: Globe },
    { label: 'Facebook', href: '#', icon: Share2 },
    { label: 'LinkedIn', href: '#', icon: ExternalLink },
    { label: 'Twitter', href: '#', icon: Send },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#04060A] border-t border-white/10 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand & Contact */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block bg-white px-3.5 py-2 rounded-2xl shadow-md mb-5 group hover:opacity-95 transition-opacity">
              <Image
                src="/images/logo.png"
                alt="Rehan Bike Rental"
                width={200}
                height={52}
                className="h-10 sm:h-11 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Affordable, reliable bike and scooter rentals in Kathgodam & Haldwani. Gateway to Nainital, Bhimtal, and Kumaon hills.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5 text-sm text-gray-300">
                <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.address}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-gray-300">
                <Phone className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <div className="flex flex-col sm:flex-row sm:gap-2">
                  <a href={`tel:${SITE_CONFIG.phones[0]}`} className="hover:text-orange-400 transition-colors font-medium">
                    {SITE_CONFIG.phoneFormatted[0]}
                  </a>
                  <span className="hidden sm:inline text-gray-500">|</span>
                  <a href={`tel:${SITE_CONFIG.phones[1]}`} className="hover:text-orange-400 transition-colors font-medium">
                    {SITE_CONFIG.phoneFormatted[1]}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-gray-300">
                <Mail className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-orange-400 transition-colors">
                  {SITE_CONFIG.email}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-orange-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Booking & Helplines */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Direct Booking</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-orange-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop Hours & Location Info */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Shop Timings</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm mb-4">
              <p className="text-white font-medium mb-1">Open 7 Days a Week</p>
              <p className="text-gray-400 text-xs mb-2">7:00 AM – 10:00 PM</p>
              <p className="text-xs text-orange-400">
                Instant delivery & pickup at Kathgodam Railway Station available.
              </p>
            </div>
            <div className="flex gap-3">
              {footerLinks.social.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-orange-500 flex items-center justify-center transition-all duration-200 group"
                >
                  <social.icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © 2026 {SITE_CONFIG.name}. All rights reserved. Located at {SITE_CONFIG.address}.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="text-xs text-gray-500 hover:text-gray-400 transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="text-xs text-gray-500 hover:text-gray-400 transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
