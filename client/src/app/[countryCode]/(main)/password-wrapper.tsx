"use client"

import useAuthentication from "@lib/hooks/use-auth"
import { Button, Input, toast } from "@medusajs/ui"
import AboutUs from "@modules/home/components/about-us"
import Hero from "@modules/home/components/hero"
import ReactLenis from "lenis/dist/lenis-react"
import React from "react"
import MaxWidthWrapper from "@/_components/max-width-wrapper"

const PASSWORD = "cellthium2025"
export default function PasswordWrapper() {
  /** local state for authorized. */
  const { authorized, setAuthorized } = useAuthentication()
  /** local password state */
  const [password, setPassword] = React.useState<string>()

  return (
    <>
      {!authorized ? (
        <div className="absolute inset-0 z-50 h-screen w-screen bg-white flex justify-center items-center">
          <div className="w-80 grid">
            <h1 className="mb-1 text-center font-bold text-xl font-mono tracking-tighter">
              Welcome to Cellthium
            </h1>
            <p className="text-sm text-center mb-4">
              We are currently under maintenance and coming for you soon
            </p>
            <Input
              type="password"
              className="w-full"
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button
              className="mt-4 w-full"
              onClick={() => {
                if (password === PASSWORD) setAuthorized(true)
                else toast.error("Authentication failed.")
              }}
            >
              Login
            </Button>
          </div>
        </div>
      ) : (
        <ReactLenis root>
          <MaxWidthWrapper>
            <Hero />
            <AboutUs />
          </MaxWidthWrapper>
        </ReactLenis>
      )}
    </>
  )
}
