import Image from "next/image"
import MaxWidthWrapper from "@/_components/max-width-wrapper"

export default function ApplicationPage() {
  return (
    <MaxWidthWrapper className="min-h-screen  p-12 text-apple-950 space-y-24">
      <Image
        src={"/images/application.png"}
        width={800}
        height={600}
        alt="bmw-project"
        className="mb-8 mx-auto"
      />

      <div className="text-center text-7xl">
        OUR BATTERIES ARE USED IN MANY{" "}
        <span className="font-bold">DIFFERENT APPLICATIONS</span>
      </div>

      <p className="text-center text-4xl">
        Whether cars, boats or as energy storage
      </p>
    </MaxWidthWrapper>
  )
}
