import Image from 'next/image';
import MaxWidthWrapper from '@/components/max-width-wrapper';

export default function AboutUsPage() {
  return (
    <MaxWidthWrapper className="min-h-screen space-y-24 px-12 py-24 text-[#023B5E]">
      <div className="space-y-8">
        <h1 className="text-6xl">
          Our mission: A decarbonized future for the{' '}
          <span className="font-bold">mobility of today</span>
        </h1>
        <Image
          alt=""
          className="h-full w-full object-fill"
          height={1080}
          src="/images/bg-aboutus.jpg"
          width={1920}
        />
      </div>

      <div>
        <p className="text-center text-2xl">
          "Imagine gliding silently across the sea in your favorite boat or on
          the road in your favorite car without releasing harmful emissions into
          the atmosphere. Experience your journey in harmony with the nature
          around you, and enjoy the freedom and well-being in the company of
          your loved ones. This is the unique Cellthium experience."
        </p>

        <p className="mt-8 text-center text-2xl">
          With over 30 years of experience in the automotive industry,
          CELLthium's employees want to promote the introduction of high-energy
          density battery modules that offer added value over the entire life
          cycle of the vehicle. CELLthium is known in the retrofit industry for
          its technological expertise and professionalism. It has set itself the
          goal of becoming a leader in the field of sustainable mobility
          technologies.
        </p>

        <p className="mt-8 text-center text-2xl">
          "Cellthium's vision is to contribute to the introduction of
          carbon-free solutions through the development of battery modules."
        </p>
      </div>

      <div className="grid grid-cols-3 gap-x-6">
        <div className="space-y-4">
          <Image
            alt=""
            className="col-span-1"
            height={500}
            src={'/images/aboutus-1.jpg'}
            width={500}
          />
        </div>

        <div className="space-y-4">
          <Image
            alt=""
            className="col-span-1"
            height={500}
            src={'/images/aboutus-2.jpg'}
            width={500}
          />
        </div>

        <div className="space-y-4">
          <Image
            alt=""
            className="col-span-1"
            height={500}
            src={'/images/aboutus-3.jpg'}
            width={500}
          />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
