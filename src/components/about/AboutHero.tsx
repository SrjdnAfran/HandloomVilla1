'use client';

import { Clock, Sparkles } from 'lucide-react';

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-[#5C2E0B] via-[#8B4513] to-[#D2691E] px-6 py-28 text-white md:py-36">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 animate-pulse rounded-full bg-amber-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 animate-pulse rounded-full bg-orange-500/20 blur-3xl delay-1000" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium tracking-wide">Est. 1924</span>
            <Sparkles className="ml-1 h-4 w-4" />
          </div>
          <h1 className="mb-6 font-serif text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            A Legacy Woven with
            <span className="mt-2 block text-amber-300">Tradition & Excellence</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg font-light text-amber-100 md:text-xl">
            For over a century, we have transformed threads into masterpieces — bringing the soul of
            Maruthamunai&apos;s handloom heritage to the world.
          </p>
        </div>
      </div>
    </section>
  );
}
