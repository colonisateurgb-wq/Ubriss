import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { FeatureGrid } from "@/components/landing/feature-grid";
import { PricingTable } from "@/components/landing/pricing-table";
import { Footer } from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-ink-950">
      <Navbar />
      <Hero />
      <FeatureGrid />
      <PricingTable />
      <Footer />
    </main>
  );
}
