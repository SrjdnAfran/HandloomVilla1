'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star, ShoppingCart, Eye, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import LazyImage from '@/components/ui/LazyImage';

const products = [
  {
    id: 1,
    name: 'Banarasi Silk Saree',
    price: 89.99,
    originalPrice: 149.99,
    rating: 4.8,
    reviewCount: 156,
    image: '/images/products/banarasi-silk.jpg',
    category: 'Silk Sarees',
    inStock: true,
    isNew: false,
  },
  {
    id: 2,
    name: 'Handloom Cotton Kurta',
    price: 45.99,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 89,
    image: '/images/products/cotton-kurta.jpg',
    category: 'Cotton Kurtis',
    inStock: true,
    isNew: true,
  },
  {
    id: 3,
    name: 'Chanderi Dupatta',
    price: 35.99,
    originalPrice: 59.99,
    rating: 4.7,
    reviewCount: 67,
    image: '/images/products/chanderi-dupatta.jpg',
    category: 'Dupattas',
    inStock: true,
    isNew: false,
  },
  {
    id: 4,
    name: "Traditional Men's Kurta",
    price: 65.99,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 112,
    image: '/images/products/mens-kurta.jpg',
    category: "Men's Collection",
    inStock: true,
    isNew: false,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: (typeof products)[0] }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      inStock: product.inStock,
    });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div
      className="group relative overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {discount > 0 && (
          <span className="rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white">
            -{discount}%
          </span>
        )}
        {product.isNew && (
          <span className="rounded-full bg-green-500 px-2 py-1 text-xs font-semibold text-white">
            New
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={() => setIsWishlisted(!isWishlisted)}
        className="absolute top-3 right-3 z-10 rounded-full bg-white/80 p-1.5 backdrop-blur-sm transition-colors hover:bg-white"
        aria-label="Add to wishlist"
      >
        <Heart
          className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
        />
      </button>

      {/* Image Container */}
      <div className="relative h-56 overflow-hidden bg-linear-to-br from-amber-100 to-amber-50">
        <LazyImage
          src={product.image}
          alt={product.name}
          fill
          className={`object-cover transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
          lowQualitySrc="/images/placeholder-low.jpg"
        />

        {/* Quick Action Buttons - Visible on hover */}
        <div
          className={`absolute inset-0 flex items-center justify-center gap-3 bg-black/40 transition-all duration-300 ${
            isHovered ? 'visible opacity-100' : 'invisible opacity-0'
          }`}
        >
          <button
            onClick={handleAddToCart}
            className="transform rounded-full bg-white p-2.5 transition-all hover:scale-110 hover:bg-[#8B4513] hover:text-white"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
          <Link
            href={`/products/${product.id}`}
            className="transform rounded-full bg-white p-2.5 transition-all hover:scale-110 hover:bg-[#8B4513] hover:text-white"
            aria-label="Quick view"
          >
            <Eye className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-1 text-xs font-semibold text-[#8B4513]">{product.category}</div>

        <div className="mb-2 flex items-center gap-2">
          <StarRating rating={product.rating} />
          <span className="text-xs text-gray-500">({product.reviewCount})</span>
        </div>

        <Link href={`/products/${product.id}`}>
          <h3 className="mb-2 line-clamp-2 text-sm font-bold text-gray-900 transition-colors hover:text-[#8B4513] sm:text-base">
            {product.name}
          </h3>
        </Link>

        <div className="mb-3 flex items-center gap-2">
          <span className="text-lg font-bold text-[#8B4513] sm:text-xl">${product.price}</span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">${product.originalPrice}</span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#8B4513] py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#5C2E0B]"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </button>

        {/* Success Toast */}
        {showSuccess && (
          <div className="animate-in fade-in slide-in-from-bottom-2 absolute bottom-20 left-1/2 -translate-x-1/2 rounded-full bg-green-600 px-3 py-1.5 text-xs text-white shadow-lg">
            Added to cart! 🛒
          </div>
        )}
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  const [visibleCount, setVisibleCount] = useState(4);

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, products.length));
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2">
            <Star className="h-4 w-4 fill-amber-600 text-amber-600" />
            <span className="text-sm font-medium tracking-wider text-amber-700 uppercase">
              Best Sellers
            </span>
          </div>
          <h2 className="mb-4 font-serif text-3xl font-bold text-[#8B4513] md:text-4xl">
            Featured Products
          </h2>
          <p className="text-gray-600">
            Discover our most loved handloom pieces, crafted with passion and perfection
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, visibleCount).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < products.length && (
          <div className="mt-12 text-center">
            <button
              onClick={loadMore}
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#8B4513] px-8 py-3 font-semibold text-[#8B4513] transition-all duration-300 hover:bg-[#8B4513] hover:text-white hover:shadow-lg"
            >
              Load More Products
              <span className="text-lg">→</span>
            </button>
          </div>
        )}

        {/* View All Button */}
        <div className="mt-8 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 font-semibold text-[#8B4513] transition-all duration-300 hover:gap-3"
          >
            View All Products
            <span className="text-lg">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
