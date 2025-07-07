import { Checkbox, Label } from '@medusajs/ui';
import type React from 'react';

type CheckboxProps = {
  checked?: boolean;
  onChange?: () => void;
  label: string;
  name?: string;
  'data-testid'?: string;
};

const CheckboxWithLabel: React.FC<CheckboxProps> = ({
  checked = true,
  onChange,
  label,
  name,
  'data-testid': dataTestId,
}) => {
  return (
    <div className="flex items-center space-x-2 ">
      <Checkbox
        aria-checked={checked}
        checked={checked}
        className="flex items-center gap-x-2 text-base-regular"
        data-testid={dataTestId}
        id="checkbox"
        name={name}
        onClick={onChange}
        role="checkbox"
        type="button"
      />
      <Label
        className="!transform-none !txt-medium"
        htmlFor="checkbox"
        size="large"
      >
        {label}
      </Label>
    </div>
  );
};

export default CheckboxWithLabel;
