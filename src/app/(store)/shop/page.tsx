'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  Filter,
  X,
  ChevronDown,
  Star,
  ShoppingCart,
  Eye,
  Grid3x3,
  List,
  SlidersHorizontal,
  Heart,
} from 'lucide-react';
import LazyImage from '@/components/ui/LazyImage';
import { useCart } from '@/context/CartContext';

// Product Type Definition
type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  inStock: boolean;
  isNew: boolean;
  isBestseller: boolean;
  description: string;
};

// Sample Products Data - Replace with your actual products
const allProducts: Product[] = [
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
    isBestseller: true,
    description:
      'Handcrafted pure silk saree with intricate zari work, perfect for weddings and special occasions.',
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
    isBestseller: false,
    description: 'Breathable handloom cotton kurta with elegant block print design.',
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
    isBestseller: false,
    description: 'Lightweight Chanderi dupatta with delicate gold border.',
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
    isBestseller: true,
    description: 'Classic handloom kurta with mandarin collar and intricate detailing.',
  },
  {
    id: 5,
    name: 'Kanchipuram Silk Saree',
    price: 129.99,
    originalPrice: 199.99,
    rating: 4.9,
    reviewCount: 203,
    image: '/images/products/kanchipuram-silk.jpg',
    category: 'Silk Sarees',
    inStock: true,
    isNew: false,
    isBestseller: true,
    description: 'Authentic Kanchipuram silk saree with traditional temple border.',
  },
  {
    id: 6,
    name: 'Cotton Printed Kurta',
    price: 39.99,
    originalPrice: null,
    rating: 4.6,
    reviewCount: 78,
    image: '/images/products/cotton-printed-kurta.jpg',
    category: 'Cotton Kurtis',
    inStock: true,
    isNew: true,
    isBestseller: false,
    description: 'Colorful hand-block printed cotton kurta for everyday wear.',
  },
  {
    id: 7,
    name: 'Organza Dupatta',
    price: 29.99,
    originalPrice: 49.99,
    rating: 4.5,
    reviewCount: 45,
    image: '/images/products/organza-dupatta.jpg',
    category: 'Dupattas',
    inStock: true,
    isNew: false,
    isBestseller: false,
    description: 'Sheer organza dupatta with sequin work, perfect for festive occasions.',
  },
  {
    id: 8,
    name: "Linen Men's Kurta",
    price: 59.99,
    originalPrice: 89.99,
    rating: 4.7,
    reviewCount: 94,
    image: '/images/products/linen-mens-kurta.jpg',
    category: "Men's Collection",
    inStock: false,
    isNew: false,
    isBestseller: false,
    description: 'Breathable linen kurta perfect for summer weddings.',
  },
  {
    id: 9,
    name: 'Paithani Silk Saree',
    price: 149.99,
    originalPrice: 249.99,
    rating: 4.9,
    reviewCount: 178,
    image: '/images/products/paithani-silk.jpg',
    category: 'Silk Sarees',
    inStock: true,
    isNew: false,
    isBestseller: true,
    description: 'Maharashtrian Paithani silk saree with peacock motif.',
  },
  {
    id: 10,
    name: 'A-line Cotton Kurta',
    price: 49.99,
    originalPrice: null,
    rating: 4.7,
    reviewCount: 56,
    image: '/images/products/a-line-kurta.jpg',
    category: 'Cotton Kurtis',
    inStock: true,
    isNew: true,
    isBestseller: false,
    description: 'Stylish A-line kurta with handwoven detailing.',
  },
];

// Categories for filtering
const categories = ['All Products', 'Silk Sarees', 'Cotton Kurtis', 'Dupattas', "Men's Collection"];

// Sort options
const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Best Rating' },
];

// Price ranges
const priceRanges = [
  { label: 'All', min: 0, max: Infinity },
  { label: 'Under $50', min: 0, max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: 'Over $100', min: 100, max: Infinity },
];

// Star Rating Component
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

// Product Card Component
function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { addToCart } = useCart();

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
        {product.isBestseller && (
          <span className="rounded-full bg-amber-500 px-2 py-1 text-xs font-semibold text-white">
            Bestseller
          </span>
        )}
        {product.isNew && (
          <span className="rounded-full bg-green-500 px-2 py-1 text-xs font-semibold text-white">
            New
          </span>
        )}
        {discount > 0 && (
          <span className="rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white">
            -{discount}%
          </span>
        )}
        {!product.inStock && (
          <span className="rounded-full bg-gray-500 px-2 py-1 text-xs font-semibold text-white">
            Out of Stock
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
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-amber-100 to-amber-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`object-cover transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
          loading="lazy"
        />

        {/* Quick Action Buttons */}
        <div
          className={`absolute inset-0 flex items-center justify-center gap-3 bg-black/40 transition-all duration-300 ${
            isHovered ? 'visible opacity-100' : 'invisible opacity-0'
          }`}
        >
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="transform rounded-full bg-white p-2.5 transition-all hover:scale-110 hover:bg-[#8B4513] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
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
        <div className="mb-1 truncate text-xs font-semibold text-[#8B4513]">{product.category}</div>

        <div className="mb-2 flex items-center gap-2">
          <StarRating rating={product.rating} />
          <span className="text-xs text-gray-500">({product.reviewCount})</span>
        </div>

        <Link href={`/products/${product.id}`}>
          <h3 className="mb-2 line-clamp-2 text-sm font-bold text-gray-900 transition-colors hover:text-[#8B4513]">
            {product.name}
          </h3>
        </Link>

        <div className="mb-3 flex items-center gap-2">
          <span className="text-lg font-bold text-[#8B4513]">${product.price}</span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">${product.originalPrice}</span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`flex w-full items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold transition-all duration-300 ${
            product.inStock
              ? 'bg-[#8B4513] text-white hover:bg-[#5C2E0B] hover:shadow-md'
              : 'cursor-not-allowed bg-gray-300 text-gray-500'
          }`}
        >
          <ShoppingCart className="h-4 w-4" />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
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

// Filter Sidebar Component
function FilterSidebar({
  selectedCategory,
  onCategoryChange,
  selectedPriceRange,
  onPriceRangeChange,
  inStockOnly,
  onInStockOnlyChange,
  onReset,
}: {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedPriceRange: number;
  onPriceRangeChange: (index: number) => void;
  inStockOnly: boolean;
  onInStockOnlyChange: (value: boolean) => void;
  onReset: () => void;
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="mb-3 font-semibold text-gray-900">Categories</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <label key={category} className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === category}
                onChange={() => onCategoryChange(category)}
                className="h-4 w-4 text-[#8B4513] focus:ring-[#8B4513]"
              />
              <span className="text-sm text-gray-600">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="mb-3 font-semibold text-gray-900">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map((range, index) => (
            <label key={range.label} className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="priceRange"
                checked={selectedPriceRange === index}
                onChange={() => onPriceRangeChange(index)}
                className="h-4 w-4 text-[#8B4513] focus:ring-[#8B4513]"
              />
              <span className="text-sm text-gray-600">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="mb-3 font-semibold text-gray-900">Availability</h3>
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={e => onInStockOnlyChange(e.target.checked)}
            className="h-4 w-4 rounded text-[#8B4513] focus:ring-[#8B4513]"
          />
          <span className="text-sm text-gray-600">In Stock Only</span>
        </label>
      </div>

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="w-full py-2 text-sm font-semibold text-[#8B4513] transition-colors hover:text-[#5C2E0B]"
      >
        Reset All Filters
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="mb-4 lg:hidden">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3 font-semibold text-gray-700 shadow-sm"
        >
          <Filter className="h-5 w-5" />
          Filter Products
        </button>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileOpen(false)} />
          <div className="absolute top-0 right-0 h-full w-80 overflow-y-auto bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">Filters</h2>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="rounded-full p-1 hover:bg-gray-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <FilterContent />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:col-span-1 lg:block">
        <div className="sticky top-24 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
          <h2 className="mb-6 text-xl font-bold">Filters</h2>
          <FilterContent />
        </div>
      </div>
    </>
  );
}

// Main Shop Page Component
export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [visibleCount, setVisibleCount] = useState(8);

  // Filter products
  const filteredProducts = allProducts.filter(product => {
    // Search filter
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Category filter
    const matchesCategory =
      selectedCategory === 'All Products' || product.category === selectedCategory;

    // Price filter
    const range = priceRanges[selectedPriceRange];
    const matchesPrice = product.price >= range.min && product.price <= range.max;

    // Stock filter
    const matchesStock = !inStockOnly || product.inStock;

    return matchesSearch && matchesCategory && matchesPrice && matchesStock;
  });

  // Sort products
  const getSortedProducts = useCallback(() => {
    const sorted = [...filteredProducts];

    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        sorted.sort((a, b) => (b.isNew ? 1 : -1));
        break;
      default:
        // featured - keep original order with bestsellers first
        sorted.sort((a, b) => (b.isBestseller ? 1 : -1));
    }

    return sorted;
  }, [filteredProducts, sortBy]);

  const sortedProducts = getSortedProducts();
  const visibleProducts = sortedProducts.slice(0, visibleCount);
  const hasMore = visibleCount < sortedProducts.length;

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 8, sortedProducts.length));
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('All Products');
    setSelectedPriceRange(0);
    setInStockOnly(false);
    setSortBy('featured');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-8 pb-16">
      {/* Hero Banner */}
      <div className="mb-8 bg-gradient-to-r from-[#8B4513] to-[#D2691E] py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 font-serif text-3xl font-bold md:text-4xl lg:text-5xl">
            Our Handloom Collection
          </h1>
          <p className="mx-auto max-w-2xl text-base text-amber-100 md:text-lg">
            Discover authentic handloom treasures, each piece telling a story of tradition and
            craftsmanship
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative mx-auto max-w-md lg:mx-0">
            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-gray-300 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-[#8B4513] focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Filter Sidebar */}
          <FilterSidebar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedPriceRange={selectedPriceRange}
            onPriceRangeChange={setSelectedPriceRange}
            inStockOnly={inStockOnly}
            onInStockOnlyChange={setInStockOnly}
            onReset={handleReset}
          />

          {/* Products Section */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="text-sm text-gray-600">
                Showing{' '}
                <span className="font-semibold text-[#8B4513]">{sortedProducts.length}</span>{' '}
                products
              </div>

              <div className="flex items-center gap-3">
                {/* Sort Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    Sort: {sortOptions.find(o => o.value === sortBy)?.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${isSortOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isSortOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsSortOpen(false)} />
                      <div className="absolute top-full right-0 z-50 mt-2 w-48 rounded-xl border border-gray-100 bg-white py-2 shadow-lg">
                        {sortOptions.map(option => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setSortBy(option.value);
                              setIsSortOpen(false);
                            }}
                            className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-amber-50 ${
                              sortBy === option.value
                                ? 'bg-amber-50 font-semibold text-[#8B4513]'
                                : 'text-gray-700'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* View Mode Toggle */}
                <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`rounded-lg p-2 transition-colors ${
                      viewMode === 'grid' ? 'bg-white text-[#8B4513] shadow' : 'text-gray-500'
                    }`}
                    aria-label="Grid view"
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`rounded-lg p-2 transition-colors ${
                      viewMode === 'list' ? 'bg-white text-[#8B4513] shadow' : 'text-gray-500'
                    }`}
                    aria-label="List view"
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {sortedProducts.length === 0 ? (
              <div className="rounded-2xl bg-white py-16 text-center shadow-sm">
                <div className="mb-4 text-6xl">🔍</div>
                <p className="mb-4 text-gray-500">No products found matching your criteria.</p>
                <button
                  onClick={handleReset}
                  className="font-semibold text-[#8B4513] transition-colors hover:text-[#5C2E0B]"
                >
                  Clear all filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <>
                <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {visibleProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="mt-10 text-center">
                    <button
                      onClick={loadMore}
                      className="inline-flex items-center gap-2 rounded-full border-2 border-[#8B4513] px-8 py-3 font-semibold text-[#8B4513] transition-all duration-300 hover:bg-[#8B4513] hover:text-white hover:shadow-lg"
                    >
                      Load More Products
                      <span className="text-lg">↓</span>
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* List View */
              <div className="space-y-4">
                {visibleProducts.map(product => (
                  <div
                    key={product.id}
                    className="flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:flex-row"
                  >
                    <div className="relative h-32 w-full flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-amber-100 to-amber-50 sm:w-32">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="mb-1 text-xs font-semibold text-[#8B4513]">
                        {product.category}
                      </div>
                      <h3 className="mb-2 text-lg font-bold text-gray-900">{product.name}</h3>
                      <p className="mb-2 line-clamp-2 text-sm text-gray-600">
                        {product.description}
                      </p>
                      <div className="mb-2 flex items-center gap-2">
                        <StarRating rating={product.rating} />
                        <span className="text-xs text-gray-500">({product.reviewCount})</span>
                      </div>
                      <div className="mb-3 flex items-center gap-2">
                        <span className="text-xl font-bold text-[#8B4513]">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const { addToCart } = useCart();
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          quantity: 1,
                          image: product.image,
                          inStock: product.inStock,
                        });
                      }}
                      disabled={!product.inStock}
                      className={`self-center rounded-lg px-6 py-2 font-semibold transition-all ${
                        product.inStock
                          ? 'bg-[#8B4513] text-white hover:bg-[#5C2E0B]'
                          : 'cursor-not-allowed bg-gray-300 text-gray-500'
                      }`}
                    >
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
