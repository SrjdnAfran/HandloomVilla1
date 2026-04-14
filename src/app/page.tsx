// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useProductStore } from '@/lib/productStore';
import { ProductVariant } from '@/data/products';
import {
  ChevronRight,
  Star,
  Truck,
  Shield,
  RefreshCw,
  Heart,
  TrendingUp,
  Award,
  Clock,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export default function Home() {
  const products = useProductStore(state => state.products) || [];
  const [featuredVariants, setFeaturedVariants] = useState<any[]>([]);

  useEffect(() => {
    if (products && products.length > 0) {
      // Safely extract variants with error handling
      const variants = products.flatMap(product => {
        if (!product || !product.variants) return [];
        return product.variants.map((variant: ProductVariant) => ({
          ...variant,
          productName: product.name || 'Product',
          basePrice: product.basePrice || 0,
          productId: product.id,
          productDescription: product.description || '',
        }));
      });
      setFeaturedVariants(variants.slice(0, 4));
    }
  }, [products]);

  const testimonials = [
    {
      name: 'Priya Sharma',
      location: 'Mumbai, India',
      rating: 5,
      text: 'Absolutely stunning craftsmanship! The saree exceeded my expectations. The fabric quality is exceptional and the colors are vibrant even after multiple washes.',
    },
    {
      name: 'Michael Chen',
      location: 'Singapore',
      rating: 5,
      text: 'I bought a kurta for my wedding and received so many compliments. The attention to detail and traditional weaving techniques are remarkable.',
    },
    {
      name: 'Emma Williams',
      location: 'London, UK',
      rating: 5,
      text: 'Beautiful handloom products with excellent customer service. Shipping was fast and packaging was elegant. Will definitely order again!',
    },
  ];

  const benefits = [
    {
      icon: Award,
      title: '100+ Years of Heritage',
      description: 'Crafting excellence since 1924',
      color: 'from-amber-400 to-amber-600',
    },
    {
      icon: Truck,
      title: 'Free Worldwide Shipping',
      description: 'On orders over LKR 25,000',
      color: 'from-blue-400 to-blue-600',
    },
    {
      icon: Shield,
      title: '5-Year Color Guarantee',
      description: 'Quality you can trust',
      color: 'from-green-400 to-green-600',
    },
    {
      icon: RefreshCw,
      title: 'Easy 30-Day Returns',
      description: 'Hassle-free exchanges',
      color: 'from-purple-400 to-purple-600',
    },
  ];

  // Helper function to safely format price
  const formatPrice = (price: number | undefined | null) => {
    if (!price || isNaN(price)) return '0';
    return price.toLocaleString();
  };

  return (
    <>
      {/* Hero Section - Enhanced */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div className="animate-in zoom-in absolute inset-0 scale-105 transform duration-1000">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwGVkdr4yzGTaNARrp0cC7WKw8E_ETQXuYnD7gYgv0ABG8tlFDoySxYJpNSlw1ZnCzOb2_ZcC1ld2U_7ncutxqQuSNwdipoIZoG1qO2ARaeQYuoYHBIKmZLlWlP5U3Ovyl-aJAg-ak75DV-PCkx7lp3z3-W6h0XrZSf_fLmGxmmUUH8GiM8HNtU6HQB0OxY00ieRDNJqi4milcGx0Ms5xXiNU6Qnr_1glje2Ko8irOFl0JQFoFOQwYqjIFf7ZGLoS2LFBVr-RGEeQ"
            alt="Heritage Handloom"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#001a4a]/90 via-[#002361]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 animate-pulse rounded-full bg-amber-500/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 animate-pulse rounded-full bg-blue-500/10 blur-3xl delay-1000" />
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute right-0 bottom-0 left-0 h-32 bg-gradient-to-t from-white to-transparent" />

        {/* Content */}
        <div className="relative mx-auto flex h-full max-w-screen-2xl flex-col items-start justify-center px-6 md:px-8 lg:px-12">
          <div className="animate-in fade-in slide-in-from-left-8 max-w-4xl space-y-8 duration-700">
            {/* Small badge */}
            <div className="animate-in fade-in slide-in-from-bottom-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md delay-200 duration-700">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span className="text-xs font-medium tracking-wider text-white uppercase">
                Since 1924
              </span>
            </div>

            <h1 className="animate-in fade-in slide-in-from-bottom-4 font-serif text-5xl leading-tight text-white delay-300 duration-700 md:text-7xl lg:text-8xl xl:text-9xl">
              Timeless Artistry,
              <span className="mt-2 block bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent md:mt-4">
                Woven for You
              </span>
            </h1>

            <p className="animate-in fade-in slide-in-from-bottom-4 max-w-2xl text-base leading-relaxed text-stone-100 delay-500 duration-700 md:text-lg lg:text-xl">
              Experience the heritage of Maruthamunai through our curated collection of premium
              handloom textiles, where every thread tells a century-old story.
            </p>

            <div className="animate-in fade-in slide-in-from-bottom-4 flex flex-col gap-4 pt-4 delay-700 duration-700 sm:flex-row">
              <Link
                href="/shop"
                className="group relative inline-flex items-center justify-center overflow-hidden bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-4 text-sm font-semibold tracking-widest text-white uppercase transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95 md:px-10 md:py-4"
              >
                <span className="relative z-10 flex items-center">
                  Explore Collection
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center justify-center border-2 border-white/30 bg-white/10 px-8 py-4 text-sm font-semibold tracking-widest text-white uppercase backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/50 hover:bg-white/20 active:scale-95 md:px-10 md:py-4"
              >
                Our Story
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="animate-in fade-in slide-in-from-bottom-4 flex gap-8 pt-8 delay-1000 duration-700">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                  {[1, 2, 3, 4].map(i => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-amber-400 to-amber-600"
                    />
                  ))}
                </div>
                <span className="text-sm text-white/80">10,000+ Happy Customers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 animate-bounce flex-col items-center gap-2 md:flex">
          <span className="text-xs tracking-wider text-white/60 uppercase">Scroll</span>
          <div className="flex h-10 w-5 justify-center rounded-full border-2 border-white/30">
            <div className="mt-2 h-2 w-0.5 animate-ping rounded-full bg-white/60" />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative z-20 -mt-20 px-6">
        <div className="container mx-auto">
          <div className="grid gap-6 md:grid-cols-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group animate-in fade-in slide-in-from-bottom-4 rounded-2xl bg-white p-6 text-center shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${benefit.color} shadow-lg transition-all group-hover:scale-110 group-hover:rotate-6`}
                >
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-2 font-serif text-lg font-bold text-gray-900">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - Enhanced */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-24">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2">
              <Star className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium tracking-wide text-blue-700 uppercase">
                Curated Collection
              </span>
            </div>
            <h2 className="mb-4 font-serif text-4xl font-bold text-gray-900 md:text-5xl">
              Featured Handloom Pieces
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Carefully selected premium sarees, kurtis and dupattas crafted with love
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featuredVariants.length > 0 ? (
              featuredVariants.map((variant, index) => (
                <div
                  key={variant.id || index}
                  className="group animate-in fade-in slide-in-from-bottom-4 rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-t-2xl">
                    <Image
                      src={variant.image || '/placeholder-image.jpg'}
                      alt={`${variant.productName || 'Product'} - ${variant.color || ''}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Overlay with quick view */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {variant.stock && variant.stock < 5 && variant.stock > 0 && (
                      <div className="absolute top-3 right-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                        Only {variant.stock} left
                      </div>
                    )}

                    {/* Quick action buttons */}
                    <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <button className="rounded-full bg-white p-2 text-gray-900 transition-colors hover:bg-[#002361] hover:text-white">
                        <Heart className="h-5 w-5" />
                      </button>
                      <Link
                        href={`/product/${variant.slug || variant.id}`}
                        className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-[#002361] hover:text-white"
                      >
                        Quick View
                      </Link>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">(24 reviews)</span>
                    </div>
                    <h3 className="line-clamp-2 font-serif text-lg font-bold text-gray-900">
                      {variant.productName || 'Product Name'}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">{variant.color || 'Standard'}</p>
                    <p className="mt-1 font-mono text-xs text-gray-400">
                      {variant.sku || variant.serialNumber || 'SKU-001'}
                    </p>

                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        <span className="text-2xl font-bold text-[#002361]">
                          LKR {formatPrice(variant.basePrice)}
                        </span>
                      </div>
                      <Link
                        href={`/product/${variant.slug || variant.id}`}
                        className="group flex items-center gap-2 rounded-lg bg-[#002361] px-4 py-2 text-sm font-medium text-white transition-all hover:gap-3 hover:bg-[#001a4a]"
                      >
                        View
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <p className="text-gray-500">Loading featured products...</p>
              </div>
            )}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 rounded-full border-2 border-[#002361] px-8 py-3 font-medium text-[#002361] transition-all hover:gap-3 hover:bg-[#002361] hover:text-white"
            >
              View All Products
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#002361] to-[#003887] py-24 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative container mx-auto px-6">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
              <Star className="h-4 w-4 text-amber-400" />
              <span className="text-sm font-medium tracking-wide uppercase">Testimonials</span>
            </div>
            <h2 className="font-serif text-4xl font-bold md:text-5xl">What Our Customers Say</h2>
            <p className="mx-auto mt-4 max-w-2xl text-blue-100">
              Join thousands of satisfied customers who love our handloom products
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group animate-in fade-in slide-in-from-bottom-4 rounded-2xl bg-white/10 p-8 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="mb-4 flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mb-6 leading-relaxed text-gray-100 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600">
                    <span className="text-lg font-bold">{testimonial.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-blue-200">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-24">
        <div className="container mx-auto px-6 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium tracking-wide text-green-700 uppercase">
                Special Offer
              </span>
            </div>
            <h2 className="mb-4 font-serif text-4xl font-bold text-gray-900 md:text-5xl">
              Join Our Handloom Community
            </h2>
            <p className="mb-8 text-lg text-gray-600">
              Subscribe to get exclusive updates, early access to new collections, and special
              discounts.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <input
                type="email"
                placeholder="Enter your email address"
                className="rounded-full border border-gray-300 px-6 py-3 text-gray-900 transition-all outline-none focus:border-[#002361] focus:ring-4 focus:ring-blue-100 sm:w-96"
              />
              <button className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#002361] to-[#003887] px-8 py-3 font-semibold text-white transition-all hover:gap-3 hover:shadow-xl">
                Subscribe
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
