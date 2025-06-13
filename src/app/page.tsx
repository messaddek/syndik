import { LandingLayout } from '@/components/landing/landing-layout';
import {
  HeroSection,
  FeaturesSection,
  CTASection,
  StatsSection,
  TestimonialsSection,
  HowItWorksSection,
  BenefitsSection,
  SecuritySection,
  PricingPreviewSection,
} from '@/components/landing/hero-section';

export default function Home() {
  return (
    <LandingLayout>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <BenefitsSection />
      <SecuritySection />
      <TestimonialsSection />
      <PricingPreviewSection />
      <CTASection />
    </LandingLayout>
  );
}
