import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Projects() {
  return (
    <section className="relative flex h-screen items-center">
      <div className="flex flex-col space-y-16">
        <h1 className="font-bold text-3xl">
          Our{' '}
          <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
            Projects
          </span>
        </h1>

        <ProjectCard />
      </div>
    </section>
  );
}

export function ProjectCard() {
  return (
    <Link
      className="flex cursor-pointer justify-between rounded-xl p-8 text-green-900 transition-all duration-300 hover:bg-green-50"
      href={'/projects'}
    >
      <div className="flex items-end">
        <ArrowUpRight className="h-16 w-16 stroke-1" />
      </div>
      <div className="flex gap-x-8">
        <div className="min-w-fit space-y-4 text-end">
          <h1 className="font-mono text-7xl text-black">BMW 315</h1>

          <div className="grid-cols-2 space-y-2">
            <div className="flex flex-col items-end">
              <p className="text-xl">96V</p>
              <h3 className="w-fit rounded-xl bg-green-900 px-2 py-0 text-green-100 text-sm">
                Voltage
              </h3>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-xl">170km</p>
              <h3 className="w-fit rounded-xl bg-green-900 px-2 py-0 text-green-100 text-sm">
                Range
              </h3>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-xl">135km/h</p>
              <h3 className="w-fit rounded-xl bg-green-900 px-2 py-0 text-green-100 text-sm">
                Top speed
              </h3>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-xl">7Hours</p>
              <h3 className="w-fit rounded-xl bg-green-900 px-2 py-0 text-green-100 text-sm">
                Capacity
              </h3>
            </div>
          </div>
        </div>
        <div className="flex w-fit items-center justify-end">
          <Image
            alt="bmw-315-project"
            className="h-80 rounded-xl object-cover"
            height={400}
            src={'/cellthium-project.png'}
            width={600}
          />
        </div>
      </div>
    </Link>
  );
}
