"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useProductStore } from "@/lib/productStore";

interface Category {
  id: number;
  name: string;
  subCategories: string[];
}

export default function ShopPage() {
  const products = useProductStore((state) => state.products);
  const [categories, setCategories] = useState<Category[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Load Categories
  useEffect(() => {
    const saved = localStorage.getItem("handloomCategories");
    if (saved) setCategories(JSON.parse(saved));
  }, []);

  // Filter Products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === "All" ||
      product.category.includes(selectedCategory);

    const matchesSubCategory = selectedSubCategory === "All" ||
      product.category.includes(selectedSubCategory);

    return matchesSearch && matchesCategory && matchesSubCategory;
  });

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-center mb-4 text-[var(--accent)]">
        Our Handloom Collection
      </h1>
      <p className="text-center text-lg text-gray-600 mb-10">
        Premium Handloom Products from Maruthamunai, Sri Lanka
      </p>

      {/* Filters */}
      <div className="bg-white p-6 rounded-2xl shadow-sm mb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-5 py-3 focus:outline-none focus:border-[var(--accent)]"
            />
          </div>

          {/* Main Category */}
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedSubCategory("All");
            }}
            className="border border-gray-300 rounded-xl px-5 py-3 focus:outline-none focus:border-[var(--accent)]"
          >
            <option value="All">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>

          {/* Sub Category */}
          <select
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(e.target.value)}
            className="border border-gray-300 rounded-xl px-5 py-3 focus:outline-none focus:border-[var(--accent)]"
            disabled={selectedCategory === "All"}
          >
            <option value="All">All Sub Categories</option>
            {categories
              .find(c => c.name === selectedCategory)
              ?.subCategories.map((sub, i) => (
                <option key={i} value={sub}>{sub}</option>
              ))}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition-all group">
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
                <p className="text-sm text-gray-500 mb-3">{product.category}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-[var(--accent)]">
                    LKR {product.price}
                  </span>
                  <Link
                    href={`/product/${product.id}`}
                    className="text-[var(--accent)] hover:underline font-medium"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-gray-500">
            No products found matching your filter.
          </div>
        )}
      </div>
    </div>
  );
}