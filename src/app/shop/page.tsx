// src/app/shop/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useProductStore } from '@/lib/productStore';
import { ProductVariant } from '@/types/product';

export default function ShopPage() {
  const products = useProductStore(state => state.products);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  // Wait for products to load
  useEffect(() => {
    if (products) {
      setIsLoading(false);
    }
  }, [products]);

  // Show loading state while products are loading
  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-20">
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-[var(--accent)]"></div>
        </div>
      </div>
    );
  }

  // Handle empty or undefined products
  if (!products || products.length === 0) {
    return (
      <div className="container mx-auto px-6 py-20">
        <div className="text-center">
          <h1 className="mb-4 text-center font-serif text-4xl font-bold text-[var(--accent)] md:text-5xl">
            Our Handloom Collection
          </h1>
          <p className="mb-10 text-center text-lg text-gray-600">
            Premium Handloom Sarees, Sarong, Lungi & More from Maruthamunai, Sri Lanka
          </p>
          <div className="py-20 text-center text-gray-500">
            No products available. Please check back later.
          </div>
        </div>
      </div>
    );
  }

  // Get all unique categories (safely)
  const allCategories = Array.from(new Set(products.map(p => p.category)));

  // Flatten all variants into separate products (with safety checks)
  const allVariants = products.flatMap(product => {
    // Check if product has variants array
    if (!product.variants || !Array.isArray(product.variants)) {
      return [];
    }
    return product.variants.map((variant: ProductVariant) => ({
      ...variant,
      productName: product.name || 'Unnamed Product',
      productCategory: product.category || 'Uncategorized',
      productSubCategory: product.subCategory || '',
      productDescription: product.description || '',
      basePrice: product.basePrice || 0,
      productId: product.id,
    }));
  });

  const filteredVariants = allVariants.filter(variant => {
    const matchesSearch =
      variant.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      variant.productDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      variant.color?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || variant.productCategory === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="mb-4 text-center font-serif text-4xl font-bold text-[var(--accent)] md:text-5xl">
        Our Handloom Collection
      </h1>
      <p className="mb-10 text-center text-lg text-gray-600">
        Premium Handloom Sarees, Sarong, Lungi & More from Maruthamunai, Sri Lanka
      </p>

      {/* Filters */}
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="flex-1 rounded-xl border border-gray-300 px-5 py-3 focus:border-[var(--accent)] focus:outline-none"
        />

        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="rounded-xl border border-gray-300 px-5 py-3 focus:border-[var(--accent)] focus:outline-none"
        >
          <option value="All">All Categories</option>
          {allCategories.map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Products Grid - Each variant as separate product */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredVariants.map(variant => (
          <div
            key={variant.id}
            className="group overflow-hidden rounded-2xl bg-white shadow transition-all hover:shadow-xl"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={variant.image}
                alt={`${variant.productName} - ${variant.color}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {variant.stock < 5 && variant.stock > 0 && (
                <div className="absolute top-3 right-3 rounded-full bg-yellow-500 px-3 py-1 text-xs text-white">
                  Only {variant.stock} left
                </div>
              )}
              {variant.stock === 0 && (
                <div className="absolute top-3 right-3 rounded-full bg-red-500 px-3 py-1 text-xs text-white">
                  Out of Stock
                </div>
              )}
            </div>

            <div className="p-5">
              <h3 className="line-clamp-2 text-lg font-semibold">{variant.productName}</h3>
              <p className="mt-1 text-sm text-gray-600">{variant.color}</p>
              <p className="mt-1 font-mono text-xs text-gray-400">
                {variant.sku || variant.serialNumber}
              </p>

              <div className="mt-3 flex items-end justify-between">
                <div>
                  <span className="text-xl font-bold text-[var(--accent)]">
                    LKR {variant.basePrice}
                  </span>
                </div>
                <Link
                  href={`/product/${variant.slug || variant.id}`}
                  className="rounded-lg bg-[var(--accent)] px-5 py-2 text-sm text-white transition-colors hover:bg-[var(--accent-hover)]"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredVariants.length === 0 && (
        <div className="py-20 text-center text-gray-500">
          No products found matching your search.
        </div>
      )}
    </div>
  );
}
