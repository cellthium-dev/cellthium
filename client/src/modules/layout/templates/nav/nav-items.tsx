'use client';

import { cn } from '@lib/utils';
import Link from 'next/link';
import type React from 'react';
import { Icons } from '@/components/icons';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

const products: { title: string; href: string; description: string }[] = [
  {
    title: 'Kit - Bluebox 454 Power',
    href: '/products/bluebox454',
    description: 'Individual battery kit solution for your needs.',
  },
  {
    title: 'Kit - Bluebox 569 Power',
    href: '/products/bluebox569',
    description: 'Individual battery kit solution for your needs.',
  },
  {
    title: 'Kit - Bluebox 619 Energy',
    href: '/products/bluebox619',
    description: 'Individual battery kit solution for your needs.',
  },
  {
    title: 'Kit - Bluebox 774 Energy',
    href: '/products/bluebox774',
    description: 'Individual battery kit solution for your needs.',
  },
];

export default function NavItems() {
  return (
    <div className="flex h-full items-center text-primary uppercase">
      <NavigationMenu>
        <NavigationMenuList className="lg:flex lg:gap-x-8 ">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="uppercase">
              About us
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-linear-to-b from-muted/50 to-muted p-6 no-underline outline-hidden focus:shadow-md"
                      href="/"
                    >
                      <Icons.logo className="h-12 w-auto" />
                      <div className="mt-4 mb-2 font-medium text-lg">
                        Cellthium
                      </div>
                      <p className="text-muted-foreground text-sm leading-tight">
                        Customized battery modules for your DIY projects.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/about-us" title="Our Mission">
                  A little introduction about Cellthium's mission.
                </ListItem>
                <ListItem href="/about-us/bluebox" title="BlueBox">
                  Learn about our innovative BlueBox battery solutions.
                </ListItem>
                <ListItem href="/application" title="Applications">
                  Applications of our batteries.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent uppercase">
              Products
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {products.map((component) => (
                  <ListItem
                    href={component.href}
                    key={component.title}
                    title={component.title}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/projects" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  'min-w-24 bg-transparent'
                )}
              >
                Projects
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/faq" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  'min-w-24 bg-transparent'
                )}
              >
                FAQ
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<'li'> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="font-medium text-sm leading-none">{title}</div>
          <p className="line-clamp-2 text-muted-foreground text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
