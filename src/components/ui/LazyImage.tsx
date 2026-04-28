'use client';

import { useState, useEffect, useRef } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface LazyImageProps extends ImageProps {
  fallbackSrc?: string;
  lowQualitySrc?: string;
}

export default function LazyImage({
  src,
  alt,
  className,
  fallbackSrc = '/images/placeholder.jpg',
  lowQualitySrc,
  ...props
}: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState(
    lowQualitySrc || (typeof src === 'string' ? src : src.toString())
  );
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!lowQualitySrc) {
      const img = new window.Image();
      img.src = typeof src === 'string' ? src : src.toString();
      img.onload = () => {
        setImgSrc(typeof src === 'string' ? src : src.toString());
        setIsLoading(false);
      };
    } else {
      setTimeout(() => {
        setImgSrc(typeof src === 'string' ? src : src.toString());
        setIsLoading(false);
      }, 300);
    }
  }, [src, lowQualitySrc]);

  const handleError = () => {
    setHasError(true);
    setImgSrc(fallbackSrc);
    setIsLoading(false);
  };

  return (
    <div className="relative overflow-hidden">
      <Image
        {...props}
        src={hasError ? fallbackSrc : imgSrc}
        alt={alt}
        className={cn(
          'transition-opacity duration-500',
          isLoading ? 'scale-105 opacity-0 blur-sm' : 'scale-100 opacity-100',
          className
        )}
        onError={handleError}
        loading="lazy"
      />
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100" />
      )}
    </div>
  );
}
