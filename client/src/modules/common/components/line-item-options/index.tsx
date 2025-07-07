import type { HttpTypes } from '@medusajs/types';
import { Text } from '@medusajs/ui';

type LineItemOptionsProps = {
  variant: HttpTypes.StoreProductVariant | undefined;
  'data-testid'?: string;
  'data-value'?: HttpTypes.StoreProductVariant;
};

const LineItemOptions = ({
  variant,
  'data-testid': dataTestid,
  'data-value': dataValue,
}: LineItemOptionsProps) => {
  return (
    <Text
      className="txt-medium inline-block w-full overflow-hidden text-ellipsis text-ui-fg-subtle"
      data-testid={dataTestid}
      data-value={dataValue}
    >
      Variant: {variant?.title}
    </Text>
  );
};

export default LineItemOptions;
