import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100">
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-lg line-clamp-2 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-3">
          {product.fabric} • {product.category}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-[#c2410c]">
            SGD {product.price}
          </span>
          <Link
            href={`/product/${product.id}`}
            className="text-sm font-medium text-[#c2410c] hover:underline"
          >
            View →
          </Link>
        </div>
      </div>
    </div>
  );
}