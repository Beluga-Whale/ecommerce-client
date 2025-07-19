"use client";

import HeroSection from "@/components/HeroSection";
import NewArrivals from "@/components/NewArrivals";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <NewArrivals />
      <section className="py-10 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">What Makes Us Different</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div>
              <h3 className="font-semibold text-lg mb-2">Oversized Fit</h3>
              <p className="text-gray-600">
                Loose and comfy, tailored for every body.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Earth-Tone Palette</h3>
              <p className="text-gray-600">
                Inspired by nature, made for everyday.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Premium Fabrics</h3>
              <p className="text-gray-600">
                Soft-touch cotton, lasting quality.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
