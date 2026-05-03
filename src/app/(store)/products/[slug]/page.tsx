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

type ProductVariant = {
  id: string;
  color: string;
  colorCode?: string;
  image: string;
  stock: number;
  serialNumber: string;
  sku: string;
  slug: string;
  isDefault?: boolean;
};

type Product = {
  id: number;
  name: string;
  skuPrefix: string;
  category: string;
  subCategory?: string;
  description?: string;
  basePrice: number;
  materials?: string;
  careInstructions?: string;
  variants: ProductVariant[];
  isFeatured?: boolean;
  createdAt: Date;
};

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

function ImageGallery({ images, productName }: { images: string[]; productName: string }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const displayImages = images && images.length > 0 ? images : ['/images/placeholder.jpg'];

  return (
    <div className="space-y-4">
      <div
        className="relative aspect-square cursor-zoom-in overflow-hidden rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <Image
          src={displayImages[selectedImage]}
          alt={`${productName} - view ${selectedImage + 1}`}
          fill
          className={`object-cover transition-transform duration-500 ${isZoomed ? 'scale-150' : 'scale-100'}`}
          priority
        />
      </div>

      {displayImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {displayImages.map((img, idx) => (
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

function VariantSelector({
  variants,
  selectedVariant,
  onVariantChange,
}: {
  variants: ProductVariant[];
  selectedVariant: ProductVariant | null;
  onVariantChange: (variant: ProductVariant) => void;
}) {
  if (!variants || variants.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <h3 className="mb-3 font-semibold text-gray-900">Select Color:</h3>
      <div className="flex flex-wrap gap-3">
        {variants.map(variant => (
          <button
            key={variant.id}
            onClick={() => onVariantChange(variant)}
            className={`group relative flex flex-col items-center gap-1 rounded-lg p-2 transition-all ${
              selectedVariant?.id === variant.id
                ? 'ring-2 ring-[#8B4513] ring-offset-2'
                : 'hover:bg-gray-50'
            }`}
          >
            {variant.colorCode ? (
              <div
                className="h-10 w-10 rounded-full border shadow-sm"
                style={{ backgroundColor: variant.colorCode }}
                title={variant.color}
              />
            ) : (
              <div className="relative h-10 w-10 overflow-hidden rounded-lg border">
                <Image src={variant.image} alt={variant.color} fill className="object-cover" />
              </div>
            )}
            <span className="text-xs font-medium text-gray-700">{variant.color}</span>
            {variant.stock === 0 && (
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500" />
            )}
          </button>
        ))}
      </div>
      <p className="mt-2 text-xs text-gray-500">
        {selectedVariant && selectedVariant.stock > 0
          ? `${selectedVariant.stock} units available`
          : 'Out of stock'}
      </p>
    </div>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'care' | 'reviews'>(
    'description'
  );
  const [addedToCart, setAddedToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { addToCart } = useCart();

  useEffect(() => {
    if (!slug) return;

    setIsLoading(true);
    setError(null);

    fetch(`/api/products?slug=${slug}`)
      .then(res => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      })
      .then(data => {
        if (!data || data.length === 0) throw new Error('Product not found');

        // Find product by slug in variants
        let foundProduct: Product | null = null;
        let foundVariant: ProductVariant | null = null;

        for (const product of data) {
          const variant = product.variants?.find((v: ProductVariant) => v.slug === slug);
          if (variant) {
            foundProduct = product;
            foundVariant = variant;
            break;
          }
        }

        if (!foundProduct || !foundVariant) throw new Error('Product not found');

        setProduct(foundProduct);
        setSelectedVariant(foundVariant);

        // Fetch related products
        if (foundProduct.category) {
          return fetch(`/api/products?category=${encodeURIComponent(foundProduct.category)}`);
        }
        return null;
      })
      .then(res => res?.json())
      .then(relatedData => {
        if (relatedData && Array.isArray(relatedData)) {
          const filtered = relatedData.filter((p: Product) => p.id !== product?.id).slice(0, 4);
          setRelatedProducts(filtered);
        }
      })
      .catch(err => {
        console.error('Error fetching product:', err);
        setError(err.message);
      })
      .finally(() => setIsLoading(false));
  }, [slug, product?.id]);

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;

    addToCart({
      id: selectedVariant.id,
      productId: product.id,
      name: `${product.name} - ${selectedVariant.color}`,
      price: product.basePrice,
      quantity: quantity,
      image: selectedVariant.image,
      sku: selectedVariant.sku,
      color: selectedVariant.color,
      inStock: selectedVariant.stock > 0,
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

  if (error || !product || !selectedVariant) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
        <p className="mb-4 text-red-600">{error || 'Product not found'}</p>
        <Link href="/shop" className="text-[#8B4513] hover:underline">
          ← Back to Shop
        </Link>
      </div>
    );
  }

  const safePrice =
    product.basePrice !== undefined && !isNaN(product.basePrice) && product.basePrice > 0
      ? product.basePrice.toFixed(2)
      : '0.00';

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
            <span className="font-medium text-gray-900">
              {product.name} - {selectedVariant.color}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Main Product Section */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-lg md:p-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <ImageGallery
              images={product.variants?.map(v => v.image) || []}
              productName={product.name}
            />

            <div>
              <div className="mb-4 flex gap-2">
                {product.isFeatured && (
                  <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white">
                    Bestseller
                  </span>
                )}
              </div>

              <h1 className="mb-2 font-serif text-2xl font-bold text-gray-900 md:text-3xl">
                {product.name} - {selectedVariant.color}
              </h1>

              {product.subCategory && (
                <p className="mb-3 text-sm text-gray-500">{product.subCategory}</p>
              )}

              <div className="mb-4 flex items-center gap-3">
                <StarRating rating={4.8} size="lg" />
                <span className="text-sm text-gray-500">24 reviews</span>
                <span
                  className={`text-sm ${selectedVariant.stock > 0 ? 'text-green-600' : 'text-red-600'}`}
                >
                  {selectedVariant.stock > 0 ? '✓ In Stock' : '✗ Out of Stock'}
                </span>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-[#8B4513]">${safePrice}</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">Tax included • Free shipping over $50</p>
              </div>

              <p className="mb-6 leading-relaxed text-gray-600">
                {product.description || 'No description available.'}
              </p>

              <VariantSelector
                variants={product.variants}
                selectedVariant={selectedVariant}
                onVariantChange={setSelectedVariant}
              />

              <div className="mb-6 flex flex-wrap gap-4">
                <QuantitySelector
                  quantity={quantity}
                  onQuantityChange={setQuantity}
                  maxStock={selectedVariant.stock}
                />
                <button
                  onClick={handleAddToCart}
                  disabled={selectedVariant.stock === 0}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8B4513] to-[#D2691E] py-3 font-semibold text-white transition-all ${
                    selectedVariant.stock > 0
                      ? 'hover:scale-[1.02] hover:shadow-lg'
                      : 'cursor-not-allowed opacity-50'
                  }`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart — ${(parseFloat(safePrice) * quantity).toFixed(2)}
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

        {/* Tabs Section */}
        <div className="mb-8 overflow-hidden rounded-2xl bg-white shadow-lg">
          <div className="flex overflow-x-auto border-b border-gray-200">
            {[
              { id: 'description', label: 'Description' },
              { id: 'specs', label: 'Specifications' },
              { id: 'care', label: 'Care Instructions' },
              { id: 'reviews', label: 'Reviews' },
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
                <p className="leading-relaxed text-gray-600">
                  {product.description || 'No description available.'}
                </p>
                {product.materials && (
                  <>
                    <h3 className="text-lg font-bold text-gray-900">Materials</h3>
                    <p className="text-gray-600">{product.materials}</p>
                  </>
                )}
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex justify-between border-b border-gray-100 py-3">
                  <span className="font-semibold text-gray-700">SKU</span>
                  <span className="font-mono text-gray-600">{selectedVariant.sku}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 py-3">
                  <span className="font-semibold text-gray-700">Category</span>
                  <span className="text-gray-600">{product.category}</span>
                </div>
                {product.subCategory && (
                  <div className="flex justify-between border-b border-gray-100 py-3">
                    <span className="font-semibold text-gray-700">Sub Category</span>
                    <span className="text-gray-600">{product.subCategory}</span>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'care' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">Care Instructions</h3>
                <p className="text-gray-600">
                  {product.careInstructions || 'Dry clean only. Store in a cool, dry place.'}
                </p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center gap-6 border-b border-gray-200 pb-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900">4.8</div>
                    <StarRating rating={4.8} size="md" />
                    <div className="mt-1 text-sm text-gray-500">24 reviews</div>
                  </div>
                  <button className="rounded-lg bg-[#8B4513] px-6 py-2.5 text-white hover:bg-[#5C2E0B]">
                    Write a Review
                  </button>
                </div>
                <p className="py-8 text-center text-gray-500">
                  No reviews yet. Be the first to review this product!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="mb-6 font-serif text-2xl font-bold text-gray-900">You May Also Like</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {relatedProducts.map(related => {
                const defaultVariant = related.variants?.[0];
                const relatedPrice =
                  related.basePrice !== undefined &&
                  !isNaN(related.basePrice) &&
                  related.basePrice > 0
                    ? related.basePrice.toFixed(2)
                    : '0.00';
                return (
                  <Link key={related.id} href={`/products/${related.id}`}>
                    <div className="group cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl">
                      <div className="relative h-40 bg-gradient-to-br from-amber-100 to-amber-50">
                        <Image
                          src={defaultVariant?.image || '/images/placeholder.jpg'}
                          alt={related.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="mb-1 line-clamp-2 text-sm font-bold text-gray-900 transition-colors group-hover:text-[#8B4513]">
                          {related.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-[#8B4513]">${relatedPrice}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
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
