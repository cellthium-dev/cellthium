import Image from "next/image"
import MaxWidthWrapper from "@/_components/max-width-wrapper"
import { Separator } from "@/_components/ui/separator"

export default function ProjectsPage() {
  return (
    <MaxWidthWrapper className="min-h-screen p-12 space-y-24 text-[#023B5E]">
      <div className="flex space-x-8">
        <h1 className="uppercase text-6xl my-8">
          Customized Battery Modules for your{" "}
          <span className="font-bold">DIY*-Electrical Project</span>
        </h1>
        <Image
          src={"/images/bmw.jpg"}
          width={600}
          height={400}
          alt="bmw-project"
          className="mb-8 mx-auto"
        />
      </div>

      <p className="text-center text-2xl my-8">
        Our customized battery modules are specially developed energy storage
        solutions that are tailored to the specific requirements and needs of
        your electric vehicle, electric motor boat or energy storage system
      </p>

      <div className="grid grid-cols-3 gap-x-6">
        <div className="space-y-4">
          <Image
            src={"/images/bmw-1.jpg"}
            alt=""
            width={500}
            height={500}
            className="col-span-1"
          />
          <div>
            <h2 className="text-xl font-bold">FLEXIBLE SOLUTIONS</h2>
            <Separator className="bg-[#023B5E] h-[2px]" />
            <p className="mt-4">Our battery modules can be used everywhere.</p>
          </div>
        </div>

        <div className="space-y-4">
          <Image
            src={"/images/bmw-2.jpg"}
            alt=""
            width={500}
            height={500}
            className="col-span-1"
          />
          <div>
            <h2 className="text-xl font-bold">INDIVIDUALIZED AND RELIABLE</h2>
            <Separator className="bg-[#023B5E] h-[2px]" />
            <p className="mt-4">
              Our solutions meet the specific needs and preferences of our
              customers.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Image
            src={"/images/bmw-3.jpg"}
            alt=""
            width={500}
            height={500}
            className="col-span-1"
          />
          <div>
            <h2 className="text-xl font-bold">UNIQUE</h2>
            <Separator className="bg-[#023B5E] h-[2px]" />
            <p className="mt-4">
              Our products are unique and stand out from the crowd thanks to
              their special features.
            </p>
          </div>
        </div>
      </div>

      <div>
        <p className="text-2xl text-center my-8">
          Based on our tried and tested battery modules, you can easily easily
          design your 96V to 400V system. All you need to do is order your
          selected modules online, assemble them, charge them effortlessly and
          conveniently in your retrofit project, plug them together and you're
          ready to go.
        </p>
      </div>
    </MaxWidthWrapper>
  )
}
