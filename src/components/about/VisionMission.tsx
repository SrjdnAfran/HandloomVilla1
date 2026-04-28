'use client';

import { Eye, Target, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function VisionMission() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="container mx-auto max-w-5xl px-6 py-20 md:py-28">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Vision Card */}
        <div
          className={`group relative transform overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/50 p-10 text-center transition-all duration-300 hover:shadow-2xl ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
        >
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
          <div className="relative">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-amber-600 shadow-lg">
              <Eye className="h-10 w-10 text-white" />
            </div>
            <h3 className="mb-4 font-serif text-2xl font-bold text-[#8B4513]">Our Vision</h3>
            <p className="leading-relaxed text-gray-700">
              To preserve and promote the rich heritage of handloom craftsmanship while delivering
              premium-quality products to customers worldwide.
            </p>
            <div className="mt-6 inline-flex items-center gap-1 text-sm text-[#8B4513]/60">
              <span>Preserving heritage</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Mission Card */}
        <div
          className={`group relative transform overflow-hidden rounded-2xl bg-gradient-to-br from-[#8B4513]/5 to-[#D2691E]/10 p-10 text-center transition-all duration-300 hover:shadow-2xl ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
        >
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
          <div className="relative">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-[#8B4513] to-[#D2691E] shadow-lg">
              <Target className="h-10 w-10 text-white" />
            </div>
            <h3 className="mb-4 font-serif text-2xl font-bold text-[#8B4513]">Our Mission</h3>
            <p className="leading-relaxed text-gray-700">
              To empower local artisans, uphold traditional weaving techniques, and provide
              sustainable, high-quality textiles that reflect elegance, durability, and cultural
              pride.
            </p>
            <div className="mt-6 inline-flex items-center gap-1 text-sm text-[#8B4513]/60">
              <span>Empowering artisans</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative element */}
      <div className="mt-12 flex justify-center">
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#8B4513]/30 to-transparent" />
      </div>
    </section>
  );
}
