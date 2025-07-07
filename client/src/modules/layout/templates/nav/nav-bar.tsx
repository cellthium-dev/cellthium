import { retrieveCustomer } from "@lib/data/customer"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import Image from "next/image"
import NavItems from "./nav-items"

export default async function Navbar() {
  const customer = await retrieveCustomer()

  return (
    <div className="sticky inset-x-0 z-50 h-30 bg-white/80 py-6 text-apple-600">
      <header className="relative">
        <div className="px-8">
          <div className="flex h-16 items-center">
            {/** company logo. */}
            <div className="ml-4 flex lg:ml-0">
              <LocalizedClientLink href="/">
                <Image
                  src={"/icons/logo.bmp"}
                  width={300}
                  height={100}
                  alt={"company-logo"}
                  className="mx-6"
                />
              </LocalizedClientLink>
            </div>

            {/** site navigation. */}
            <div className="z-50 hidden lg:ml-8 lg:block lg:self-stretch">
              <NavItems />
            </div>

            {/** account navigation. */}
            <div className="ml-auto flex items-center">
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <LocalizedClientLink
                  href="/account"
                  className={"text-base uppercase text-[#023B5E]"}
                >
                  Account
                </LocalizedClientLink>

                <div className="flow-root">
                  <CartButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
