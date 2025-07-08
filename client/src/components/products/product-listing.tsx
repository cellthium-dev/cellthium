'use client';

import { cn, formatPrice } from '@lib/utils';
import Link from 'next/link';
import type { Product } from 'payload-types';
import { useEffect, useState } from 'react';
import { PRODUCT_CATEGORIES } from '../../../modules/layout/templates/nav/shared';
import { Skeleton } from '../ui/skeleton';
import ImageSlider from './image-slider';

interface ProductListingProps {
  readonly product: Product | null;
  readonly index: number;
}

export default function ProductListing({
  product,
  index,
}: ProductListingProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);

    return () => clearTimeout(timer);
  }, [index]);

  if (!(product && isVisible)) return <ProductPlaceholder />;

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label;

  const validUrls = product.images
    .map(({ image }) => (typeof image === 'string' ? image : image.url))
    .filter(Boolean) as string[];

  if (isVisible && product) {
    return (
      <Link
        className={cn('group/main invisible h-full w-full cursor-pointer', {
          'fade-in-5 visible animate-in': isVisible,
        })}
        href={`/products/${product.id}`}
      >
        <div className="flex w-full flex-col">
          <ImageSlider urls={validUrls} />

          <h3 className="mt-4 font-medium text-gray-700 text-sm">
            {product.name}
          </h3>
          <p className="mt-1 text-gray-500 text-sm">{label}</p>
          <p className="mt-1 font-medium text-gray-900 text-sm">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    );
  }
}

const ProductPlaceholder = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-zinc-100">
        <Skeleton className="h-full w-full" />
      </div>
      <Skeleton className="mt-4 h-4 w-2/3 rounded-lg" />
      <Skeleton className="mt-2 h-4 w-16 rounded-lg" />
      <Skeleton className="mt-2 h-4 w-12 rounded-lg" />
    </div>
  );
};
