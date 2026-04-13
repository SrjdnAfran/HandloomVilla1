'use client';

import { useState, useEffect } from 'react';
import {
  ChevronRight,
  Heart,
  Award,
  Users,
  Leaf,
  Sparkles,
  Clock,
  Star,
  TrendingUp,
  Shield,
  Eye,
  Target,
  Quote,
  Zap,
} from 'lucide-react';

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="overflow-x-hidden bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section - Enhanced */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#001a4a] via-[#002361] to-[#003887] px-6 py-28 text-white md:py-36">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 animate-pulse rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 animate-pulse rounded-full bg-purple-500/20 blur-3xl delay-1000" />
          <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium tracking-wide">Est. 1924</span>
              <Sparkles className="ml-1 h-4 w-4" />
            </div>
            <h1 className="mb-6 font-serif text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              A Legacy Woven with
              <span className="mt-2 block text-amber-400">Tradition & Excellence</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg font-light text-blue-100 md:text-xl">
              For over a century, we have transformed threads into masterpieces — bringing the soul
              of Maruthamunai's handloom heritage to the world.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div
                    key={i}
                    className="h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br from-amber-400 to-amber-600"
                  />
                ))}
              </div>
              <span className="text-sm text-blue-200">Trusted by 10,000+ customers worldwide</span>
            </div>
          </div>
        </div>

        {/* Decorative Bottom Wave */}
        <div className="absolute right-0 bottom-0 left-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path
              fill="#f8fafc"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>
      </section>

      {/* Introduction - Maruthamunai Heritage - Enhanced */}
      <section className="container mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="animate-in fade-in slide-in-from-left-4 duration-700">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2">
              <Heart className="h-4 w-4 text-[#002361]" />
              <span className="text-sm font-medium tracking-wide text-[#002361] uppercase">
                The Heart of Eastern Sri Lanka
              </span>
            </div>
            <h2 className="mb-6 font-serif text-3xl font-bold text-[#002361] md:text-4xl lg:text-5xl">
              The Heritage of Maruthamunai
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="leading-relaxed">
                Nestled in the heart of Sri Lanka's Eastern Province, the village of Maruthamunai is
                renowned for its rich heritage in handloom weaving. For generations, this vibrant
                community has preserved and perfected the art of crafting exquisite handloom
                products.
              </p>
              <p className="leading-relaxed">
                In Maruthamunai, handloom is not merely an occupation — it is a way of life. Almost
                every household is connected to this timeless tradition, and families contribute
                their skills and passion to sustain an industry deeply rooted in culture and
                craftsmanship.
              </p>
              <p className="leading-relaxed">
                Whether employed elsewhere or not, nearly every family in the village participates
                in the production of handloom textiles. This collective effort ensures that the
                knowledge and techniques of this ancient craft are passed down through generations.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600">
                  <span className="font-bold text-white">100+</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Active Artisans</p>
                  <p className="font-semibold text-gray-900">Skilled Weavers</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600">
                  <span className="font-bold text-white">50K+</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Products Sold</p>
                  <p className="font-semibold text-gray-900">Happy Customers</p>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-in fade-in slide-in-from-right-4 relative delay-200 duration-700">
            <div className="group relative overflow-hidden rounded-2xl shadow-2xl">
              <div className="absolute inset-0 z-10 bg-gradient-to-br from-[#002361]/20 to-[#004080]/20" />
              <div className="relative flex h-96 w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#002361]/10 via-gray-100 to-[#002361]/5">
                <div className="z-20 text-center">
                  <div className="mb-4 animate-bounce text-8xl">🧵</div>
                  <span className="font-serif text-2xl font-bold text-[#002361]">Maruthamunai</span>
                  <p className="mt-2 text-gray-500">The Village of Weavers</p>
                </div>
                {/* Animated pattern overlay */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 h-20 w-20 border-t-2 border-l-2 border-[#002361]" />
                  <div className="absolute right-0 bottom-0 h-20 w-20 border-r-2 border-b-2 border-[#002361]" />
                </div>
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-amber-400/20 blur-2xl" />
          </div>
        </div>
      </section>

      {/* Legacy Section - Enhanced */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#002361]/5 via-[#002361]/10 to-[#002361]/5 px-6 py-24">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-[#002361]/10 px-6 py-2">
            <Award className="h-5 w-5 text-[#002361]" />
            <span className="font-mono text-sm font-semibold tracking-wider text-[#002361] uppercase">
              A Century of Craftsmanship
            </span>
          </div>
          <h2 className="mb-6 font-serif text-4xl font-bold text-[#002361] md:text-5xl lg:text-6xl">
            Our Legacy Since 1924
          </h2>
          <div className="space-y-6 text-lg leading-relaxed text-gray-700">
            <p>
              Handloom Villa is built upon a foundation of experience and trust that spans more than
              a century. Since 1924, our family has actively contributed to the growth and
              excellence of the handloom industry.
            </p>
            <p>
              This legacy has been shaped by generations of skilled craftsmen who have devoted their
              lives to mastering the art of weaving. Today, we proudly continue this tradition by
              blending time-honored techniques with modern quality standards.
            </p>
            <p className="font-semibold text-[#002361]">
              Our mission is to deliver products that embody the spirit of Sri Lankan culture while
              meeting the expectations of contemporary customers around the world.
            </p>
          </div>

          {/* Timeline Decoration */}
          <div className="mt-12 flex justify-center gap-2">
            {[1924, 1950, 1980, 2000, 2024].map((year, idx) => (
              <div key={idx} className="text-center">
                <div className="h-2 w-12 rounded-full bg-[#002361]/20" />
                <p className="mt-2 text-xs text-gray-500">{year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline - Enhanced */}
      <section className="container mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2">
            <Zap className="h-4 w-4 text-amber-600" />
            <span className="text-sm font-medium tracking-wide text-amber-700 uppercase">
              From Thread to Treasure
            </span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-[#002361] md:text-4xl lg:text-5xl">
            The Journey of a Handloom Product
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Creating a handloom product is a meticulous and collaborative process involving multiple
            stages and skilled individuals. Each piece tells a story of dedication and artistry.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-5">
          {[
            {
              step: '01',
              title: 'Premium Yarn',
              desc: 'Only the finest yarn is chosen for durability, comfort, and elegance.',
              icon: '🧵',
              color: 'from-blue-500 to-blue-600',
            },
            {
              step: '02',
              title: 'Expert Dyeing',
              desc: 'Carefully dyed using refined techniques for vibrant, long-lasting colors.',
              icon: '🎨',
              color: 'from-purple-500 to-purple-600',
            },
            {
              step: '03',
              title: 'Traditional Weaving',
              desc: 'Skilled artisans weave intricate patterns on hand-operated looms.',
              icon: '🪢',
              color: 'from-amber-500 to-amber-600',
            },
            {
              step: '04',
              title: 'Quality Inspection',
              desc: 'Thorough checks ensure perfection in design, texture, and finish.',
              icon: '✅',
              color: 'from-green-500 to-green-600',
            },
            {
              step: '05',
              title: 'Finishing',
              desc: 'Prepared with care before reaching our valued customers.',
              icon: '✨',
              color: 'from-pink-500 to-pink-600',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="group animate-in fade-in slide-in-from-bottom-4 relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div
                  className={`absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r ${item.color} px-4 py-1 text-xs font-bold text-white shadow-lg`}
                >
                  {item.step}
                </div>
                <div className="mt-6 mb-4 text-5xl transition-transform group-hover:scale-110">
                  {item.icon}
                </div>
                <h3 className="mb-2 font-serif text-lg font-bold text-[#002361]">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
              {index < 4 && (
                <div className="absolute top-1/2 -right-4 hidden -translate-y-1/2 text-[#002361]/30 md:block">
                  <ChevronRight className="h-6 w-6" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us - Enhanced */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white px-6 py-20 md:py-28">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-0 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2">
              <Star className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium tracking-wide text-green-700 uppercase">
                Why Choose Us
              </span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#002361] md:text-4xl lg:text-5xl">
              Why Choose Handloom Villa?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              We combine tradition with excellence to bring you the finest handloom products
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Award,
                title: 'A Century of Experience',
                desc: 'Heritage dating back to 1924, built on generations of knowledge and craftsmanship.',
                color: 'from-amber-400 to-amber-600',
              },
              {
                icon: Sparkles,
                title: 'Premium Quality Yarn',
                desc: 'Only the finest yarn ensures comfort, durability, and a luxurious feel.',
                color: 'from-blue-400 to-blue-600',
              },
              {
                icon: Heart,
                title: 'Exceptional Dyeing',
                desc: 'Specialized methods enhance vibrancy and longevity for outstanding results.',
                color: 'from-purple-400 to-purple-600',
              },
              {
                icon: Shield,
                title: '5-Year Color Guarantee',
                desc: 'We proudly guarantee color quality for up to five years — a testament to our superior process.',
                color: 'from-green-400 to-green-600',
              },
              {
                icon: Users,
                title: 'Authentic Handcrafted',
                desc: 'Every item is meticulously handcrafted by skilled artisans.',
                color: 'from-pink-400 to-pink-600',
              },
              {
                icon: TrendingUp,
                title: 'Community Empowerment',
                desc: 'Your support sustains the livelihoods of talented artisans in Maruthamunai.',
                color: 'from-indigo-400 to-indigo-600',
              },
              {
                icon: Leaf,
                title: 'Timeless Sustainability',
                desc: 'Eco-friendly products that combine tradition with modern style.',
                color: 'from-emerald-400 to-emerald-600',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group animate-in fade-in slide-in-from-bottom-4 rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`mb-5 inline-flex rounded-2xl bg-gradient-to-r ${item.color} p-3 text-white shadow-lg transition-all group-hover:scale-110`}
                >
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 font-serif text-xl font-bold text-[#002361]">{item.title}</h3>
                <p className="leading-relaxed text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission - Enhanced */}
      <section className="container mx-auto max-w-5xl px-6 py-20 md:py-28">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#002361]/5 to-[#002361]/10 p-10 text-center transition-all duration-300 hover:shadow-2xl">
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            <div className="relative">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg">
                <Eye className="h-10 w-10 text-white" />
              </div>
              <h3 className="mb-4 font-serif text-2xl font-bold text-[#002361]">Our Vision</h3>
              <p className="leading-relaxed text-gray-700">
                To preserve and promote the rich heritage of handloom craftsmanship while delivering
                premium-quality products to customers worldwide.
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/50 p-10 text-center transition-all duration-300 hover:shadow-2xl">
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            <div className="relative">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-amber-600 shadow-lg">
                <Target className="h-10 w-10 text-white" />
              </div>
              <h3 className="mb-4 font-serif text-2xl font-bold text-[#002361]">Our Mission</h3>
              <p className="leading-relaxed text-gray-700">
                To empower local artisans, uphold traditional weaving techniques, and provide
                sustainable, high-quality textiles that reflect elegance, durability, and cultural
                pride.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Fixed without problematic SVG */}
      <section className="relative overflow-hidden bg-[#002361] px-6 py-20 text-white">
        {/* Simple pattern overlay without inline SVG data URL */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="transform text-center transition-all duration-300 hover:scale-105">
              <div className="text-5xl font-bold text-amber-400">100+</div>
              <p className="mt-2 text-sm text-blue-200">Skilled Artisans</p>
            </div>
            <div className="transform text-center transition-all duration-300 hover:scale-105">
              <div className="text-5xl font-bold text-amber-400">50K+</div>
              <p className="mt-2 text-sm text-blue-200">Happy Customers</p>
            </div>
            <div className="transform text-center transition-all duration-300 hover:scale-105">
              <div className="text-5xl font-bold text-amber-400">1924</div>
              <p className="mt-2 text-sm text-blue-200">Year Established</p>
            </div>
            <div className="transform text-center transition-all duration-300 hover:scale-105">
              <div className="text-5xl font-bold text-amber-400">30+</div>
              <p className="mt-2 text-sm text-blue-200">Countries Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Section - Enhanced */}
      <section className="relative overflow-hidden px-6 py-28 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50" />
        <div className="relative mx-auto max-w-4xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-amber-100 px-6 py-3">
            <Quote className="h-5 w-5 text-amber-600" />
            <span className="text-sm font-medium text-amber-700 uppercase">Our Promise</span>
          </div>
          <h2 className="mb-6 font-serif text-4xl font-bold text-[#002361] md:text-5xl lg:text-6xl">
            Experience the Art of <span className="text-amber-600">True Craftsmanship</span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-700">
            At Handloom Villa, every thread tells a story, every design reflects heritage, and every
            product embodies excellence. When you choose us, you are not just purchasing a textile —
            you are embracing a legacy of tradition, supporting skilled artisans, and celebrating
            the beauty of authentic Sri Lankan craftsmanship.
          </p>
          <div className="my-10 flex justify-center">
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#002361] to-transparent" />
          </div>
          <p className="font-serif text-3xl text-[#002361] italic md:text-4xl">
            "Handloom Villa — Where Tradition Meets Timeless Elegance."
          </p>
          <div className="mt-12">
            <button className="group inline-flex items-center gap-2 rounded-full bg-[#002361] px-8 py-3 font-semibold text-white transition-all hover:gap-3 hover:bg-[#001a4a] hover:shadow-xl">
              Discover Our Collection
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
