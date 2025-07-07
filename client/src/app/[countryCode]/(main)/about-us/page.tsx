import Image from "next/image"
import MaxWidthWrapper from "@/_components/max-width-wrapper"

export default function AboutUsPage() {
  return (
    <MaxWidthWrapper className="min-h-screen py-24 px-12 space-y-24 text-[#023B5E]">
      <div className="space-y-8">
        <h1 className="text-6xl">
          Our mission: A decarbonized future for the{" "}
          <span className="font-bold">mobility of today</span>
        </h1>
        <Image
          src="/images/bg-aboutus.jpg"
          alt=""
          width={1920}
          height={1080}
          className="h-full w-full object-fill"
        />
      </div>

      <div>
        <p className="text-2xl text-center">
          "Imagine gliding silently across the sea in your favorite boat or on
          the road in your favorite car without releasing harmful emissions into
          the atmosphere. Experience your journey in harmony with the nature
          around you, and enjoy the freedom and well-being in the company of
          your loved ones. This is the unique Cellthium experience."
        </p>

        <p className="text-2xl text-center mt-8">
          With over 30 years of experience in the automotive industry,
          CELLthium's employees want to promote the introduction of high-energy
          density battery modules that offer added value over the entire life
          cycle of the vehicle. CELLthium is known in the retrofit industry for
          its technological expertise and professionalism. It has set itself the
          goal of becoming a leader in the field of sustainable mobility
          technologies.
        </p>

        <p className="text-2xl text-center mt-8">
          "Cellthium's vision is to contribute to the introduction of
          carbon-free solutions through the development of battery modules."
        </p>
      </div>

      <div className="grid grid-cols-3 gap-x-6">
        <div className="space-y-4">
          <Image
            src={"/images/aboutus-1.jpg"}
            alt=""
            width={500}
            height={500}
            className="col-span-1"
          />
        </div>

        <div className="space-y-4">
          <Image
            src={"/images/aboutus-2.jpg"}
            alt=""
            width={500}
            height={500}
            className="col-span-1"
          />
        </div>

        <div className="space-y-4">
          <Image
            src={"/images/aboutus-3.jpg"}
            alt=""
            width={500}
            height={500}
            className="col-span-1"
          />
        </div>
      </div>
    </MaxWidthWrapper>
  )
}
