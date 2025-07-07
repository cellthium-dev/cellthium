'use client';

import { updateLineItem } from '@lib/data/cart';
import type { HttpTypes } from '@medusajs/types';
import { clx, Table, Text } from '@medusajs/ui';
import CartItemSelect from '@modules/cart/components/cart-item-select';
import ErrorMessage from '@modules/checkout/components/error-message';
import DeleteButton from '@modules/common/components/delete-button';
import LineItemOptions from '@modules/common/components/line-item-options';
import LineItemPrice from '@modules/common/components/line-item-price';
import LineItemUnitPrice from '@modules/common/components/line-item-unit-price';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import Spinner from '@modules/common/icons/spinner';
import Thumbnail from '@modules/products/components/thumbnail';
import { useState } from 'react';

type ItemProps = {
  item: HttpTypes.StoreCartLineItem;
  type?: 'full' | 'preview';
  currencyCode: string;
};

const Item = ({ item, type = 'full', currencyCode }: ItemProps) => {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const changeQuantity = async (quantity: number) => {
    setError(null);
    setUpdating(true);

    await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setUpdating(false);
      });
  };

  // TODO: Update this to grab the actual max inventory
  const maxQtyFromInventory = 10;
  const maxQuantity = item.variant?.manage_inventory ? 10 : maxQtyFromInventory;

  return (
    <Table.Row className="w-full" data-testid="product-row">
      <Table.Cell className="!pl-0 w-24 p-4">
        <LocalizedClientLink
          className={clx('flex', {
            'w-16': type === 'preview',
            'w-12 small:w-24': type === 'full',
          })}
          href={`/products/${item.product_handle}`}
        >
          <Thumbnail
            images={item.variant?.product?.images}
            size="square"
            thumbnail={item.thumbnail}
          />
        </LocalizedClientLink>
      </Table.Cell>

      <Table.Cell className="text-left">
        <Text
          className="txt-medium-plus text-ui-fg-base"
          data-testid="product-title"
        >
          {item.product_title}
        </Text>
        <LineItemOptions data-testid="product-variant" variant={item.variant} />
      </Table.Cell>

      {type === 'full' && (
        <Table.Cell>
          <div className="flex w-28 items-center gap-2">
            <DeleteButton data-testid="product-delete-button" id={item.id} />
            <CartItemSelect
              className="h-10 w-14 p-4"
              data-testid="product-select-button"
              onChange={(value) =>
                changeQuantity(Number.parseInt(value.target.value))
              }
              value={item.quantity}
            >
              {/* TODO: Update this with the v2 way of managing inventory */}
              {Array.from(
                {
                  length: Math.min(maxQuantity, 10),
                },
                (_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                )
              )}

              <option key={1} value={1}>
                1
              </option>
            </CartItemSelect>
            {updating && <Spinner />}
          </div>
          <ErrorMessage data-testid="product-error-message" error={error} />
        </Table.Cell>
      )}

      {type === 'full' && (
        <Table.Cell className="hidden small:table-cell">
          <LineItemUnitPrice
            currencyCode={currencyCode}
            item={item}
            style="tight"
          />
        </Table.Cell>
      )}

      <Table.Cell className="!pr-0">
        <span
          className={clx('!pr-0', {
            'flex h-full flex-col items-end justify-center': type === 'preview',
          })}
        >
          {type === 'preview' && (
            <span className="flex gap-x-1 ">
              <Text className="text-ui-fg-muted">{item.quantity}x </Text>
              <LineItemUnitPrice
                currencyCode={currencyCode}
                item={item}
                style="tight"
              />
            </span>
          )}
          <LineItemPrice
            currencyCode={currencyCode}
            item={item}
            style="tight"
          />
        </span>
      </Table.Cell>
    </Table.Row>
  );
};

export default Item;
