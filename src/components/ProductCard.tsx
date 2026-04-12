// src/components/ProductCard.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ProductVariant } from '@/data/products';

interface ProductCardProps {
  variant: ProductVariant;
  productName: string;
  basePrice: number;
  productId: number;
}

export default function ProductCard({
  variant,
  productName,
  basePrice,
  productId,
}: ProductCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow transition-all hover:shadow-xl">
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={variant.image}
          alt={`${productName} - ${variant.color}`}
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
        <h3 className="line-clamp-2 text-lg font-semibold">{productName}</h3>
        <p className="mt-1 text-sm text-gray-600">{variant.color}</p>
        <p className="mt-1 font-mono text-xs text-gray-400">
          {variant.sku || variant.serialNumber}
        </p>

        <div className="mt-3 flex items-end justify-between">
          <div>
            <span className="text-xl font-bold text-[var(--accent)]">LKR {basePrice}</span>
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
  );
}
