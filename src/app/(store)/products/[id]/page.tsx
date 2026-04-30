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
  Award,
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

// Mapping function: DB shape → Frontend shape
const mapDbProductToFrontend = (dbProduct: any): Product => {
  const mainImage = dbProduct.variants?.[0]?.image || '/images/placeholder.jpg';

  return {
    id: dbProduct.id,
    name: dbProduct.name,
    price: dbProduct.base_price,
    originalPrice: dbProduct.original_price || null,
    rating: 4.8, // You can enhance this later with real reviews
    reviewCount: dbProduct.review_count || 0,
    image: mainImage,
    images: dbProduct.variants?.map((v: any) => v.image).filter(Boolean) || [mainImage],
    category: dbProduct.category,
    subCategory: dbProduct.sub_category,
    inStock: dbProduct.variants?.some((v: any) => v.stock > 0) || false,
    isNew: dbProduct.is_new || false,
    isBestseller: dbProduct.is_featured || false,
    description: dbProduct.description || '',
    longDescription: dbProduct.long_description || dbProduct.description || '',
    features: dbProduct.features ? JSON.parse(dbProduct.features) : [],
    specifications: dbProduct.specifications ? JSON.parse(dbProduct.specifications) : [],
    careInstructions: dbProduct.care_instructions ? JSON.parse(dbProduct.care_instructions) : [],
    reviews: [], // You can join reviews later if needed
  };
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
          className={`${iconSize} ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
}

// Quantity Selector
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
        onClick={() => onQuantityChange(Math.min(maxStock || 10, quantity + 1))}
        className="p-2 transition-colors hover:bg-gray-50 disabled:opacity-50"
        disabled={quantity >= (maxStock || 10)}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

// Image Gallery
function ImageGallery({ images, productName }: { images: string[]; productName: string }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="space-y-4">
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

// Review Card
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
                  <Check className="h-3 w-3" /> Verified Purchase
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
function RelatedProductCard({ product }: { product: any }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/products/${product.id}`)}
      className="group cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative h-40 bg-gradient-to-br from-amber-100 to-amber-50">
        <Image
          src={product.image || product.variants?.[0]?.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-3">
        <div className="mb-1 flex items-center gap-1">
          <StarRating rating={4.8} size="sm" />
          <span className="text-xs text-gray-500">(12)</span>
        </div>
        <h3 className="mb-1 line-clamp-2 text-sm font-bold text-gray-900 transition-colors group-hover:text-[#8B4513]">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-[#8B4513]">${product.base_price}</span>
        </div>
      </div>
    </div>
  );
}

// Main Component
export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = parseInt(params.id as string);

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'care' | 'reviews'>(
    'description'
  );
  const [addedToCart, setAddedToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { addToCart } = useCart();

  // Fetch single product
  useEffect(() => {
    if (!productId) return;

    setIsLoading(true);
    fetch(`/api/products/${productId}`)
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          const mappedProduct = mapDbProductToFrontend(data);
          setProduct(mappedProduct);

          // Fetch related products (same category)
          return fetch(`/api/products?category=${encodeURIComponent(data.category)}`);
        } else {
          router.push('/shop');
        }
      })
      .then(res => res?.json())
      .then(relatedData => {
        if (relatedData) {
          // Filter out current product and take first 4
          const filtered = relatedData.filter((p: any) => p.id !== productId).slice(0, 4);
          setRelatedProducts(filtered);
        }
      })
      .catch(err => {
        console.error('Error fetching product:', err);
        router.push('/shop');
      })
      .finally(() => setIsLoading(false));
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

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-[#8B4513] border-t-transparent" />
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-red-600">Product not found</p>
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
            <span className="font-medium text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Main Product Section */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-lg md:p-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <ImageGallery images={product.images} productName={product.name} />

            {/* Product Info */}
            <div>
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
                    -{discount}% OFF
                  </span>
                )}
              </div>

              <h1 className="mb-2 font-serif text-2xl font-bold text-gray-900 md:text-3xl">
                {product.name}
              </h1>

              {product.subCategory && (
                <p className="mb-3 text-sm text-gray-500">{product.subCategory}</p>
              )}

              <div className="mb-4 flex items-center gap-3">
                <StarRating rating={product.rating} size="lg" />
                <span className="text-sm text-gray-500">{product.reviewCount} reviews</span>
                <span className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                </span>
              </div>

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
                <p className="mt-1 text-xs text-gray-500">Tax included • Free shipping over $50</p>
              </div>

              <p className="mb-6 leading-relaxed text-gray-600">{product.description}</p>

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

              {/* Quantity & Add to Cart */}
              <div className="mb-6 flex flex-wrap gap-4">
                <QuantitySelector
                  quantity={quantity}
                  onQuantityChange={setQuantity}
                  maxStock={10}
                />
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8B4513] to-[#D2691E] py-3 font-semibold text-white transition-all ${
                    product.inStock
                      ? 'hover:scale-[1.02] hover:shadow-lg'
                      : 'cursor-not-allowed opacity-50'
                  }`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart — ${(product.price * quantity).toFixed(2)}
                </button>

                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="rounded-xl border border-gray-300 p-3 transition-colors hover:border-red-500 hover:text-red-500"
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                </button>

                <button className="rounded-xl border border-gray-300 p-3 transition-colors hover:border-[#8B4513] hover:text-[#8B4513]">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>

              {addedToCart && (
                <div className="mb-6 flex items-center gap-2 rounded-xl border border-green-500 bg-green-50 p-3">
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
              <div className="space-y-3 border-t border-gray-100 pt-6 text-sm">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-[#8B4513]" />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-[#8B4513]" />
                  <span>30-day satisfaction guarantee</span>
                </div>
                <div className="flex items-center gap-3">
                  <RefreshCw className="h-5 w-5 text-[#8B4513]" />
                  <span>Easy returns within 30 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section - Description, Specs, Care, Reviews */}
        <div className="mb-8 overflow-hidden rounded-2xl bg-white shadow-lg">
          {/* Tab Buttons */}
          <div className="flex overflow-x-auto border-b border-gray-200">
            {[
              { id: 'description', label: 'Description' },
              { id: 'specs', label: 'Specifications' },
              { id: 'care', label: 'Care Instructions' },
              { id: 'reviews', label: `Reviews (${product.reviewCount})` },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-4 font-semibold whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-b-2 border-[#8B4513] text-[#8B4513]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
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
                  <div key={idx} className="flex justify-between border-b border-gray-100 py-3">
                    <span className="font-semibold text-gray-700">{spec.label}</span>
                    <span className="text-gray-600">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'care' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">Care Instructions</h3>
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
                <div className="flex items-center gap-6 border-b border-gray-200 pb-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900">{product.rating}</div>
                    <StarRating rating={product.rating} size="md" />
                    <div className="mt-1 text-sm text-gray-500">{product.reviewCount} reviews</div>
                  </div>
                  <button className="rounded-lg bg-[#8B4513] px-6 py-2.5 text-white hover:bg-[#5C2E0B]">
                    Write a Review
                  </button>
                </div>

                {product.reviews.length > 0 ? (
                  product.reviews.map(review => <ReviewCard key={review.id} review={review} />)
                ) : (
                  <p className="py-8 text-center text-gray-500">
                    No reviews yet. Be the first to review this product!
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="mb-6 font-serif text-2xl font-bold text-gray-900">You May Also Like</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {relatedProducts.map(related => (
                <RelatedProductCard key={related.id} product={related} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* WhatsApp Floating Button */}
      <div className="fixed right-6 bottom-6 z-40">
        <a
          href="https://wa.me/94712345678?text=Hi%2C%20I%27m%20interested%20in%20this%20product"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex h-14 w-14 items-center justify-center rounded-full bg-green-500 shadow-lg transition-all hover:scale-110"
        >
          <MessageCircle className="h-7 w-7 text-white" />
        </a>
      </div>
    </main>
  );
}
