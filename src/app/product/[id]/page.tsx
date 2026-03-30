import { products } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { notFound } from "next/navigation";
import { useCartStore } from "@/lib/cartStore";
import AddToCartButton from "@/components/AddToCartButton";

// Define the expected shape (for TypeScript safety)
type Params = Promise<{ id: string }>;

interface ProductPageProps {
  params: Params;
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Await the Promise here – this is the key fix for Next.js 15
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id, 10);

  const product = products.find((p) => p.id === productId);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 text-gray-700 hover:text-[var(--accent)] mb-8 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        {/* Product Image */}
        <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-50 shadow-lg">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-[var(--accent)]">
              LKR {product.price}
            </span>
            {product.fabric && (
              <span className="text-lg text-[var(--text-muted)]">
                • {product.fabric}
              </span>
            )}
          </div>

          <div className="space-y-6 mb-10">
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Category</h3>
              <p className="text-gray-700">{product.category}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Available Options</h3>
              <p className="text-gray-500 italic">
                Sizes / Colors / Blouse piece options coming soon...
              </p>
            </div>
          </div>

          <AddToCartButton product={product} />

          <p className="mt-4 text-sm text-gray-500 text-center md:text-left">
            * Free shipping on orders above LKR 300 in Singapore
          </p>
        </div>
      </div>
    </div>
  );
}