'use client';

import Link from 'next/link';
import { Quote, ChevronRight, Truck, Shield, RefreshCw, Gem } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AboutCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const trustBadges = [
    { icon: Truck, text: 'Free Shipping Worldwide' },
    { icon: Shield, text: 'Authenticity Guaranteed' },
    { icon: RefreshCw, text: '30-Day Easy Returns' },
    { icon: Gem, text: 'Premium Handloom Quality' },
  ];

  return (
    <section className="relative overflow-hidden px-6 py-28 text-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-amber-50/20 to-white" />

      {/* Decorative circles */}
      <div className="absolute top-20 left-10 h-32 w-32 rounded-full bg-amber-200/30 blur-2xl" />
      <div className="absolute right-10 bottom-20 h-40 w-40 rounded-full bg-amber-300/20 blur-2xl" />

      <div
        className={`relative mx-auto max-w-4xl transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        {/* Quote Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-amber-100 px-6 py-3 shadow-md">
          <Quote className="h-5 w-5 text-amber-600" />
          <span className="text-sm font-medium text-amber-700 uppercase">Our Promise to You</span>
        </div>

        {/* Main Heading */}
        <h2 className="mb-6 font-serif text-4xl font-bold text-[#8B4513] md:text-5xl lg:text-6xl">
          Experience the Art of{' '}
          <span className="relative inline-block">
            True Craftsmanship
            <svg
              className="absolute -bottom-2 left-0 w-full"
              height="4"
              viewBox="0 0 200 4"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 2 L200 2" stroke="#D2691E" strokeWidth="2" strokeDasharray="4 4" />
            </svg>
          </span>
        </h2>

        {/* Description */}
        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-700">
          At Handloom Villa, every thread tells a story, every design reflects heritage, and every
          product embodies excellence. When you choose us, you are not just purchasing a textile —
          you are embracing a legacy of tradition, supporting skilled artisans, and celebrating the
          beauty of authentic Sri Lankan craftsmanship.
        </p>

        {/* Divider */}
        <div className="my-10 flex justify-center">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#8B4513] to-transparent" />
        </div>

        {/* Quote */}
        <p className="font-serif text-2xl text-[#8B4513] italic md:text-3xl lg:text-4xl">
          "Handloom Villa — Where Tradition Meets Timeless Elegance."
        </p>

        {/* CTA Button */}
        <div className="mt-12">
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#8B4513] to-[#D2691E] px-8 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:gap-3 hover:shadow-xl hover:brightness-110"
          >
            Discover Our Collection
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-6">
          {trustBadges.map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <badge.icon className="h-4 w-4 text-[#8B4513]" />
              <span className="text-sm text-gray-600">{badge.text}</span>
            </div>
          ))}
        </div>

        {/* Small Print */}
        <p className="mt-8 text-xs text-gray-400">
          Join thousands of happy customers who trust Handloom Villa for authentic handloom products
        </p>
      </div>

      {/* Animated bottom border */}
      <div className="absolute right-0 bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#8B4513]/50 to-transparent" />
    </section>
  );
}
