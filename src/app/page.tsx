// src/app/page.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useProductStore } from '@/lib/productStore';

export default function Home() {
  const products = useProductStore(state => state.products) || [];
  const featuredProducts = products.slice(0, 4);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[90vh] w-full overflow-hidden md:h-[921px]">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwGVkdr4yzGTaNARrp0cC7WKw8E_ETQXuYnD7gYgv0ABG8tlFDoySxYJpNSlw1ZnCzOb2_ZcC1ld2U_7ncutxqQuSNwdipoIZoG1qO2ARaeQYuoYHBIKmZLlWlP5U3Ovyl-aJAg-ak75DV-PCkx7lp3z3-W6h0XrZSf_fLmGxmmUUH8GiM8HNtU6HQB0OxY00ieRDNJqi4milcGx0Ms5xXiNU6Qnr_1glje2Ko8irOFl0JQFoFOQwYqjIFf7ZGLoS2LFBVr-RGEeQ"
          alt="Heritage Handloom"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* Improved Gradient Overlay - Using your gradient style */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(0, 13, 51, 0.85) 0%, rgba(101, 101, 101, 0.4) 50%, transparent 100%)',
          }}
        />

        {/* Optional: Bottom gradient fade for smoother transition */}
        <div className="absolute right-0 bottom-0 left-0 h-32 bg-gradient-to-t from-white to-transparent" />

        {/* Content */}
        <div className="relative mx-auto flex h-full max-w-screen-2xl flex-col items-start justify-center px-6 md:px-8 lg:px-12">
          <div className="max-w-3xl space-y-6 md:space-y-8">
            {/* Small badge for elegance */}
            <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-sm">
              <span className="text-xs font-medium tracking-wider text-white uppercase">
                Since 1924
              </span>
            </div>

            <h1 className="font-serif text-4xl leading-tight text-white md:text-6xl lg:text-7xl xl:text-8xl">
              Timeless Artistry, <span className="mt-2 block md:mt-4">Woven for You</span>
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-stone-100 md:text-lg lg:text-xl">
              Experience the heritage of Maruthamunai through our curated collection of premium
              handloom textiles, where every thread tells a century-old story.
            </p>

            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <Link
                href="/shop"
                className="group inline-flex items-center justify-center bg-[var(--accent)] px-8 py-3 text-sm font-semibold tracking-widest text-white uppercase transition-all duration-300 hover:bg-[var(--accent-hover)] hover:shadow-lg active:scale-95 md:px-10 md:py-4"
              >
                Explore Collection
                <svg
                  className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center justify-center border border-white/30 bg-white/10 px-8 py-3 text-sm font-semibold tracking-widest text-white uppercase backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/20 active:scale-95 md:px-10 md:py-4"
              >
                Our Story
              </Link>
            </div>

            {/* Optional: Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
              <span className="text-xs tracking-wider text-white/60 uppercase">Scroll</span>
              <div className="flex h-10 w-5 justify-center rounded-full border-2 border-white/30">
                <div className="mt-2 h-2 w-0.5 animate-bounce rounded-full bg-white/60" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-3 font-serif text-4xl font-bold text-gray-900">
              Featured Handloom Pieces
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Carefully selected premium sarees, kurtis and dupattas
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.length > 0 ? (
              featuredProducts.map(product => (
                <div
                  key={product.id}
                  className="group overflow-hidden rounded-2xl bg-white shadow transition-all hover:shadow-xl"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={product.image || '/placeholder-image.jpg'}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="line-clamp-2 text-lg font-semibold text-gray-900">
                      {product.name}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-gray-600">{product.description}</p>

                    <div className="mt-3 flex items-end justify-between">
                      <div>
                        <span className="text-xl font-bold text-[var(--accent)]">
                          LKR {product.basePrice}
                        </span>
                      </div>
                      <Link
                        href={`/product/${product.id}`}
                        className="rounded-lg bg-[var(--accent)] px-5 py-2 text-sm text-white transition-colors hover:bg-[var(--accent-hover)]"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No featured products available.
              </p>
            )}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/shop"
              className="inline-block rounded-full border-2 border-[var(--accent)] px-10 py-3 font-medium text-[var(--accent)] transition-all hover:bg-[var(--accent)] hover:text-white"
            >
              View All Products →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
