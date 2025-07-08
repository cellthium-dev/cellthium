import { Label } from '@medusajs/ui';
import Eye from '@modules/common/icons/eye';
import EyeOff from '@modules/common/icons/eye-off';
import React, { useEffect, useImperativeHandle, useState } from 'react';

type InputProps = Omit<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
  'placeholder'
> & {
  label: string;
  errors?: Record<string, unknown>;
  touched?: Record<string, unknown>;
  name: string;
  topLabel?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, name, label, touched, required, topLabel, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [inputType, setInputType] = useState(type);

    useEffect(() => {
      if (type === 'password' && showPassword) {
        setInputType('text');
      }

      if (type === 'password' && !showPassword) {
        setInputType('password');
      }
    }, [type, showPassword]);

    useImperativeHandle(ref, () => inputRef.current!);

    return (
      <div className="flex w-full flex-col">
        {topLabel && (
          <Label className="txt-compact-medium-plus mb-2">{topLabel}</Label>
        )}
        <div className="txt-compact-medium relative z-0 flex w-full">
          <input
            className="mt-0 block h-11 w-full appearance-none rounded-md border border-ui-border-base bg-ui-bg-field px-4 pt-4 pb-1 hover:bg-ui-bg-field-hover focus:shadow-borders-interactive-with-active focus:outline-hidden focus:ring-0"
            name={name}
            placeholder=" "
            required={required}
            type={inputType}
            {...props}
            ref={inputRef}
          />
          <label
            className="-z-1 absolute top-3 mx-3 flex origin-0 items-center justify-center px-1 text-ui-fg-subtle transition-all duration-300"
            htmlFor={name}
            onClick={() => inputRef.current?.focus()}
          >
            {label}
            {required && <span className="text-rose-500">*</span>}
          </label>
          {type === 'password' && (
            <button
              className="absolute top-3 right-0 px-4 text-ui-fg-subtle outline-hidden transition-all duration-150 focus:text-ui-fg-base focus:outline-hidden"
              onClick={() => setShowPassword(!showPassword)}
              type="button"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
