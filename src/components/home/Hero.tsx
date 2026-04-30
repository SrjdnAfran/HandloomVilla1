'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Shield, Truck, RefreshCw } from 'lucide-react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-linear-to-br from-[#FFF8F0] via-white to-[#FFF0E0]">
      {/* Background Pattern */}
      <div className="handloom-pattern absolute inset-0 opacity-30" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div
            className={`transform text-center transition-all duration-1000 lg:text-left ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#8B4513]/10 px-4 py-2">
              <span className="text-sm font-medium text-[#8B4513]">Handcrafted Excellence</span>
            </div>

            <h1 className="mb-6 font-serif text-4xl leading-tight font-bold text-gray-900 sm:text-5xl lg:text-7xl">
              Timeless Artistry,
              <span className="mt-2 block text-[#8B4513]">Woven for You</span>
            </h1>

            <p className="mx-auto mb-8 max-w-xl text-lg text-gray-600 lg:mx-0">
              Discover authentic handloom sarees, kurtis, and more from Sri Lanka&apos;s finest
              artisans.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <Link
                href="/shop"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[#8B4513] px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#5C2E0B]"
              >
                Explore Collection
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-lg border border-[#8B4513]/20 bg-white px-8 py-4 font-semibold text-[#8B4513] shadow-md transition-all duration-300 hover:shadow-xl"
              >
                Our Story
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 flex flex-wrap justify-center gap-6 pt-4 lg:justify-start">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-[#8B4513]" />
                <span className="text-sm text-gray-600">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-[#8B4513]" />
                <span className="text-sm text-gray-600">Authentic Handloom</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-[#8B4513]" />
                <span className="text-sm text-gray-600">Easy Returns</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div
            className={`relative transform transition-all delay-300 duration-1000 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <div className="absolute inset-0 z-10 rounded-2xl bg-linear-to-tr from-[#8B4513]/20 to-transparent" />
              <Image
                src="/images/hero/saree-hero.jpg"
                alt="Handloom Saree Collection"
                width={600}
                height={600}
                className="h-auto w-full rounded-2xl object-cover"
                priority
              />
              {/* Floating Badge */}
              <div className="absolute top-8 right-8 z-20 hidden rounded-xl bg-white/95 px-4 py-2 shadow-lg backdrop-blur-sm sm:block">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span className="text-sm font-semibold text-gray-800">4.9 ★ (2k+ reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
