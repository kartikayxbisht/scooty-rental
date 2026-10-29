import { ShieldCheck, Clock, Truck, Headphones, PhoneCall } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/data';

const features = [
  {
    icon: ShieldCheck,
    title: 'Hill-Tested Fleet',
    tag: 'Mountain Ready',
    description:
      'Every scooter is mechanically serviced and tested specifically for hill climbs towards Nainital, Bhimtal, and Ranikhet.',
    color: 'bg-blue-50 text-blue-600',
    tagColor: 'bg-blue-50 text-blue-700 border-blue-200',
    hoverBorder: 'hover:border-blue-300',
  },
  {
    icon: Clock,
    title: 'Flat Per-Day Pricing',
    tag: '₹500 / day',
    description:
      'Clean flat daily pricing starting at ₹500/day. Zero hidden fees or hourly complications — rent for as many days as you need.',
    color: 'bg-orange-50 text-orange-600',
    tagColor: 'bg-orange-50 text-orange-700 border-orange-200',
    hoverBorder: 'hover:border-orange-300',
  },
  {
    icon: Truck,
    title: 'Station & Doorstep Pickup',
    tag: 'Kathgodam Rly Stn',
    description:
      'Arriving at Kathgodam or Haldwani Railway Station? We deliver the scooter right to your arrival spot on time.',
    color: 'bg-emerald-50 text-emerald-600',
    tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    hoverBorder: 'hover:border-emerald-300',
  },
  {
    icon: PhoneCall,
    title: 'Direct Owner Helplines',
    tag: 'Instant Assistance',
    description:
      `Direct telephone support with local guidance. Just call ${SITE_CONFIG.phones[0]} or ${SITE_CONFIG.phones[1]} anytime.`,
    color: 'bg-purple-50 text-purple-600',
    tagColor: 'bg-purple-50 text-purple-700 border-purple-200',
    hoverBorder: 'hover:border-purple-300',
  },
];

export default function WhyRidezy() {
  return (
    <section className="bg-[#080D14] py-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-orange-400 bg-orange-950/40 border border-orange-500/30 px-4 py-2 rounded-full mb-4 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            The Rehan Advantage
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight">
            The Smarter Way to Ride in Haldwani
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-xl mx-auto font-medium">
            We&apos;ve built {SITE_CONFIG.name} around what hill travelers and local riders need — reliability, steep hill performance, and personal direct service.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`bg-[#0D1520] rounded-3xl border border-white/10 p-7 card-luxury-hover vehicle-card-glow ${feature.hoverBorder} group relative flex flex-col`}
            >
              <div className="flex items-center justify-between mb-5">
                <div className={`w-13 h-13 ${feature.color} rounded-2xl flex items-center justify-center group-hover:scale-115 group-hover:rotate-3 transition-transform duration-300 shadow-sm p-3`}>
                  <feature.icon className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${feature.tagColor} transition-transform group-hover:scale-105`}>
                  {feature.tag}
                </span>
              </div>
              <h3 className="font-extrabold text-white text-lg mb-2 group-hover:text-orange-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed font-normal">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
