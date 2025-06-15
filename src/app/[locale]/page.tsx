import {
  LandingLayout,
  HeroSection,
  FeaturesSection,
  CTASection,
  StatsSection,
  TestimonialsSection,
  HowItWorksSection,
  BenefitsSection,
  SecuritySection,
  PricingPreviewSection,
} from '@/components/landing';

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
