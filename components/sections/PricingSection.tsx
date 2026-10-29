import Link from 'next/link';
import { Check, Zap } from 'lucide-react';
import { PRICING_PLANS } from '@/lib/data';
import { formatPrice } from '@/lib/utils';

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-[#0B1119] py-20 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-orange-400/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-orange-400 bg-orange-950/40 border border-orange-500/30 px-4 py-2 rounded-full mb-4 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight">
            Simple, Transparent Daily Pricing
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-xl mx-auto font-medium">
            No hidden charges. No surprise fees. Just the ride you want at the flat price you expect.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-8 sm:p-9 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                plan.popular
                  ? 'bg-gradient-to-b from-[#12334A] to-[#0a1e2d] border-2 border-orange-400 text-white shadow-2xl shadow-orange-950/40 md:scale-105 z-10'
                  : 'bg-[#0D1520] border border-white/10 hover:border-orange-500/40 shadow-2xl text-white'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg shadow-orange-500/40 tracking-wide uppercase animate-bounce-subtle">
                    <Zap className="w-3.5 h-3.5 fill-current animate-pulse" />
                    Best for Nainital Hill Trips
                  </div>
                </div>
              )}

              <div className="mb-7">
                <h3
                  className={`text-xs font-extrabold uppercase tracking-widest mb-3 ${
                    plan.popular ? 'text-amber-300' : 'text-orange-400'
                  }`}
                >
                  {plan.label}
                </h3>
                <div className="flex items-baseline gap-1 mb-1.5">
                  <span
                    className={`text-4xl sm:text-5xl font-black tracking-tight ${
                      plan.popular ? 'text-white' : 'text-amber-300'
                    }`}
                  >
                    {formatPrice(plan.priceFrom)}
                  </span>
                  <span className={`text-sm font-bold ${plan.popular ? 'text-gray-300' : 'text-gray-400'}`}>
                    {plan.unit}
                  </span>
                </div>
                <p className={`text-xs ${plan.popular ? 'text-gray-300' : 'text-gray-400'}`}>
                  Flat daily pricing · Zero surprise fees
                </p>
              </div>

              <ul className="space-y-3.5 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        plan.popular ? 'bg-orange-500/30 text-amber-300' : 'bg-emerald-950/80 border border-emerald-500/30 text-emerald-400'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className={`text-xs sm:text-sm font-medium leading-relaxed ${plan.popular ? 'text-gray-200' : 'text-gray-300'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/fleet"
                className={`w-full py-3.5 text-center font-extrabold rounded-2xl transition-all duration-300 text-sm ${
                  plan.popular
                    ? 'shimmer-btn bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02]'
                    : 'shimmer-btn bg-slate-800/90 hover:bg-slate-700 text-white border border-white/10 hover:scale-[1.01]'
                }`}
              >
                View Included Vehicles ➔
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
