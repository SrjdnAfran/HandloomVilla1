import { products } from "@/data/products";
import Image from "next/image";
import Link from "next/link";

export default function ShopPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-center mb-4 text-[var(--accent)]">
        Our Handloom Collection
      </h1>
      <p className="text-center text-lg text-[var(--text-muted)] mb-12 max-w-3xl mx-auto">
        Discover authentic handwoven sarees, kurtis, dupattas and more — crafted with love by artisans in Singapore
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-sm text-[var(--text-muted)] mb-3">
                {product.fabric ? `${product.fabric} • ` : ""}
                {product.category}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-[var(--accent)]">
                  SGD {product.price}
                </span>
                <Link
                  href={`/product/${product.id}`}
                  className="bg-[var(--accent)] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-700 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}