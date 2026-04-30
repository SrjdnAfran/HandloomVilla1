'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    title: 'Cotton Sarees',
    description: 'Soft, breathable cotton sarees crafted for everyday elegance and comfort',
    href: '/shop',
    image: '/images/categories/cotton-saree.jpg',
    color: 'from-rose-500 to-rose-600',
  },
  {
    title: 'Silk Sarees',
    description: 'Elegant silk sarees with a luxurious finish for special occasions',
    href: '/shop',
    image: '/images/categories/silk-saree.jpg',
    color: 'from-purple-500 to-purple-600',
  },
  {
    title: 'Embroidery Sarees',
    description: 'Beautifully embroidered sarees showcasing timeless craftsmanship',
    href: '/shop',
    image: '/images/categories/embroidery-saree.jpg',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    title: "Men's Collection",
    description: 'Premium handloom sarongs in cotton, silk, and embroidered designs',
    href: '/shop',
    image: '/images/categories/mens-sarong.jpg',
    color: 'from-amber-500 to-amber-600',
    subcategories: [
      {
        title: 'Cotton Sarongs',
        href: '/shop',
      },
      {
        title: 'Silk Sarongs',
        href: '/shop',
      },
      {
        title: 'Embroidery Sarongs',
        href: '/shop',
      },
    ],
  },
];

export default function CategoryCards() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-sm font-semibold tracking-wider text-[#8B4513] uppercase">
            Our Collections
          </span>
          <h2 className="mt-2 mb-4 font-serif text-3xl font-bold text-gray-900 md:text-4xl">
            Shop by Category
          </h2>
          <p className="text-gray-600">Explore our curated collection of handloom treasures</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map(category => (
            <Link key={category.title} href={category.href}>
              <div className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:shadow-2xl">
                <div className="relative h-64">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                </div>
                <div className="absolute right-0 bottom-0 left-0 p-6 text-white">
                  <h3 className="mb-1 text-xl font-bold">{category.title}</h3>
                  <p className="mb-3 text-sm text-white/80">{category.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold transition-all group-hover:gap-2">
                    Shop Now <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
