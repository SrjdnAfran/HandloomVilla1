"use client";

import Image from "next/image";
import Link from "next/link";
import { useProductStore } from "@/lib/productStore";
import ProductCard from "@/components/ProductCard"; 

export default function Home() {
  const products = useProductStore((state) => state.products);
  const featuredProducts = products.slice(0, 4); // show first 4 products

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2000&auto=format&fit=crop&q=80"
          alt="Handloom Saree"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative text-center text-white px-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-6">
            HandloomVilla
          </h1>
          <p className="text-2xl md:text-3xl mb-10 text-[#f5e8d3]">
            Pure Handwoven Treasures<br />
            Crafted with Love by Artisans
          </p>
          <Link
            href="/shop"
            className="inline-block bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-12 py-4 rounded-full text-lg font-medium transition-all active:scale-95"
          >
            Shop Our Collection →
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-3">
              Featured Handloom Pieces
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Carefully selected premium sarees, kurtis and dupattas
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/shop"
              className="inline-block border-2 border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white px-10 py-3 rounded-full font-medium transition-all"
            >
              View All Products →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}