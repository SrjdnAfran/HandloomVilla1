'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Check,
  Truck,
  Shield,
  RefreshCw,
  Minus,
  Plus,
  ChevronLeft,
  ChevronRight,
  Award,
  Clock,
  MessageCircle,
} from 'lucide-react';
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
  images: string[];
  category: string;
  subCategory?: string;
  inStock: boolean;
  isNew: boolean;
  isBestseller: boolean;
  description: string;
  longDescription: string;
  features: string[];
  specifications: { label: string; value: string }[];
  careInstructions: string[];
  reviews: {
    id: number;
    author: string;
    rating: number;
    date: string;
    title: string;
    content: string;
    verified: boolean;
  }[];
};

// Sample Product Data - Replace with your actual API call
const getProductById = (id: number): Product | undefined => {
  const products: Record<number, Product> = {
    1: {
      id: 1,
      name: 'Banarasi Silk Saree',
      price: 89.99,
      originalPrice: 149.99,
      rating: 4.8,
      reviewCount: 156,
      image: '/images/products/banarasi-silk.jpg',
      images: [
        '/images/products/banarasi-silk.jpg',
        '/images/products/banarasi-silk-2.jpg',
        '/images/products/banarasi-silk-3.jpg',
      ],
      category: 'Silk Sarees',
      subCategory: 'Wedding Collection',
      inStock: true,
      isNew: false,
      isBestseller: true,
      description:
        'Handcrafted pure silk saree with intricate zari work, perfect for weddings and special occasions.',
      longDescription:
        'Our Banarasi Silk Saree is a masterpiece of traditional Indian craftsmanship. Woven by skilled artisans in Varanasi, this saree features intricate gold zari work on the finest pure silk fabric. The rich texture and vibrant colors make it perfect for weddings, festivals, and other special occasions. Each saree takes weeks to complete, with every motif hand-woven to perfection.',
      features: [
        '100% pure Banarasi silk',
        'Handwoven by master artisans',
        'Intricate gold zari work',
        'Comes with matching blouse piece',
        'Dry clean only for longevity',
      ],
      specifications: [
        { label: 'Fabric', value: 'Pure Banarasi Silk' },
        { label: 'Length', value: '5.5 meters' },
        { label: 'Width', value: '1.15 meters' },
        { label: 'Blouse Length', value: '0.8 meters' },
        { label: 'Weight', value: '750 grams' },
        { label: 'Origin', value: 'Varanasi, India' },
      ],
      careInstructions: [
        'Dry clean only',
        'Store in a cotton bag',
        'Avoid direct sunlight',
        'Keep away from perfumes and deodorants',
      ],
      reviews: [
        {
          id: 1,
          author: 'Priya Sharma',
          rating: 5,
          date: 'March 15, 2024',
          title: 'Absolutely stunning!',
          content:
            'The saree is even more beautiful in person. The silk quality is exceptional and the zari work is intricate. Worth every penny!',
          verified: true,
        },
        {
          id: 2,
          author: 'Meera Patel',
          rating: 4.5,
          date: 'March 10, 2024',
          title: 'Beautiful craftsmanship',
          content:
            'Loved the saree! The color is vibrant and the fabric feels luxurious. Shipping was fast too.',
          verified: true,
        },
      ],
    },
    // Add more products as needed
  };

  return products[id];
};

// Get related products (same category, different ID)
const getRelatedProducts = (currentProduct: Product): Product[] => {
  // This should fetch from your actual data source
  const related = [
    {
      id: 2,
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
      id: 3,
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
  ] as Product[];

  return related;
};

// Star Rating Component
function StarRating({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'h-3 w-3', md: 'h-4 w-4', lg: 'h-5 w-5' };
  const iconSize = sizes[size];

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${iconSize} ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
}

// Quantity Selector Component
function QuantitySelector({
  quantity,
  onQuantityChange,
  maxStock,
}: {
  quantity: number;
  onQuantityChange: (qty: number) => void;
  maxStock: number;
}) {
  return (
    <div className="flex items-center rounded-lg border border-gray-300">
      <button
        onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
        className="p-2 transition-colors hover:bg-gray-50 disabled:opacity-50"
        disabled={quantity <= 1}
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-12 text-center font-semibold">{quantity}</span>
      <button
        onClick={() => onQuantityChange(Math.min(maxStock, quantity + 1))}
        className="p-2 transition-colors hover:bg-gray-50 disabled:opacity-50"
        disabled={quantity >= maxStock}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

// Image Gallery Component
function ImageGallery({ images, productName }: { images: string[]; productName: string }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div
        className="relative aspect-square cursor-zoom-in overflow-hidden rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <Image
          src={images[selectedImage] || images[0]}
          alt={`${productName} - view ${selectedImage + 1}`}
          fill
          className={`object-cover transition-transform duration-500 ${isZoomed ? 'scale-150' : 'scale-100'}`}
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                selectedImage === idx ? 'border-[#8B4513]' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Review Card Component
function ReviewCard({ review }: { review: Product['reviews'][0] }) {
  return (
    <div className="border-b border-gray-100 pb-6 last:border-0">
      <div className="mb-2 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#8B4513] to-[#D2691E] font-bold text-white">
            {review.author.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{review.author}</p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>{review.date}</span>
              {review.verified && (
                <span className="flex items-center gap-1 text-green-600">
                  <Check className="h-3 w-3" />
                  Verified Purchase
                </span>
              )}
            </div>
          </div>
        </div>
        <StarRating rating={review.rating} size="sm" />
      </div>
      <h4 className="mb-2 font-semibold text-gray-900">{review.title}</h4>
      <p className="text-sm leading-relaxed text-gray-600">{review.content}</p>
    </div>
  );
}

// Related Product Card
function RelatedProductCard({ product }: { product: Product }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/products/${product.id}`)}
      className="group cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative h-40 bg-gradient-to-br from-amber-100 to-amber-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-3">
        <div className="mb-1 flex items-center gap-1">
          <StarRating rating={product.rating} size="sm" />
          <span className="text-xs text-gray-500">({product.reviewCount})</span>
        </div>
        <h3 className="mb-1 line-clamp-2 text-sm font-bold text-gray-900 transition-colors group-hover:text-[#8B4513]">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-[#8B4513]">${product.price}</span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">${product.originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
}

// Main Product Detail Page Component
export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = parseInt(params.id as string);

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'care' | 'reviews'>(
    'description'
  );
  const [addedToCart, setAddedToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const foundProduct = getProductById(productId);
    if (foundProduct) {
      setProduct(foundProduct);
      setRelatedProducts(getRelatedProducts(foundProduct));
    } else {
      // Product not found, redirect to shop
      router.push('/shop');
    }
  }, [productId, router]);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
      inStock: product.inStock,
    });

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-[#8B4513] border-t-transparent" />
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="border-b border-gray-100 bg-white">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-[#8B4513]">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/shop" className="text-gray-500 hover:text-[#8B4513]">
              Shop
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href={`/shop?category=${encodeURIComponent(product.category)}`}
              className="text-gray-500 hover:text-[#8B4513]"
            >
              {product.category}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Product Main Section */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-lg md:p-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Image Gallery */}
            <ImageGallery images={product.images} productName={product.name} />

            {/* Product Info */}
            <div>
              {/* Badges */}
              <div className="mb-4 flex gap-2">
                {product.isBestseller && (
                  <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white">
                    Bestseller
                  </span>
                )}
                {product.isNew && (
                  <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
                    New Arrival
                  </span>
                )}
                {discount > 0 && (
                  <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
                    {discount}% OFF
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="mb-2 font-serif text-2xl font-bold text-gray-900 md:text-3xl">
                {product.name}
              </h1>

              {product.subCategory && (
                <p className="mb-3 text-sm text-gray-500">{product.subCategory}</p>
              )}

              {/* Rating */}
              <div className="mb-4 flex items-center gap-3">
                <StarRating rating={product.rating} size="lg" />
                <span className="text-sm text-gray-500">{product.reviewCount} reviews</span>
                <span className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-[#8B4513]">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Tax included. Free shipping on orders over $50
                </p>
              </div>

              {/* Short Description */}
              <p className="mb-6 leading-relaxed text-gray-600">{product.description}</p>

              {/* Key Features */}
              <div className="mb-6">
                <h3 className="mb-3 font-semibold text-gray-900">Key Features:</h3>
                <ul className="space-y-2">
                  {product.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="h-4 w-4 text-green-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="mb-6 flex flex-wrap gap-4">
                <QuantitySelector
                  quantity={quantity}
                  onQuantityChange={setQuantity}
                  maxStock={product.inStock ? 10 : 0}
                />
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8B4513] to-[#D2691E] py-3 font-semibold text-white transition-all duration-300 ${
                    product.inStock
                      ? 'hover:scale-[1.02] hover:shadow-lg active:scale-95'
                      : 'cursor-not-allowed opacity-50'
                  }`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart — ${(product.price * quantity).toFixed(2)}
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="rounded-xl border border-gray-300 p-3 transition-colors hover:border-red-500 hover:text-red-500"
                  aria-label="Add to wishlist"
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
                <button className="rounded-xl border border-gray-300 p-3 transition-colors hover:border-[#8B4513] hover:text-[#8B4513]">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>

              {/* Success Message */}
              {addedToCart && (
                <div className="animate-in fade-in slide-in-from-top-2 mb-6 flex items-center gap-2 rounded-xl border border-green-500 bg-green-50 p-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-green-700">
                    Added to cart!{' '}
                    <Link href="/cart" className="font-semibold underline">
                      View Cart
                    </Link>
                  </span>
                </div>
              )}

              {/* Shipping Info */}
              <div className="space-y-3 border-t border-gray-100 pt-6">
                <div className="flex items-center gap-3 text-sm">
                  <Truck className="h-5 w-5 text-[#8B4513]" />
                  <span className="text-gray-600">Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="h-5 w-5 text-[#8B4513]" />
                  <span className="text-gray-600">30-day satisfaction guarantee</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <RefreshCw className="h-5 w-5 text-[#8B4513]" />
                  <span className="text-gray-600">Easy returns within 30 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-8 overflow-hidden rounded-2xl bg-white shadow-lg">
          <div className="overflow-x-auto border-b border-gray-200">
            <div className="flex min-w-max">
              {[
                { id: 'description', label: 'Description' },
                { id: 'specs', label: 'Specifications' },
                { id: 'care', label: 'Care Instructions' },
                { id: 'reviews', label: `Reviews (${product.reviewCount})` },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-6 py-3 font-semibold transition-colors ${
                    activeTab === tab.id
                      ? 'border-b-2 border-[#8B4513] text-[#8B4513]'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 md:p-8">
            {activeTab === 'description' && (
              <div className="space-y-6">
                <p className="leading-relaxed text-gray-600">{product.longDescription}</p>
                <h3 className="text-lg font-bold text-gray-900">Features</h3>
                <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-600">
                      <Award className="h-4 w-4 text-[#8B4513]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {product.specifications.map((spec, idx) => (
                  <div key={idx} className="flex justify-between border-b border-gray-100 py-2">
                    <span className="font-semibold text-gray-700">{spec.label}</span>
                    <span className="text-gray-600">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'care' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">
                  How to Care for Your Handloom Product
                </h3>
                <ul className="space-y-3">
                  {product.careInstructions.map((instruction, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-600">
                      <Check className="h-4 w-4 text-green-600" />
                      {instruction}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {/* Review Summary */}
                <div className="flex items-center gap-6 border-b border-gray-200 pb-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900">{product.rating}</div>
                    <StarRating rating={product.rating} size="md" />
                    <div className="mt-1 text-sm text-gray-500">{product.reviewCount} reviews</div>
                  </div>
                  <div className="flex-1">
                    <button className="rounded-lg bg-[#8B4513] px-4 py-2 text-white transition-colors hover:bg-[#5C2E0B]">
                      Write a Review
                    </button>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                  {product.reviews.map(review => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="mb-6 font-serif text-2xl font-bold text-gray-900">You May Also Like</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {relatedProducts.map(relatedProduct => (
                <RelatedProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* WhatsApp Contact Button */}
      <div className="fixed right-6 bottom-6 z-40">
        <a
          href="https://wa.me/1234567890?text=Hi%2C%20I%27m%20interested%20in%20the%20product%20from%20HandloomVilla"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex h-14 w-14 items-center justify-center rounded-full bg-green-500 shadow-lg transition-all hover:scale-110 hover:shadow-xl"
        >
          <MessageCircle className="h-7 w-7 text-white" />
          <span className="invisible absolute right-full mr-3 hidden rounded-lg bg-gray-900 px-3 py-1.5 text-sm whitespace-nowrap text-white opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 sm:block">
            Questions? Chat with us
          </span>
        </a>
      </div>
    </main>
  );
}
