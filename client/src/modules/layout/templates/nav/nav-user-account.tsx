'use client';

import type { StoreCustomer } from '@medusajs/types';
import { useRouter } from 'next/navigation';
import { Button } from '@/_components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/_components/ui/dropdown-menu';

export default function NavUserAccount({ user }: { user: StoreCustomer }) {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-visible">
        <Button className="relative" size="sm" variant="ghost">
          Account
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-60 bg-white">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none">
            <p className="font-medium text-black text-sm">{user.email}</p>
          </div>
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push('order-history')}>
          Order history
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => console.log('log out')}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
