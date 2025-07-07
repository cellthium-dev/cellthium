'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Car, Factory, type LucideProps, Ship, TrainFront } from 'lucide-react';
import React from 'react';

type Appliance = {
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  name: string;
};
const appliances: Appliance[] = [
  { icon: Car, name: 'Vehicles' },
  {
    icon: TrainFront,
    name: 'Rail vehicles',
  },
  { icon: Ship, name: 'Ships' },
  { icon: Factory, name: 'Industrial machines' },
];

export default function HorizontalScrollCarousel() {
  const targetRef = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  const x = useTransform(scrollYProgress, [0, 1], ['25%', '-25%']);

  return (
    <section className="relative h-[300vh] bg-transparent" ref={targetRef}>
      <div className="sticky top-1/3 h-screen items-center overflow-hidden">
        <motion.div className="flex gap-4" style={{ x }}>
          <div className="flex items-center justify-center gap-x-8">
            {appliances.map((appliance, index) => (
              <div
                className="flex flex-col items-center justify-center gap-8 p-12 text-center"
                key={index}
              >
                <appliance.icon className="h-20 w-20" />
                <p className="flex h-32 w-96 items-center justify-center bg-green-400 px-4 font-mono text-5xl uppercase">
                  {appliance.name}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
