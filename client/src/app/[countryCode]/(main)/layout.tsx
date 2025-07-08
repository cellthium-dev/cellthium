import { listCartOptions, retrieveCart } from '@lib/data/cart';
import { retrieveCustomer } from '@lib/data/customer';
import { getBaseURL } from '@lib/util/env';
import type { StoreCartShippingOption } from '@medusajs/types';
import CartMismatchBanner from '@modules/layout/components/cart-mismatch-banner';
import NavBar from '@modules/layout/templates/nav/nav-bar';
import FreeShippingPriceNudge from '@modules/shipping/components/free-shipping-price-nudge';
import type { Metadata } from 'next';
import Chat from '@/components/chats/chat';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
};

export default async function PageLayout(props: { children: React.ReactNode }) {
  const customer = await retrieveCustomer();
  const cart = await retrieveCart();
  let shippingOptions: StoreCartShippingOption[] = [];

  if (cart) {
    const { shipping_options } = await listCartOptions();

    shippingOptions = shipping_options;
  }

  return (
    <>
      <NavBar />
      {customer && cart && (
        <CartMismatchBanner cart={cart} customer={customer} />
      )}

      {cart && (
        <FreeShippingPriceNudge
          cart={cart}
          shippingOptions={shippingOptions}
          variant="popup"
        />
      )}
      {props.children}

      <Chat />
      <Footer />
    </>
  );
}
