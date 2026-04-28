'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Lazy load non-critical components
const FeaturedProducts = dynamic(() => import('@/components/home/FeaturedProducts'), {
  loading: () => (
    <div className="grid grid-cols-1 gap-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="mb-4 h-64 rounded-2xl bg-gray-200" />
          <div className="mb-2 h-4 w-3/4 rounded bg-gray-200" />
          <div className="h-4 w-1/2 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  ),
});

const WhyChooseUs = dynamic(() => import('@/components/home/WhyChooseUs'), {
  loading: () => (
    <div className="grid grid-cols-1 gap-8 py-16 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="animate-pulse text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gray-200" />
          <div className="mx-auto mb-2 h-4 w-3/4 rounded bg-gray-200" />
          <div className="mx-auto h-3 w-1/2 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  ),
});

const BlogTeaser = dynamic(() => import('@/components/home/BlogTeaser'), {
  loading: () => (
    <div className="grid grid-cols-1 gap-6 py-16 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="mb-4 h-48 rounded-2xl bg-gray-200" />
          <div className="mb-2 h-4 w-3/4 rounded bg-gray-200" />
          <div className="h-3 w-1/2 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  ),
});

export { FeaturedProducts, WhyChooseUs, BlogTeaser };
