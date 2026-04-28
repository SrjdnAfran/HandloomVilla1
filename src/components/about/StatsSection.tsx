'use client';

import { useEffect, useState } from 'react';

const stats = [
  { value: 100, suffix: '+', label: 'Skilled Artisans' },
  { value: 50000, suffix: '+', label: 'Happy Customers' },
  { value: 1924, suffix: '', label: 'Year Established', isYear: true },
  { value: 30, suffix: '+', label: 'Countries Served' },
];

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#8B4513] to-[#D2691E] px-6 py-20 text-white">
      <div className="relative mx-auto max-w-5xl">
        <div className="grid gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({
  value,
  suffix,
  label,
  isYear,
}: {
  value: number;
  suffix: string;
  label: string;
  isYear?: boolean;
}) {
  const [count, setCount] = useState(isYear ? value : 0);

  useEffect(() => {
    if (isYear) return;

    const duration = 2000;
    const increment = value / (duration / 30);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 30);

    return () => clearInterval(timer);
  }, [value, isYear]);

  return (
    <div className="transform text-center transition-all duration-300 hover:scale-105">
      <div className="text-5xl font-bold text-amber-300">
        {isYear ? value : count.toLocaleString()}
        {suffix}
      </div>
      <p className="mt-2 text-sm text-amber-100">{label}</p>
    </div>
  );
}
