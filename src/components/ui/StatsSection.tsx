'use client';

import { useEffect, useState } from 'react';
import {
  Users,
  Package,
  Globe,
  Heart,
  Clock,
  Award,
  Star,
  Truck,
  Leaf,
  Sparkles,
} from 'lucide-react';

type StatItem = {
  value: number;
  suffix?: string;
  label: string;
  iconName: keyof typeof iconMap; // Use icon name instead of component
  isYear?: boolean;
  prefix?: string;
};

// Map icon names to actual components
const iconMap = {
  Users,
  Package,
  Globe,
  Heart,
  Clock,
  Award,
  Star,
  Truck,
  Leaf,
  Sparkles,
};

const defaultStats: StatItem[] = [
  { value: 100, suffix: '+', label: 'Skilled Artisans', iconName: 'Users' },
  { value: 50000, suffix: '+', label: 'Happy Customers', iconName: 'Heart' },
  { value: 1924, label: 'Year Established', iconName: 'Clock', isYear: true },
  { value: 30, suffix: '+', label: 'Countries Served', iconName: 'Globe' },
];

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const [count, setCount] = useState(stat.isYear ? stat.value : 0);
  const [isVisible, setIsVisible] = useState(false);
  const Icon = iconMap[stat.iconName];

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById(`stat-${index}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [index]);

  useEffect(() => {
    if (!isVisible || stat.isYear) return;

    const duration = 2000;
    const increment = stat.value / (duration / 30);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.value) {
        setCount(stat.value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 30);

    return () => clearInterval(timer);
  }, [isVisible, stat.value, stat.isYear]);

  return (
    <div
      id={`stat-${index}`}
      className="group transform text-center transition-all duration-500 hover:scale-105"
    >
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30">
        <Icon className="h-8 w-8 text-white" />
      </div>
      <div className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
        {stat.prefix && <span className="text-2xl md:text-3xl">{stat.prefix}</span>}
        {stat.isYear ? stat.value : count.toLocaleString()}
        {stat.suffix && <span className="text-2xl md:text-3xl">{stat.suffix}</span>}
      </div>
      <p className="mt-2 text-sm font-medium text-white/80 md:text-base">{stat.label}</p>
    </div>
  );
}

interface StatsSectionProps {
  stats?: StatItem[];
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  title?: string;
  subtitle?: string;
}

export default function StatsSection({
  stats = defaultStats,
  bgColor = 'from-[#8B4513] to-[#D2691E]',
  textColor = 'text-white',
  accentColor = 'text-amber-300',
  title,
  subtitle,
}: StatsSectionProps) {
  return (
    <section className={`relative overflow-hidden bg-gradient-to-r ${bgColor} px-6 py-16 md:py-20`}>
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0 bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.5'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        {title && (
          <div className="mb-12 text-center">
            <h2 className={`text-3xl font-bold ${textColor} md:text-4xl lg:text-5xl`}>{title}</h2>
            {subtitle && (
              <p className={`mt-4 text-base ${textColor}/80 mx-auto max-w-2xl`}>{subtitle}</p>
            )}
          </div>
        )}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
