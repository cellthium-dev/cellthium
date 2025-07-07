import type { HttpTypes } from '@medusajs/types';
import { Heading, Text } from '@medusajs/ui';
import LocalizedClientLink from '@modules/common/components/localized-client-link';

type ProductInfoProps = {
  product: HttpTypes.StoreProduct;
};

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info">
      <div className="mx-auto flex flex-col gap-y-4 lg:max-w-[500px]">
        {product.collection && (
          <LocalizedClientLink
            className="text-medium text-ui-fg-muted hover:text-ui-fg-subtle"
            href={`/collections/${product.collection.handle}`}
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        <Heading
          className="text-3xl text-ui-fg-base leading-10"
          data-testid="product-title"
          level="h2"
        >
          {product.title}
        </Heading>

        <Text
          className="whitespace-pre-line text-medium text-ui-fg-subtle"
          data-testid="product-description"
        >
          {product.description}
        </Text>
      </div>
    </div>
  );
};

export default ProductInfo;
