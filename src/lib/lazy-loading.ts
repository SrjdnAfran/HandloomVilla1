// src/lib/lazy-loading.ts
import { lazy } from 'react';

// Helper for component lazy loading
export const lazyLoad = <T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T }>
) => lazy(factory);

// Intersection Observer for lazy loading images
export const setupIntersectionObserver = (
  elements: NodeListOf<Element>,
  callback: (entry: IntersectionObserverEntry) => void
) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry);
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '50px',
    threshold: 0.1,
  });

  elements.forEach((element) => observer.observe(element));
  return observer;
};

// Lazy load image with blur placeholder
export const getLazyImageProps = (src: string, alt: string) => ({
  src,
  alt,
  loading: 'lazy' as const,
  placeholder: 'blur' as const,
  blurDataURL: `/_next/image?url=${encodeURIComponent(src)}&w=10&q=1`,
});