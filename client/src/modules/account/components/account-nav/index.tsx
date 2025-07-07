'use client';

import { signout } from '@lib/data/customer';
import { ArrowRightOnRectangle } from '@medusajs/icons';
import type { HttpTypes } from '@medusajs/types';
import { clx, toast } from '@medusajs/ui';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import ChevronDown from '@modules/common/icons/chevron-down';
import MapPin from '@modules/common/icons/map-pin';
import Package from '@modules/common/icons/package';
import User from '@modules/common/icons/user';
import { useParams, usePathname } from 'next/navigation';
import { useTransition } from 'react';

const AccountNav = ({
  customer,
}: {
  customer: HttpTypes.StoreCustomer | null;
}) => {
  const route = usePathname();
  const { countryCode } = useParams() as { countryCode: string };

  /** handle logout action. */
  const [_, startTransition] = useTransition();
  const handleLogout = async () => {
    startTransition(async () => {
      const response = await signout(countryCode);
      if (response.success) toast.success('Logout successful.');
    });
  };

  return (
    <div>
      <div className="small:hidden" data-testid="mobile-account-nav">
        {route !== `/${countryCode}/account` ? (
          <LocalizedClientLink
            className="flex items-center gap-x-2 py-2 text-small-regular"
            data-testid="account-main-link"
            href="/account"
          >
            <>
              <ChevronDown className="rotate-90 transform" />
              <span>Account</span>
            </>
          </LocalizedClientLink>
        ) : (
          <>
            <div className="mb-4 px-8 text-xl-semi">
              Hello {customer?.first_name}
            </div>
            <div className="text-base-regular">
              <ul>
                <li>
                  <LocalizedClientLink
                    className="flex items-center justify-between border-gray-200 border-b px-8 py-4"
                    data-testid="profile-link"
                    href="/account/profile"
                  >
                    <>
                      <div className="flex items-center gap-x-2">
                        <User size={20} />
                        <span>Profile</span>
                      </div>
                      <ChevronDown className="-rotate-90 transform" />
                    </>
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="flex items-center justify-between border-gray-200 border-b px-8 py-4"
                    data-testid="addresses-link"
                    href="/account/addresses"
                  >
                    <>
                      <div className="flex items-center gap-x-2">
                        <MapPin size={20} />
                        <span>Addresses</span>
                      </div>
                      <ChevronDown className="-rotate-90 transform" />
                    </>
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="flex items-center justify-between border-gray-200 border-b px-8 py-4"
                    data-testid="orders-link"
                    href="/account/orders"
                  >
                    <div className="flex items-center gap-x-2">
                      <Package size={20} />
                      <span>Orders</span>
                    </div>
                    <ChevronDown className="-rotate-90 transform" />
                  </LocalizedClientLink>
                </li>
                <li>
                  <button
                    className="flex w-full items-center justify-between border-gray-200 border-b px-8 py-4"
                    data-testid="logout-button"
                    onClick={handleLogout}
                    type="button"
                  >
                    <div className="flex items-center gap-x-2">
                      <ArrowRightOnRectangle />
                      <span>Log out</span>
                    </div>
                    <ChevronDown className="-rotate-90 transform" />
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
      <div className="hidden small:block" data-testid="account-nav">
        <div>
          <div className="pb-4">
            <h3 className="text-base-semi">Account</h3>
          </div>
          <div className="text-base-regular">
            <ul className="mb-0 flex flex-col items-start justify-start gap-y-4">
              <li>
                <AccountNavLink
                  data-testid="overview-link"
                  href="/account"
                  route={route!}
                >
                  Overview
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  data-testid="profile-link"
                  href="/account/profile"
                  route={route!}
                >
                  Profile
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  data-testid="addresses-link"
                  href="/account/addresses"
                  route={route!}
                >
                  Addresses
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  data-testid="orders-link"
                  href="/account/orders"
                  route={route!}
                >
                  Orders
                </AccountNavLink>
              </li>
              <li className="text-grey-700">
                <button
                  data-testid="logout-button"
                  onClick={handleLogout}
                  type="button"
                >
                  Log out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

type AccountNavLinkProps = {
  href: string;
  route: string;
  children: React.ReactNode;
  'data-testid'?: string;
};

const AccountNavLink = ({
  href,
  route,
  children,
  'data-testid': dataTestId,
}: AccountNavLinkProps) => {
  const { countryCode }: { countryCode: string } = useParams();

  const active = route.split(countryCode)[1] === href;
  return (
    <LocalizedClientLink
      className={clx('text-ui-fg-subtle hover:text-ui-fg-base', {
        'font-semibold text-ui-fg-base': active,
      })}
      data-testid={dataTestId}
      href={href}
    >
      {children}
    </LocalizedClientLink>
  );
};

export default AccountNav;
