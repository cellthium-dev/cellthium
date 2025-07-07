'use client';

import useAuthentication from '@lib/hooks/use-auth';
import { Button, Input, toast } from '@medusajs/ui';
import AboutUs from '@modules/home/components/about-us';
import Hero from '@modules/home/components/hero';
import ReactLenis from 'lenis/dist/lenis-react';
import React from 'react';
import MaxWidthWrapper from '@/_components/max-width-wrapper';

const PASSWORD = 'cellthium2025';
export default function PasswordWrapper() {
  /** local state for authorized. */
  const { authorized, setAuthorized } = useAuthentication();
  /** local password state */
  const [password, setPassword] = React.useState<string>();

  return (
    <>
      {authorized ? (
        <ReactLenis root>
          <MaxWidthWrapper>
            <Hero />
            <AboutUs />
          </MaxWidthWrapper>
        </ReactLenis>
      ) : (
        <div className="absolute inset-0 z-50 flex h-screen w-screen items-center justify-center bg-white">
          <div className="grid w-80">
            <h1 className="mb-1 text-center font-bold font-mono text-xl tracking-tighter">
              Welcome to Cellthium
            </h1>
            <p className="mb-4 text-center text-sm">
              We are currently under maintenance and coming for you soon
            </p>
            <Input
              className="w-full"
              onChange={(event) => setPassword(event.target.value)}
              type="password"
            />
            <Button
              className="mt-4 w-full"
              onClick={() => {
                if (password === PASSWORD) setAuthorized(true);
                else toast.error('Authentication failed.');
              }}
            >
              Login
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
