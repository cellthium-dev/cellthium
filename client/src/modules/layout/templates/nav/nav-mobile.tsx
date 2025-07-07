'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { PRODUCT_CATEGORIES } from './shared';

export default function NavMobile() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const pathname = usePathname();

  // whenever we click an item in the menu and navigate away, we want to close the menu
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // when we click the path we are currently on, we still want the mobile menu to close,
  // however we cant rely on the pathname for it because that won't change (we're already there)
  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      setIsOpen(false);
    }
  };

  // remove second scrollbar when mobile menu is open
  React.useEffect(() => {
    if (isOpen) document.body.classList.add('overflow-hidden');
    else document.body.classList.remove('overflow-hidden');
  }, [isOpen]);

  if (!isOpen)
    return (
      <button
        className="-m-2 relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 lg:hidden"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        <Menu aria-hidden="true" className="h-6 w-6" />
      </button>
    );

  return (
    <div>
      <div className="relative z-40 lg:hidden">
        <div className="fixed inset-0 bg-black bg-opacity-25" />
      </div>

      <div className="fixed inset-0 z-40 flex overflow-y-scroll overscroll-y-none">
        <div className="w-4/5">
          <div className="relative flex w-full max-w-sm flex-col overflow-y-auto bg-white pb-12 shadow-xl">
            <div className="flex px-4 pt-5 pb-2">
              <button
                className="-m-2 relative inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                <X aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-2">
              <ul>
                {PRODUCT_CATEGORIES.map((category) => (
                  <li
                    className="space-y-10 px-4 pt-10 pb-8"
                    key={category.label}
                  >
                    <div className="border-gray-200 border-b">
                      <div className="-mb-px flex">
                        <p className="flex-1 whitespace-nowrap border-transparent border-b-2 py-4 font-medium text-base text-gray-900">
                          {category.label}
                        </p>
                      </div>
                    </div>
                    {/* 
                    <div className="grid grid-cols-2 gap-x-4 gap-y-10">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative text-sm">
                          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                            <Image
                              fill
                              src={item.imageSrc}
                              alt="product category image"
                              className="object-cover object-center"
                            />
                          </div>
                          <Link href={item.href} className="mt-6 block font-medium text-gray-900">
                            {item.name}
                          </Link>
                        </div>
                      ))}
                    </div> */}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6 border-gray-200 border-t px-4 py-6">
              <div className="flow-root">
                <Link
                  className="-m-2 block p-2 font-medium text-gray-900"
                  href="/sign-in"
                  onClick={() => closeOnCurrent('/sign-in')}
                >
                  Sign in
                </Link>
              </div>
              <div className="flow-root">
                <Link
                  className="-m-2 block p-2 font-medium text-gray-900"
                  href="/sign-up"
                  onClick={() => closeOnCurrent('/sign-up')}
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
