import HeroSection from '@/components/sections/HeroSection';
import FleetSection from '@/components/sections/FleetSection';
import HowItWorks from '@/components/sections/HowItWorks';
import WhyRidezy from '@/components/sections/WhyRidezy';
import PricingSection from '@/components/sections/PricingSection';
import LocationsSection from '@/components/sections/LocationsSection';
import ReviewsSection from '@/components/sections/ReviewsSection';
import CTASection from '@/components/sections/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FleetSection />
      <HowItWorks />
      <WhyRidezy />
      <PricingSection />
      <LocationsSection />
      <ReviewsSection />
      <CTASection />
    </>
  );
}
