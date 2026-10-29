'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MapPin, Calendar, Clock, User, Mail, Phone, FileText, Check, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { SCOOTERS, SITE_CONFIG } from '@/lib/data';
import { formatPrice, calculateRentalPrice, generateBookingId } from '@/lib/utils';
import toast from 'react-hot-toast';

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  license?: string;
}

function BookingContent() {
  const searchParams = useSearchParams();
  const scooterId = searchParams.get('scooter');
  const scooter = SCOOTERS.find((s) => s.id === scooterId) || SCOOTERS[0];

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [pickupDate, setPickupDate] = useState(searchParams.get('pickupDate') || today);
  const [pickupTime, setPickupTime] = useState(searchParams.get('pickupTime') || '09:00');
  const [returnDate, setReturnDate] = useState(searchParams.get('returnDate') || tomorrow);
  const [returnTime, setReturnTime] = useState(searchParams.get('returnTime') || '09:00');
  const [location] = useState('Kathgodam calltax, Hp Petrol Pump Haldwani');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [gmailUrl, setGmailUrl] = useState('');
  const [mailtoUrl, setMailtoUrl] = useState('');

  const [form, setForm] = useState({ name: '', email: '', phone: '', license: '' });
  const [errors, setErrors] = useState<FormErrors>({});

  const rental = calculateRentalPrice(scooter, pickupDate, pickupTime, returnDate, returnTime);
  const total = rental.total;

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = 'Full name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Valid email is required';
    if (!form.phone.match(/^[+\d\s-]{10,}$/)) newErrors.phone = 'Valid phone number is required';
    if (!form.license.trim()) newErrors.license = 'Driving license number is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = async () => {
    if (!validate()) {
      toast.error('Please fill all required fields correctly');
      return;
    }
    setIsLoading(true);

    const id = generateBookingId();
    setBookingId(id);

    // 1. Build WhatsApp message text for owner at 9286535286
    const waText = `*NEW BOOKING - REHAN BIKE RENTAL*
━━━━━━━━━━━━━━━━━━━
*Booking ID:* #${id}
*Vehicle:* ${scooter.name}

*Customer Details:*
• *Name:* ${form.name}
• *Phone:* ${form.phone}
• *Email:* ${form.email}
• *License No:* ${form.license}

*Rental Schedule:*
• *Shop & Pickup:* ${location}
• *From:* ${pickupDate} at ${pickupTime}
• *To:* ${returnDate} at ${returnTime}
• *Total Rent:* ₹${total}

*Shop:* ${SITE_CONFIG.address}
━━━━━━━━━━━━━━━━━━━`;

    const waLink = `https://api.whatsapp.com/send?phone=919286535286&text=${encodeURIComponent(waText)}`;
    setWhatsappUrl(waLink);

    // 2. Build Gmail direct compose link and Mailto link for owner at Ra1899490@gmail.com
    const mailSubject = `New Scooter Booking #${id} - ${form.name} (${scooter.name})`;
    const mailBody = `NEW BOOKING - REHAN BIKE RENTAL
=============================================
Booking ID: #${id}
Vehicle: ${scooter.name}

CUSTOMER DETAILS:
- Name: ${form.name}
- Phone: ${form.phone}
- Email: ${form.email}
- Driving License: ${form.license}

RENTAL SCHEDULE:
- Pickup & Return: ${location}
- From: ${pickupDate} at ${pickupTime}
- To: ${returnDate} at ${returnTime}
- Total Price: ₹${total}

SHOP LOCATION:
${SITE_CONFIG.address}
Owner Phone: 9286535286
=============================================`;

    const gWebLink = `https://mail.google.com/mail/?view=cm&fs=1&to=Ra1899490@gmail.com&su=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
    const mLink = `mailto:Ra1899490@gmail.com?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
    setGmailUrl(gWebLink);
    setMailtoUrl(mLink);

    // 3. Send notification to local API route
    try {
      await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: id,
          scooterName: scooter.name,
          customerName: form.name,
          customerPhone: form.phone,
          customerEmail: form.email,
          licenseNumber: form.license,
          pickupLocation: location,
          pickupDate,
          pickupTime,
          returnDate,
          returnTime,
          totalPrice: total,
        }),
      });
    } catch (e) {
      console.error('API notification dispatch error:', e);
    }

    // 4. AUTOMATICALLY trigger WhatsApp and Gmail simultaneously with ONE tap
    if (typeof window !== 'undefined') {
      // Open WhatsApp to owner in new window/app
      window.open(waLink, '_blank');

      // Trigger Gmail compose to owner
      setTimeout(() => {
        window.open(gWebLink, '_blank') || (window.location.href = mLink);
      }, 500);
    }

    setIsConfirmed(true);
    setIsLoading(false);
    toast.success('Booking confirmed! Details sent to WhatsApp & Gmail 🎉');
  };

  if (isConfirmed) {
    return (
      <div className="pt-24 min-h-screen bg-[#F1F4F6] flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-10 max-w-lg w-full text-center shadow-xl">
          <div className="mb-4 flex justify-center">
            <Image
              src="/images/logo.png"
              alt="Rehan Bike Rental"
              width={220}
              height={55}
              className="h-11 w-auto object-contain"
            />
          </div>
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#12334A] mb-1">Booking Confirmed!</h1>
          <p className="text-gray-500 text-sm mb-5">
            Your <span className="font-semibold text-[#12334A]">{scooter.name}</span> has been booked with <span className="font-semibold text-orange-600">{SITE_CONFIG.name}</span>.
          </p>

          {/* Booking ID */}
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-3.5 mb-5">
            <p className="text-xs text-gray-500 mb-0.5">Booking ID</p>
            <p className="text-xl font-extrabold text-orange-500">#{bookingId}</p>
          </div>

          {/* Automated notification status confirmation badges */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-5 text-left text-xs space-y-2.5">
            <p className="font-bold text-emerald-900 text-xs uppercase tracking-wider mb-1">
              ✅ Automatically Sent to Owner:
            </p>
            <div className="flex items-center gap-2 text-emerald-800 font-semibold">
              <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>WhatsApp: <strong>+91 9286535286</strong> (Message sent)</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-800 font-semibold">
              <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Gmail: <strong>Ra1899490@gmail.com</strong> (Email sent)</span>
            </div>
          </div>

          {/* Customer details summary */}
          <div className="text-sm text-gray-600 space-y-2 mb-6 text-left bg-gray-50 rounded-2xl p-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Customer Details Sent</p>
            <div className="flex justify-between"><span>Name</span><span className="font-semibold text-[#12334A]">{form.name}</span></div>
            <div className="flex justify-between"><span>Phone</span><span className="font-semibold text-[#12334A]">{form.phone}</span></div>
            <div className="flex justify-between"><span>Email</span><span className="font-semibold text-[#12334A]">{form.email}</span></div>
            <div className="flex justify-between"><span>Driving License</span><span className="font-mono font-semibold text-[#12334A]">{form.license}</span></div>
            <div className="pt-2 border-t border-gray-200 mt-2 flex justify-between"><span>Pickup</span><span className="font-medium text-[#12334A]">{pickupDate} at {pickupTime}</span></div>
            <div className="flex justify-between"><span>Return</span><span className="font-medium text-[#12334A]">{returnDate} at {returnTime}</span></div>
            <div className="flex justify-between"><span>Shop Location</span><span className="font-medium text-[#12334A]">{SITE_CONFIG.address}</span></div>
            <div className="flex justify-between pt-2 border-t border-gray-200 mt-1"><span className="font-bold text-[#12334A]">Total Rent</span><span className="font-extrabold text-orange-500 text-base">{formatPrice(total)}</span></div>
          </div>

          {/* Backup Action Buttons */}
          <div className="space-y-2 mb-6">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-md text-sm"
            >
              <MessageSquare className="w-4 h-4" />
              Re-open WhatsApp (+91 9286535286)
            </a>
            <a
              href={gmailUrl || mailtoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#12334A] hover:bg-[#0e2a3d] text-white font-semibold rounded-xl transition-all shadow-sm text-sm"
            >
              <Mail className="w-4 h-4 text-orange-400" />
              Re-open Gmail (Ra1899490@gmail.com)
            </a>
          </div>

          <div className="flex gap-3">
            <Link href="/" className="flex-1 py-2.5 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors text-sm">Return Home</Link>
            <Link href="/fleet" className="flex-1 py-2.5 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors text-sm">Browse Fleet</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-[#F1F4F6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link href={`/fleet/${scooter.id}`} className="text-gray-400 hover:text-gray-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-[#12334A]">Complete Your Booking</h1>
            <p className="text-gray-500 text-sm">One tap sends your reservation directly to the owner via WhatsApp & Gmail.</p>
          </div>
        </div>

        {/* Quick Phone Booking Callout */}
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 bg-orange-500 text-white rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-[#12334A] text-sm">Automated Instant Reservation</p>
              <p className="text-xs text-gray-600">
                Tapping the confirm button sends your complete booking info directly to WhatsApp: <strong>9286535286</strong> and Gmail: <strong>Ra1899490@gmail.com</strong>.
              </p>
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <a
              href="https://wa.me/919286535286"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              WhatsApp 9286535286
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Scooter Selection Display */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="font-bold text-[#12334A] mb-4 text-sm uppercase tracking-wider">Selected Scooter</h2>
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-16 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={scooter.image} alt={scooter.name} fill className="object-contain p-2" />
                </div>
                <div>
                  <p className="font-bold text-[#12334A]">{scooter.name}</p>
                  <p className="text-sm text-orange-500 font-semibold">{formatPrice(scooter.pricePerDay)}/day</p>
                </div>
              </div>
            </div>

            {/* Rental Details */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="font-bold text-[#12334A] mb-4 text-sm uppercase tracking-wider">Rental Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Single Shop Location */}
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-gray-500 block mb-2">
                    <MapPin className="w-3.5 h-3.5 inline mr-1 text-orange-500" />
                    Pickup & Return Shop Location
                  </label>
                  <div className="w-full px-4 py-3 border border-orange-200 bg-orange-50/50 rounded-xl text-sm font-semibold text-[#12334A] flex items-center justify-between">
                    <span>{SITE_CONFIG.address}</span>
                    <span className="text-xs bg-orange-100 text-orange-700 px-2.5 py-1 rounded-full font-bold">Main Shop</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-2"><Calendar className="w-3.5 h-3.5 inline mr-1" />Pickup Date</label>
                  <input type="date" value={pickupDate} min={today} onChange={(e) => setPickupDate(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-2"><Clock className="w-3.5 h-3.5 inline mr-1" />Pickup Time</label>
                  <input type="time" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-2"><Calendar className="w-3.5 h-3.5 inline mr-1" />Return Date</label>
                  <input type="date" value={returnDate} min={pickupDate} onChange={(e) => setReturnDate(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-2"><Clock className="w-3.5 h-3.5 inline mr-1" />Return Time</label>
                  <input type="time" value={returnTime} onChange={(e) => setReturnTime(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50" />
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="font-bold text-[#12334A] mb-1 text-sm uppercase tracking-wider">Your Information</h2>
              <p className="text-xs text-gray-400 mb-4">This information will be dispatched automatically to the shop owner.</p>
              <div className="space-y-4">
                {[
                  { id: 'name', label: 'Full Name', icon: User, type: 'text', placeholder: 'Enter your full name', field: 'name' as const },
                  { id: 'email', label: 'Email Address', icon: Mail, type: 'email', placeholder: 'your.email@example.com', field: 'email' as const },
                  { id: 'phone', label: 'Phone Number', icon: Phone, type: 'tel', placeholder: '+91 98765 43210', field: 'phone' as const },
                  { id: 'license', label: 'Driving License Number', icon: FileText, type: 'text', placeholder: 'UK04 20210012345', field: 'license' as const },
                ].map((field) => (
                  <div key={field.id}>
                    <label htmlFor={field.id} className="text-xs font-semibold text-gray-600 block mb-2">
                      <field.icon className="w-3.5 h-3.5 inline mr-1 text-orange-500" />
                      {field.label} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.field]}
                      onChange={(e) => {
                        setForm((f) => ({ ...f, [field.field]: e.target.value }));
                        if (errors[field.field]) setErrors((er) => ({ ...er, [field.field]: undefined }));
                      }}
                      className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition-colors ${
                        errors[field.field] ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'
                      }`}
                    />
                    {errors[field.field] && <p className="text-xs text-red-500 mt-1">{errors[field.field]}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm sticky top-24">
              <h2 className="font-bold text-[#12334A] mb-5">Order Summary</h2>

              {/* Scooter */}
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 mb-4">
                <div className="w-16 h-12 bg-gray-50 rounded-xl flex-shrink-0 relative overflow-hidden">
                  <Image src={scooter.image} alt={scooter.name} fill className="object-contain p-1" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-[#12334A]">{scooter.name}</p>
                  <p className="text-xs text-gray-400">
                    {rental.days} {rental.days === 1 ? 'day' : 'days'} rental
                  </p>
                </div>
              </div>

              {/* Breakdown */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    {formatPrice(scooter.pricePerDay)} × {rental.days} {rental.days === 1 ? 'day' : 'days'}
                  </span>
                  <span className="font-medium text-[#12334A]">{formatPrice(rental.total)}</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 flex justify-between mb-6">
                <span className="font-bold text-[#12334A]">Total Rent</span>
                <span className="font-extrabold text-orange-500 text-xl">{formatPrice(total)}</span>
              </div>

              {/* Automated Dispatch Promise Notice */}
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-3.5 mb-5 space-y-1.5 text-xs text-gray-700">
                <p className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  1-Tap Automated Sending:
                </p>
                <p className="text-emerald-800 leading-relaxed text-[11px]">
                  Tapping the button below sends your details straight to the owner on <strong>WhatsApp (9286535286)</strong> and <strong>Gmail (Ra1899490@gmail.com)</strong>.
                </p>
              </div>

              {/* Trust Badges */}
              <div className="bg-gray-50 rounded-xl p-3 mb-5 space-y-2">
                {[
                  `Shop: ${SITE_CONFIG.address}`,
                  'Helmet included with every ride',
                  'Free cancellation up to 24h before',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-gray-600">
                    <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              {/* THE ONE CONFIRMATION BUTTON */}
              <button
                onClick={handleConfirm}
                disabled={isLoading}
                className="w-full py-4 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base"
                id="confirm-booking-btn"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" stroke="currentColor" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Confirming & Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Confirm & Book Now
                  </>
                )}
              </button>

              {/* Support note */}
              <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-500 mb-1">Direct Owner Assistance:</p>
                <div className="flex justify-center gap-3 text-xs font-bold text-orange-600">
                  <a href={`tel:${SITE_CONFIG.phones[0]}`} className="hover:underline">
                    📞 {SITE_CONFIG.phones[0]}
                  </a>
                  <span>|</span>
                  <a href={`tel:${SITE_CONFIG.phones[1]}`} className="hover:underline">
                    📞 {SITE_CONFIG.phones[1]}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="pt-24 min-h-screen bg-[#F1F4F6] flex items-center justify-center"><div className="text-gray-500">Loading booking...</div></div>}>
      <BookingContent />
    </Suspense>
  );
}
