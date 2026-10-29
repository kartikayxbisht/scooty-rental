import { Star, Quote } from 'lucide-react';
import { REVIEWS } from '@/lib/data';

const avatarColors = [
  'bg-orange-100 text-orange-600',
  'bg-blue-100 text-blue-600',
  'bg-green-100 text-green-600',
  'bg-purple-100 text-purple-600',
];

export default function ReviewsSection() {
  return (
    <section id="reviews" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-block text-xs font-bold uppercase tracking-widest text-orange-500 bg-orange-50 border border-orange-100 px-4 py-2 rounded-full mb-4">
            Reviews
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12334A] mb-4">
            What riders are saying
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-gray-600 font-medium text-sm">4.9 average from 2,400+ rides</span>
          </div>
        </div>

        {/* Review Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((review, i) => (
            <div
              key={review.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 hover:border-orange-200 hover:shadow-xl hover:shadow-slate-900/5 hover:-translate-y-1.5 transition-all duration-300 flex flex-col relative"
            >
              {/* Header with Quote & Rating */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                  ✓ Verified Rider
                </span>
              </div>

              {/* Comment */}
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-5 flex-1 font-medium">
                &ldquo;{review.comment}&rdquo;
              </p>

              {/* Vehicle Pill */}
              {review.scooterName && (
                <div className="inline-flex items-center gap-1.5 text-xs text-orange-700 bg-orange-50 font-bold px-3 py-1 rounded-xl mb-4 border border-orange-200/60 w-fit">
                  <span>🛵 {review.scooterName}</span>
                  <span className="text-orange-300">·</span>
                  <span className="text-[11px] text-gray-500 font-normal">{review.rentalDuration}</span>
                </div>
              )}

              {/* User info */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm flex-shrink-0 shadow-xs ${avatarColors[i % avatarColors.length]}`}
                >
                  {review.userName.charAt(0)}
                </div>
                <div>
                  <p className="font-extrabold text-sm text-[#12334A] leading-tight">{review.userName}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Nainital Hill Traveler</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
