'use client';

import { Award, Leaf, Shield, Clock, Heart, Gem, Users, Truck } from 'lucide-react';

const benefits = [
  {
    title: 'Authentic Handloom',
    description: '100% genuine handwoven products from master weavers',
    icon: Award,
  },
  {
    title: 'Ethically Sourced',
    description: 'Direct partnership with artisan communities',
    icon: Heart,
  },
  {
    title: 'Quality Guaranteed',
    description: 'Rigorous quality checks on every product',
    icon: Shield,
  },
  {
    title: 'Free Shipping',
    description: 'On orders over $50 worldwide',
    icon: Truck,
  },
  {
    title: 'Easy Returns',
    description: '30-day return policy for your peace of mind',
    icon: Clock,
  },
  {
    title: 'Premium Quality',
    description: 'Only the finest handloom fabrics',
    icon: Gem,
  },
  {
    title: 'Eco-Friendly',
    description: 'Natural dyes and sustainable practices',
    icon: Leaf,
  },
  {
    title: '10k+ Happy Customers',
    description: 'Trusted by customers worldwide',
    icon: Users,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-sm font-semibold tracking-wider text-[#8B4513] uppercase">
            Why Choose Us
          </span>
          <h2 className="mt-2 mb-4 font-serif text-3xl font-bold text-gray-900 md:text-4xl">
            The HandloomVilla Promise
          </h2>
          <p className="text-gray-600">
            We bring you the finest handloom products with integrity and care
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div key={benefit.title} className="group text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#8B4513]/10 transition-colors duration-300 group-hover:bg-[#8B4513]">
                <benefit.icon className="h-8 w-8 text-[#8B4513] transition-colors duration-300 group-hover:text-white" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">{benefit.title}</h3>
              <p className="text-sm text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
