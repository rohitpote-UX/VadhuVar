import { Hero } from "@/components/public/Hero";
import { HowItWorks } from "@/components/public/HowItWorks";
import { PrivacyPromise } from "@/components/public/PrivacyPromise";
import { WhyChooseUs } from "@/components/public/WhyChooseUs";
import { FinalCTA } from "@/components/public/FinalCTA";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <PrivacyPromise />
      <WhyChooseUs />
      <FinalCTA />
    </>
  );
}
