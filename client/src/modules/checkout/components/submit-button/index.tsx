'use client';

import type React from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/_components/ui/button';

export function SubmitButton({
  children,
  variant = 'default',
  className,
  'data-testid': dataTestId,
}: {
  children: React.ReactNode;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | null;
  className?: string;
  'data-testid'?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      className={className}
      data-testid={dataTestId}
      disabled={pending}
      type="submit"
      variant={variant}
    >
      {children}
    </Button>
  );
}
