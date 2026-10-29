import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingActions from '@/components/ui/FloatingActions';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Rehan Bike Rental — Scooter & Bike Rentals in Kathgodam & Haldwani',
  description:
    'Rent a scooter or bike with Rehan Bike Rental at Kathgodam calltax, Hp Petrol Pump Haldwani. Call for instant booking: 9286535286, 8057862900. Best rates for Nainital, Bhimtal & Haldwani trips.',
  keywords:
    'Rehan Bike Rental, scooter rental Kathgodam, bike rental Haldwani, scooty rental Kathgodam calltax, bike rental HP petrol pump Haldwani, Nainital bike rental, 9286535286, 8057862900, Uttarakhand scooter rental',
  openGraph: {
    title: 'Rehan Bike Rental — Kathgodam & Haldwani',
    description:
      'Rent a scooty or bike with flat per-day pricing. Call for booking: 9286535286, 8057862900. Located at Kathgodam calltax, Hp Petrol Pump Haldwani.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingActions />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              fontFamily: 'Inter, sans-serif',
              borderRadius: '12px',
              fontSize: '14px',
            },
            success: {
              iconTheme: { primary: '#22c55e', secondary: 'white' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: 'white' },
            },
          }}
        />
      </body>
    </html>
  );
}
