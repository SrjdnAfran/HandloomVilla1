'use client';

import Link from 'next/link';
import { Calendar, User, ArrowRight, Clock, ChevronRight } from 'lucide-react';
import LazyImage from '@/components/ui/LazyImage';

const blogPosts = [
  {
    id: 1,
    title: 'The Art of Handloom Weaving: A 100-Year Legacy',
    excerpt:
      'Discover the rich history and intricate techniques behind traditional handloom weaving that has been passed down through generations.',
    slug: 'art-of-handloom-weaving',
    image: '/images/blog/handloom-weaving.jpg',
    author: 'Sarah Johnson',
    date: 'April 15, 2024',
    readTime: '6 min read',
    category: 'Craftsmanship',
  },
  {
    id: 2,
    title: 'How to Care for Your Handloom Sarees',
    excerpt:
      'Essential tips and tricks to maintain the beauty and longevity of your precious handloom sarees for years to come.',
    slug: 'care-for-handloom-sarees',
    image: '/images/blog/saree-care.jpg',
    author: 'Meera Patel',
    date: 'April 10, 2024',
    readTime: '4 min read',
    category: 'Care Tips',
  },
  {
    id: 3,
    title: 'Sustainable Fashion: Why Handloom Matters',
    excerpt:
      'Explore how choosing handloom products contributes to sustainable fashion and supports artisan communities.',
    slug: 'sustainable-handloom',
    image: '/images/blog/sustainable.jpg',
    author: 'David Chen',
    date: 'April 5, 2024',
    readTime: '5 min read',
    category: 'Sustainability',
  },
  {
    id: 4,
    title: 'Traditional vs Modern: The Evolution of Handloom',
    excerpt:
      'How handloom designs have evolved through the ages while preserving their authentic charm and cultural significance.',
    slug: 'evolution-of-handloom',
    image: '/images/blog/traditional-modern.jpg',
    author: 'Anita Desai',
    date: 'March 28, 2024',
    readTime: '7 min read',
    category: 'Heritage',
  },
];

function BlogCard({ post, index }: { post: (typeof blogPosts)[0]; index: number }) {
  return (
    <div
      className="group animate-in fade-in slide-in-from-bottom-4 overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-2xl"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image Container */}
      <Link href={`/blog/${post.slug}`}>
        <div className="relative h-52 overflow-hidden bg-gradient-to-br from-amber-100 to-amber-50">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <LazyImage
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            lowQualitySrc="/images/placeholder-low.jpg"
          />
          <div className="absolute top-4 left-4 z-20">
            <span className="rounded-full bg-[#8B4513] px-3 py-1 text-xs font-semibold text-white shadow-md">
              {post.category}
            </span>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        {/* Meta Info */}
        <div className="mb-3 flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/blog/${post.slug}`}>
          <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900 transition-colors hover:text-[#8B4513]">
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="mb-4 line-clamp-2 text-sm text-gray-600">{post.excerpt}</p>

        {/* Author & Link */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-[#8B4513] to-[#D2691E] text-xs font-bold text-white">
              {post.author.charAt(0)}
            </div>
            <span className="text-xs text-gray-500">{post.author}</span>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#8B4513] transition-all duration-200 hover:gap-2"
          >
            Read More
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function BlogTeaser() {
  return (
    <section className="bg-gradient-to-b from-white to-amber-50/30 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2">
            <span className="text-lg text-amber-600">📖</span>
            <span className="text-sm font-medium tracking-wider text-amber-700 uppercase">
              Latest Stories
            </span>
          </div>
          <h2 className="mb-4 font-serif text-3xl font-bold text-[#8B4513] md:text-4xl">
            From Our Blog
          </h2>
          <p className="text-gray-600">
            Insights, stories, and updates from the world of handloom craftsmanship
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {blogPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#8B4513] to-[#D2691E] px-8 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            View All Articles
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
