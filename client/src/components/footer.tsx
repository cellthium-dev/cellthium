'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icons } from './icons';
import MaxWidthWrapper from './max-width-wrapper';

export default function Footer() {
  const pathname = usePathname();
  const pathsToMinimize = ['/verify-email', '/sign-up', '/sign-in'];

  return (
    <footer className="grow-0 bg-white">
      <MaxWidthWrapper>
        <div className="border-gray-200 border-t">
          {pathsToMinimize.includes(pathname) ? null : (
            <div className="pt-16 pb-8">
              <div className="flex justify-center">
                <Icons.logo className="h-12 w-auto" />
              </div>
            </div>
          )}
        </div>

        <div className="py-10 md:flex md:items-center md:justify-between">
          <div className="text-center md:text-left">
            <p className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>

          <div className="mt-4 flex items-center justify-center md:mt-0">
            <div className="flex space-x-8">
              <Link
                className="text-muted-foreground text-sm hover:text-gray-600"
                href="/terms-of-service"
              >
                Terms of Service
              </Link>
              <Link
                className="text-muted-foreground text-sm hover:text-gray-600"
                href="/terms-of-use"
              >
                Terms of Use
              </Link>
              <Link
                className="text-muted-foreground text-sm hover:text-gray-600"
                href="#"
              >
                Privacy Policy
              </Link>
              <Link
                className="text-muted-foreground text-sm hover:text-gray-600"
                href="#"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}
