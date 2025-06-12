"use client";

import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();
  return (
    <section className="bg-gray-50 py-20  px-4 sm:px-6 lg:px-8 ">
      <div className=" max-w-7xl mx-auto md:flex items-center justify-between gap-10">
        <div className="max-w-xl ">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            Elevate Your Everyday Look.
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Premium basics made with quality fabric, tailored for modern living.
          </p>
          <button
            onClick={() => router.push("/shop")}
            className="mt-6 px-6 py-3 bg-black text-white rounded-xl transition hover:bg-gray-800 hover:cursor-pointer"
          >
            Shop Now
          </button>
        </div>
        <div className=" hidden lg:flex items-center gap-4">
          <img
            src="/images/heroSection.jpg"
            alt="Hero Model"
            className="h-[400px] w-auto rounded-xl shadow-sm"
          />
          <img
            src="/images/heroSection.jpg"
            alt="Hero Model"
            className="h-[360px] w-auto rounded-xl shadow-md opacity-90"
          />
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
