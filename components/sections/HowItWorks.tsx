import { Search, Clock, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Choose your ride',
    description:
      'Browse our 10 hill-tested scooters & Royal Enfield bikes. Filter by scooty (₹500/d), Hunter, Classic, or Himalayan.',
    color: 'bg-gradient-to-r from-orange-500 to-amber-500',
    lightColor: 'bg-orange-50',
    textColor: 'text-orange-500',
    ringColor: 'ring-orange-400/40',
  },
  {
    number: '02',
    icon: Clock,
    title: 'Pick your dates',
    description:
      'Choose your travel dates. All vehicles feature flat, transparent per-day pricing with zero hidden charges.',
    color: 'bg-gradient-to-r from-[#12334A] to-[#1e4a68]',
    lightColor: 'bg-blue-50',
    textColor: 'text-[#12334A]',
    ringColor: 'ring-blue-400/40',
  },
  {
    number: '03',
    icon: CheckCircle2,
    title: '1-Tap Book & Ride',
    description:
      'Tap Confirm — instant dispatch to owner WhatsApp & Gmail. Collect at Kathgodam Calltax HP Pump or Railway Station!',
    color: 'bg-gradient-to-r from-emerald-500 to-teal-500',
    lightColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    ringColor: 'ring-emerald-400/40',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-24 relative overflow-hidden">
      {/* Subtle ambient blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-orange-400/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-orange-600 bg-orange-50 border border-orange-200/80 px-4 py-2 rounded-full mb-4 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            Seamless Experience
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#12334A] tracking-tight">
            Rent a Bike in{' '}
            <span className="text-gradient-animated">3 Simple Steps</span>
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto mt-4 font-medium">
            No endless paperwork or complex deposits. Just pick, confirm with 1 tap, and explore Uttarakhand.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Animated Glowing Connector line (desktop) */}
          <div className="hidden lg:block absolute top-14 left-[20%] right-[20%] h-1 bg-gradient-to-r from-orange-400 via-blue-400 to-emerald-400 rounded-full opacity-30" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, i) => (
              <div
                key={i}
                className="bg-[#F9FBFC] rounded-3xl border border-gray-100 p-8 text-center group card-luxury-hover flex flex-col items-center relative"
              >
                {/* Floating Glow Halo */}
                <div className="relative mb-6">
                  <div
                    className={`w-24 h-24 ${step.lightColor} rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md group-hover:shadow-xl`}
                  >
                    <step.icon className={`w-10 h-10 ${step.textColor}`} />
                    <div
                      className={`absolute -top-2.5 -right-2.5 w-9 h-9 ${step.color} rounded-full flex items-center justify-center shadow-lg ring-4 ${step.ringColor} animate-bounce-subtle`}
                    >
                      <span className="text-white text-xs font-black">{step.number}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-black text-[#12334A] mb-3 group-hover:text-orange-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm max-w-xs mx-auto font-normal">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
