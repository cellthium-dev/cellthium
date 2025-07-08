import { cn } from '@lib/utils';
import AnimatedCounter from '@modules/animation/animated-counter';
import HorizontalScrollCarousel from '@modules/animation/horizontal-scroll-carousel';
import { CheckCircle, ShieldCheck, Unplug } from 'lucide-react';
import Image from 'next/image';
import type React from 'react';
import { Badge } from '@/components/ui/badge';

type AboutUsProps = React.HTMLAttributes<HTMLDivElement>;

type Element = {
  readonly icon: string;
  readonly name: string;
  readonly description: string;
  readonly alt: string;
};

const elements: Element[] = [
  {
    icon: '/icons/icon-li.svg',
    name: 'Lithium',
    description:
      'Lithium is a critical metal element in the global energy transition due to its fundamental role in the battery industry. While new, more sustainable sources of lithium are under development, recycling provides a road to lower impact lithium today.',
    alt: 'lithium-icon',
  },
  {
    icon: '/icons/icon-ni.svg',
    name: 'Nickel',
    description:
      'A metal that’s critical to the battery industry, and widely used by others too, nickel is highly valuable and growing in demand',
    alt: 'nickel-icon',
  },
  {
    icon: '/icons/icon-mn.svg',
    name: 'Manganese',
    description:
      'Manganese mines can be found around the world, and global reserves are high. It’s another key ingredient in many kinds of battery used in the world today.',
    alt: 'manganese-icon',
  },
  {
    icon: '/icons/icon-co.svg',
    name: 'Cobalt',
    description:
      'Cobalt mining is limited to several countries around the world, and the supply chain has been linked to sustainability risks, including unethical mining practices.',
    alt: 'cobalt-icon',
  },
];

const values = [
  {
    name: 'Plug and Play',
    Icon: Unplug,
    description:
      "We understand that the battery is the heart of every electric vehicle. That's why we have developed plug-and-play battery modules that combine performance and reliability in an optimized design.",
  },
  {
    name: 'Experienced',
    Icon: CheckCircle,
    description:
      'With many years of experience, we strive to shape the future of sustainable mobility with our high-energy battery modules.',
  },
  {
    name: 'Safety',
    Icon: ShieldCheck,
    description:
      'Developed in accordance with ECE R100-02 tests, our batteries guarantee maximum safety. We use advanced simulations with ABAQUS 2021 from Dassault Systèmes® to test our batteries under extreme conditions.',
  },
];

export default function AboutUs({ className }: AboutUsProps) {
  return (
    <section
      className={cn('grid grid-cols-1 gap-x-4 gap-y-8 pb-40', className)}
      id="about-us"
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-4">
          <Badge className="h-10 w-fit font-mono text-base uppercase">
            Founded
          </Badge>
          <span className="text-8xl">
            <AnimatedCounter from={0} to={2018} />
          </span>

          <p className="font-light">
            A diverse and interdisciplinary team with extensive experience in
            developing innovative battery solutions for various industries.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <Badge className="h-10 w-fit font-mono text-base uppercase">
            Reduced footprint
          </Badge>
          <div>
            <span className="text-8xl">
              <AnimatedCounter from={0} to={90} />
            </span>
            <span className="font-light text-7xl">%</span>
          </div>

          <p className="font-light">
            less CO<sub>2</sub> compared to cells made using coal power by 2030.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <Badge className="h-10 w-fit font-mono text-base uppercase">
            Capacity
          </Badge>
          <div>
            <span className="text-8xl">
              <AnimatedCounter from={0} to={30} />
            </span>
            <span className="font-light text-7xl">GWh</span>
          </div>
          <p className="font-light">
            Cellthium's target for battery installed capacity.
          </p>
        </div>
      </div>

      <div className="my-20 flex flex-col items-center justify-center">
        <h1 className="my-12 text-center text-4xl uppercase">
          High quality components
        </h1>

        <div className="relative grid grid-cols-2 gap-x-8">
          <div className="col-span-1 mt-10 grid w-fit grid-cols-1 gap-4">
            {elements.map((element) => (
              <div className="flex h-[75vh] flex-col gap-4" key={element.name}>
                <Image
                  alt={element.alt}
                  height={150}
                  src={element.icon}
                  width={150}
                />

                <h3 className="font-bold font-mono text-4xl uppercase">
                  {element.name}
                </h3>
                <p className="font-light text-2xl">{element.description}</p>
              </div>
            ))}
          </div>
          <p className="sticky top-56 h-fit p-8 text-right text-2xl">
            Our battery modules use{' '}
            <span className="border-green-400 border-b-2 font-mono text-xl tracking-tight">
              lithium-nickel-manganese-cobalt
            </span>{' '}
            <code className="font-bold">NMC</code> and{' '}
            <span className="border-green-400 border-b-2 font-mono text-xl tracking-tight">
              lithium-iron-phosphate
            </span>{' '}
            <code className="font-bold">
              LiFePO<sub>4</sub>
            </code>{' '}
            for maximum performance and safety.
          </p>
        </div>
      </div>

      <div className="my-20 flex flex-col items-center justify-center">
        <div className="my-24 grid gap-8 overflow-hidden">
          <h1 className="text-center text-4xl uppercase">Broad appliances</h1>
          <p className="font-light text-xl">
            Thanks to our modular concept and simple assembly, the batteries are
            ideal for a wide range of applications, cover any energy
            requirement, and adapt perfectly to the packaging and technical
            requirements of any projects.
          </p>
        </div>

        <HorizontalScrollCarousel />
      </div>

      <div className="my-20 flex gap-x-16">
        <div>
          <h3 className="text-4xl uppercase">The Cellthium Way</h3>
          <p>
            A model defined by technical leadership and rooted in a commitment
            to sustainability and innovation.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-x-4">
          {values.map((value) => (
            <div
              className="col-span-1 text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              key={value.name}
            >
              <div className="flex justify-center md:shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full text-gray-600 ring-1 ring-gray-900 hover:ring-gray-900/50">
                  {<value.Icon className="h-5 w-5" />}
                </div>
              </div>

              <div className="mt-6 md:mt-0 md:ml-4 lg:mt-6 lg:ml-0">
                <h3 className="font-mono text-base text-gray-900 uppercase">
                  {value.name}
                </h3>
                <p className="mt-3 text-muted-foreground text-sm">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
