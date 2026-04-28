'use client';

import { Award } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function LegacySection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-amber-50 via-amber-50/50 to-amber-50 px-6 py-24">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />
      </div>

      {/* Handloom pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0 bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B4513' fill-opacity='0.5'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl text-center">
        <div
          className={`transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-[#8B4513]/10 px-6 py-2">
            <Award className="h-5 w-5 text-[#8B4513]" />
            <span className="font-mono text-sm font-semibold tracking-wider text-[#8B4513] uppercase">
              A Century of Craftsmanship
            </span>
          </div>

          <h2 className="mb-6 font-serif text-4xl font-bold text-[#8B4513] md:text-5xl lg:text-6xl">
            Our Legacy Since 1924
          </h2>

          <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-gray-700">
            <p>
              Handloom Villa is built upon a foundation of experience and trust that spans more than
              a century. Since 1924, our family has actively contributed to the growth and
              excellence of the handloom industry.
            </p>
            <p>
              This legacy has been shaped by generations of skilled craftsmen who have devoted their
              lives to mastering the art of weaving. Today, we proudly continue this tradition by
              blending time-honored techniques with modern quality standards.
            </p>
            <p className="font-semibold text-[#8B4513]">
              Our mission is to deliver products that embody the spirit of Sri Lankan culture while
              meeting the expectations of contemporary customers around the world.
            </p>
          </div>

          {/* Timeline Decoration */}
          <div className="mt-12 flex justify-center gap-2">
            {[1924, 1950, 1980, 2000, 2024].map((year, idx) => (
              <div key={idx} className="text-center">
                <div className="h-2 w-12 rounded-full bg-[#8B4513]/20" />
                <p className="mt-2 text-xs text-gray-500">{year}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
