'use client';

import { Suspense, lazy } from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import CategoryCards from '@/components/home/CategoryCards';
import Footer from '@/components/layout/Footer';
import StatsSection from '@/components/ui/StatsSection';
import LazySection from '@/components/ui/LazySection';
import { Loader2 } from 'lucide-react';

// Lazy import heavy components
const FeaturedProducts = lazy(() => import('@/components/home/FeaturedProducts'));
const WhyChooseUs = lazy(() => import('@/components/home/WhyChooseUs'));
const BlogTeaser = lazy(() => import('@/components/home/BlogTeaser'));

const homepageStats = [
  { value: 100, suffix: '+', label: 'Skilled Artisans', iconName: 'Users' as const },
  { value: 50000, suffix: '+', label: 'Happy Customers', iconName: 'Heart' as const },
  { value: 100000, suffix: '+', label: 'Products Sold', iconName: 'Package' as const },
  { value: 30, suffix: '+', label: 'Countries Served', iconName: 'Globe' as const },
];

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center py-20">
    <Loader2 className="h-8 w-8 animate-spin text-[#8B4513]" />
  </div>
);

export default function Home() {
  return (
    <main>
      <Hero />
      <CategoryCards />

      {/* Lazy load below-the-fold content */}
      <LazySection threshold={0.1} rootMargin="200px">
        <Suspense fallback={<LoadingFallback />}>
          <FeaturedProducts />
        </Suspense>
      </LazySection>

      <Suspense fallback={<LoadingFallback />}>
        <WhyChooseUs />
      </Suspense>

      <StatsSection
        stats={homepageStats}
        title="Our Impact in Numbers"
        subtitle="Celebrating our journey of craftsmanship and customer satisfaction"
      />

      <LazySection threshold={0.1} rootMargin="300px">
        <Suspense fallback={<LoadingFallback />}>
          <BlogTeaser />
        </Suspense>
      </LazySection>
    </main>
  );
}
