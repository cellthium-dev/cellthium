import Image from 'next/image';
import MaxWidthWrapper from '@/components/max-width-wrapper';
import { Separator } from '@/components/ui/separator';

export default function ProjectsPage() {
  return (
    <MaxWidthWrapper className="min-h-screen space-y-24 p-12 text-[#023B5E]">
      <div className="flex space-x-8">
        <h1 className="my-8 text-6xl uppercase">
          Customized Battery Modules for your{' '}
          <span className="font-bold">DIY*-Electrical Project</span>
        </h1>
        <Image
          alt="bmw-project"
          className="mx-auto mb-8"
          height={400}
          src={'/images/bmw.jpg'}
          width={600}
        />
      </div>

      <p className="my-8 text-center text-2xl">
        Our customized battery modules are specially developed energy storage
        solutions that are tailored to the specific requirements and needs of
        your electric vehicle, electric motor boat or energy storage system
      </p>

      <div className="grid grid-cols-3 gap-x-6">
        <div className="space-y-4">
          <Image
            alt=""
            className="col-span-1"
            height={500}
            src={'/images/bmw-1.jpg'}
            width={500}
          />
          <div>
            <h2 className="font-bold text-xl">FLEXIBLE SOLUTIONS</h2>
            <Separator className="h-[2px] bg-[#023B5E]" />
            <p className="mt-4">Our battery modules can be used everywhere.</p>
          </div>
        </div>

        <div className="space-y-4">
          <Image
            alt=""
            className="col-span-1"
            height={500}
            src={'/images/bmw-2.jpg'}
            width={500}
          />
          <div>
            <h2 className="font-bold text-xl">INDIVIDUALIZED AND RELIABLE</h2>
            <Separator className="h-[2px] bg-[#023B5E]" />
            <p className="mt-4">
              Our solutions meet the specific needs and preferences of our
              customers.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Image
            alt=""
            className="col-span-1"
            height={500}
            src={'/images/bmw-3.jpg'}
            width={500}
          />
          <div>
            <h2 className="font-bold text-xl">UNIQUE</h2>
            <Separator className="h-[2px] bg-[#023B5E]" />
            <p className="mt-4">
              Our products are unique and stand out from the crowd thanks to
              their special features.
            </p>
          </div>
        </div>
      </div>

      <div>
        <p className="my-8 text-center text-2xl">
          Based on our tried and tested battery modules, you can easily easily
          design your 96V to 400V system. All you need to do is order your
          selected modules online, assemble them, charge them effortlessly and
          conveniently in your retrofit project, plug them together and you're
          ready to go.
        </p>
      </div>
    </MaxWidthWrapper>
  );
}
