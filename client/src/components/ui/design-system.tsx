import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

// Layout Components
interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'narrow' | 'default' | 'wide';
}

export const Container = ({ children, className, size = 'default' }: ContainerProps) => {
  const sizeClasses = {
    narrow: 'container-narrow',
    default: 'content-container',
    wide: 'container-wide',
  };

  return (
    <div className={cn(sizeClasses[size], className)}>
      {children}
    </div>
  );
};

export const Section = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <section className={cn('section-container', className)}>
      {children}
    </section>
  );
};

// Typography Components
interface HeadingProps {
  children: ReactNode;
  className?: string;
  level?: 'hero' | 'section' | 'subsection';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const Heading = ({ children, className, level = 'section', as: Tag = 'h2' }: HeadingProps) => {
  const levelClasses = {
    hero: 'heading-hero',
    section: 'heading-section',
    subsection: 'heading-subsection',
  };

  return (
    <Tag className={cn(levelClasses[level], className)}>
      {children}
    </Tag>
  );
};

interface TextProps {
  children: ReactNode;
  className?: string;
  variant?: 'body-lg' | 'body' | 'caption';
  as?: 'p' | 'span' | 'div';
}

export const Text = ({ children, className, variant = 'body', as: Tag = 'p' }: TextProps) => {
  const variantClasses = {
    'body-lg': 'text-body-lg',
    body: 'text-body',
    caption: 'text-caption',
  };

  return (
    <Tag className={cn(variantClasses[variant], className)}>
      {children}
    </Tag>
  );
};

// Button Components
interface ButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  type = 'button',
}: ButtonProps) => {
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      type={type}
      className={cn(variantClasses[variant], sizeClasses[size], className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// Card Components
interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = ({ children, className, variant = 'default', padding = 'md' }: CardProps) => {
  const variantClasses = {
    default: 'card',
    elevated: 'card-elevated',
  };

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div className={cn(variantClasses[variant], paddingClasses[padding], className)}>
      {children}
    </div>
  );
};

// Grid System
interface GridProps {
  children: ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Grid = ({ children, className, cols = 1, gap = 'md' }: GridProps) => {
  const colsClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
    12: 'grid-cols-12',
  };

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
  };

  return (
    <div className={cn('grid', colsClasses[cols], gapClasses[gap], className)}>
      {children}
    </div>
  );
};

// Utility Components
export const Spacer = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' }) => {
  const sizeClasses = {
    sm: 'h-4',
    md: 'h-8',
    lg: 'h-12',
    xl: 'h-16',
    '2xl': 'h-24',
  };

  return <div className={sizeClasses[size]} />;
};
