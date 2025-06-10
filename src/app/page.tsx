import { LandingLayout } from '@/components/landing/landing-layout';
import {
  HeroSection,
  FeaturesSection,
  CTASection,
} from '@/components/landing/hero-section';

export default function Home() {
  return (
    <LandingLayout>
      <HeroSection />
      <FeaturesSection />
      <CTASection />
    </LandingLayout>
  );
}
