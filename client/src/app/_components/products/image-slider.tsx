'use client';

import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/pagination';

import { cn } from '@lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';
import type SwiperType from 'swiper';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface ImageSliderProps {
  readonly urls: string[];
}

export default function ImageSlider({ urls }: ImageSliderProps) {
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  const [swiper, setSwiper] = React.useState<null | SwiperType>(null);
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  const [slideConfig, setSlideConfig] = React.useState({
    isBeginning: true,
    isEnd: activeIndex === (urls.length ?? 0) - 1,
  });

  React.useEffect(() => {
    swiper?.on('slideChange', ({ activeIndex }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setActiveIndex(activeIndex);
      setSlideConfig({
        isBeginning: activeIndex === 0,
        isEnd: activeIndex === (urls.length ?? 0) - 1,
      });
    });
  }, [swiper, urls]);

  const activeStyles =
    'active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 place-items-center rounded-full border-2 bg-white border-zinc-300';
  const inactiveStyles = 'hidden text-gray-400';

  return (
    <div className="group relative aspect-square overflow-hidden rounded-xl bg-zinc-100">
      <div className="absolute inset-0 z-10 opacity-0 transition group-hover:opacity-100">
        <button
          aria-label="next image"
          className={cn(activeStyles, 'right-3 transition', {
            [inactiveStyles]: slideConfig.isEnd,
            'text-primary-800 opacity-100 hover:bg-primary-300':
              !slideConfig.isEnd,
          })}
          onClick={(e) => {
            e.preventDefault();
            swiper?.slideNext();
          }}
        >
          <ChevronRight className="h-4 w-4 text-zinc-700" />{' '}
        </button>
        <button
          aria-label="previous image"
          className={cn(activeStyles, 'left-3 transition', {
            [inactiveStyles]: slideConfig.isBeginning,
            'text-primary-800 opacity-100 hover:bg-primary-300':
              !slideConfig.isBeginning,
          })}
          onClick={(e) => {
            e.preventDefault();
            swiper?.slidePrev();
          }}
        >
          <ChevronLeft className="h-4 w-4 text-zinc-700" />{' '}
        </button>
      </div>

      <Swiper
        className="h-full w-full"
        modules={[Pagination]}
        onSwiper={(swiper) => setSwiper(swiper)}
        pagination={{
          renderBullet: (_, className) => {
            return `<span class="rounded-full transition ${className}"></span>`;
          },
        }}
        slidesPerView={1}
        spaceBetween={50}
      >
        {urls.map((url, i) => (
          <SwiperSlide className="-z-10 relative h-full w-full" key={i}>
            <Image
              alt="Product image"
              className="-z-10 h-full w-full object-cover object-center"
              fill
              loading="eager"
              src={url}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
