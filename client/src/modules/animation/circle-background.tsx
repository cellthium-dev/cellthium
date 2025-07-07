'use client';

import { cn } from '@lib/utils';
import { motion } from 'framer-motion';
import type React from 'react';
import { calculateXAxes, calculateYAxes } from './utils';

interface IRoundedBackground extends React.HTMLAttributes<HTMLDivElement> {
  readonly r: number; // radius in rem
  readonly blur?: boolean;
  readonly delay?: number;
  readonly duration?: number;
  readonly reverse?: boolean;
}

export default function CircleBackground({
  r,
  className,
  delay = 0,
  blur = true,
  duration = 20,
  reverse = false,
}: IRoundedBackground) {
  return (
    <motion.div
      animate={{
        x: reverse
          ? calculateXAxes(0.01, 850, -Math.PI, Math.PI).map((x) => x * -1)
          : calculateXAxes(0.01, 850, -Math.PI, Math.PI),
        y: reverse
          ? calculateYAxes(0.01, 850, -Math.PI, Math.PI)
          : calculateYAxes(0.01, 850, -Math.PI, Math.PI),
        transition: {
          duration,
          repeat: Number.POSITIVE_INFINITY,
          delay,
        },
      }}
      className={cn(
        'absolute inset-0 mx-auto animate-gradient-x rounded-full opacity-40 filter',
        className,
        blur && 'blur-3xl'
      )}
      layout
      style={{ width: `${r}rem`, height: `${r}rem` }}
    />
  );
}
