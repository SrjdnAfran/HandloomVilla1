// src/app/product/[slug]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Plus, Minus, Check } from 'lucide-react';
import { useProductStore, CartItem } from '@/lib/productStore';
import { notFound } from 'next/navigation';

export default function VariantPage({ params }: { params: Promise<{ slug: string }> }) {
  const [variant, setVariant] = useState<any>(null);
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const products = useProductStore(state => state.products);
  const addToCart = useProductStore(state => state.addToCart);

  useEffect(() => {
    params.then(async p => {
      const slug = p.slug;

      // Find the variant by slug
      let foundVariant = null;
      let parentProduct = null;

      for (const prod of products) {
        const variant_match = prod.variants.find(v => v.slug === slug || v.id === slug);
        if (variant_match) {
          foundVariant = variant_match;
          parentProduct = prod;
          break;
        }
      }

      if (!foundVariant || !parentProduct) {
        notFound();
        return;
      }

      setVariant(foundVariant);
      setProduct(parentProduct);
    });
  }, [params, products]);

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: variant.id,
      productId: product.id,
      name: `${product.name} - ${variant.color}`,
      price: product.basePrice,
      quantity: quantity,
      image: variant.image,
      sku: variant.sku || variant.serialNumber,
      color: variant.color,
    };

    addToCart(cartItem);

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  if (!product || !variant) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-[var(--accent)]"></div>
      </div>
    );
  }

  // Get other variants of the same product
  const otherVariants = product.variants.filter((v: any) => v.id !== variant.id);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Success Message */}
      {showSuccess && (
        <div className="animate-in slide-in-from-top-2 fixed top-20 right-4 z-50 flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-white shadow-lg">
          <Check size={18} />
          Added to cart!
        </div>
      )}

      <Link
        href="/shop"
        className="mb-8 inline-flex items-center gap-2 text-gray-600 transition-colors hover:text-[var(--accent)]"
      >
        <ArrowLeft size={20} /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Main Image */}
        <div className="sticky top-8">
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-gray-100 shadow-xl lg:aspect-[3/4]">
            <Image
              src={variant.image}
              alt={`${product.name} - ${variant.color}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Product Info */}
        <div>
          {/* Breadcrumb */}
          <div className="mb-4 text-sm text-gray-500">
            <Link href="/shop" className="hover:underline">
              Shop
            </Link>
            {' > '}
            <span className="text-gray-900">{product.name}</span>
            {' > '}
            <span className="text-gray-900">{variant.color}</span>
          </div>

          <h1 className="mb-2 font-serif text-4xl font-bold">{product.name}</h1>
          <p className="mb-2 text-gray-600">
            {product.category} {product.subCategory && `- ${product.subCategory}`}
          </p>

          {/* SKU */}
          <p className="mb-4 font-mono text-xs text-gray-400">
            SKU: {variant.sku || variant.serialNumber}
          </p>

          {/* Color Display */}
          <div className="mb-4 flex items-center gap-2">
            <span className="text-sm font-medium">Color:</span>
            <div className="flex items-center gap-2">
              {variant.colorCode && (
                <div
                  className="h-6 w-6 rounded-full border shadow-sm"
                  style={{ backgroundColor: variant.colorCode }}
                />
              )}
              <span className="font-semibold">{variant.color}</span>
            </div>
          </div>

          <div className="mb-6 text-3xl font-bold text-[var(--accent)]">
            LKR {product.basePrice}
          </div>

          <p className="mb-8 leading-relaxed text-gray-700">{product.description}</p>

          {/* Stock Status */}
          <div className="mb-6 rounded-xl bg-gray-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Availability:</span>
              {variant.stock > 10 ? (
                <span className="font-medium text-green-600">
                  ✓ In Stock ({variant.stock} available)
                </span>
              ) : variant.stock > 0 ? (
                <span className="font-medium text-yellow-600">
                  ⚠ Only {variant.stock} left in stock
                </span>
              ) : (
                <span className="font-medium text-red-600">✗ Out of Stock</span>
              )}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mb-8">
            <label className="mb-2 block text-sm font-medium">Quantity</label>
            <div className="flex items-center gap-4">
              <div className="flex items-center rounded-xl border">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100 disabled:opacity-50"
                  disabled={quantity <= 1}
                >
                  <Minus size={18} />
                </button>
                <span className="w-16 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(variant.stock, quantity + 1))}
                  className="px-4 py-2 hover:bg-gray-100 disabled:opacity-50"
                  disabled={quantity >= variant.stock || variant.stock === 0}
                >
                  <Plus size={18} />
                </button>
              </div>
              <p className="text-sm text-gray-500">Max {variant.stock} available</p>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={variant.stock === 0}
            className={`flex w-full items-center justify-center gap-3 rounded-2xl py-4 text-lg font-medium text-white transition-all ${
              variant.stock > 0
                ? 'bg-[var(--accent)] hover:bg-[var(--accent-hover)]'
                : 'cursor-not-allowed bg-gray-400'
            }`}
          >
            <ShoppingCart size={24} />
            {variant.stock > 0
              ? `Add to Cart — LKR ${product.basePrice * quantity}`
              : 'Out of Stock'}
          </button>

          {/* Product Details Section */}
          <div className="mt-8 border-t pt-8">
            <h3 className="mb-3 font-semibold">Product Details</h3>
            {product.materials && (
              <p className="mb-2 text-sm text-gray-600">
                <strong>Materials:</strong> {product.materials}
              </p>
            )}
            {product.careInstructions && (
              <p className="text-sm text-gray-600">
                <strong>Care Instructions:</strong> {product.careInstructions}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Other Variants Section */}
      {otherVariants.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">Other Available Colors</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
            {otherVariants.map((otherVariant: any) => (
              <Link href={`/product/${otherVariant.slug || otherVariant.id}`} key={otherVariant.id}>
                <div className="group cursor-pointer overflow-hidden rounded-2xl border transition-all hover:shadow-lg">
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <Image
                      src={otherVariant.image}
                      alt={otherVariant.color}
                      fill
                      sizes="(max-width: 768px) 50vw, 16vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3 text-center">
                    <p className="font-medium">{otherVariant.color}</p>
                    <p className="text-sm text-gray-500">LKR {product.basePrice}</p>
                    {otherVariant.stock < 5 && otherVariant.stock > 0 && (
                      <p className="mt-1 text-xs text-yellow-600">Low stock</p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
