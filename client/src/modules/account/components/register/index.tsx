'use client';

import { signup } from '@lib/data/customer';
import { toast } from '@medusajs/ui';
import { LOGIN_VIEW } from '@modules/account/templates/login-template';
import { SubmitButton } from '@modules/checkout/components/submit-button';
import Banner from '@modules/common/components/banner';
import Input from '@modules/common/components/input';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import { Loader } from 'lucide-react';
import type React from 'react';
import { useServerAction } from 'zsa-react';
import { Button } from '@/components/ui/button';

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void;
};

const Register = ({ setCurrentView }: Props) => {
  const { isPending, error, isError, execute } = useServerAction(signup, {
    onError: ({ err }) => {
      toast.error('Registration failed', { description: err.message });
    },
    onSuccess: ({ data }) => {
      toast.success('Registration successful.', {
        description: 'User was registred successfully. ',
      });
    },
  });

  return (
    <div
      className="flex max-w-sm flex-col items-center"
      data-testid="register-page"
    >
      <h1 className="mb-6 text-large-semi uppercase">Become a member</h1>
      <p className="mb-4 text-center text-base-regular text-ui-fg-base">
        Create your Cellthium profile and get access to an enhanced experience.
      </p>
      <form
        className="flex w-full flex-col gap-y-4"
        onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();

          const formData = new FormData(event.currentTarget);
          await execute({
            email: formData.get('email') as string,
            first_name: formData.get('first_name') as string,
            last_name: formData.get('last_name') as string,
            password: formData.get('password') as string,
            phone: formData.get('phone') as string | undefined,
          });
        }}
      >
        <div className="flex w-full flex-col gap-y-2">
          <Input
            autoComplete="given-name"
            data-testid="first-name-input"
            label="First name"
            name="first_name"
            required
          />
          <Input
            autoComplete="family-name"
            data-testid="last-name-input"
            label="Last name"
            name="last_name"
            required
          />
          <Input
            autoComplete="email"
            data-testid="email-input"
            label="Email"
            name="email"
            required
            type="email"
          />
          <Input
            autoComplete="tel"
            data-testid="phone-input"
            label="Phone"
            name="phone"
            type="tel"
          />
          <Input
            autoComplete="new-password"
            data-testid="password-input"
            label="Password"
            name="password"
            required
            type="password"
          />
        </div>

        {isError ? (
          <Banner
            description={error.message}
            title="Registration failed."
            type="error"
          />
        ) : null}

        <span className="mt-6 text-center text-small-regular text-ui-fg-base">
          By creating an account, you agree to Cellthium&apos;s{' '}
          <LocalizedClientLink
            className="underline"
            href="/content/privacy-policy"
          >
            Privacy Policy
          </LocalizedClientLink>{' '}
          and{' '}
          <LocalizedClientLink
            className="underline"
            href="/content/terms-of-use"
          >
            Terms of Use
          </LocalizedClientLink>
          .
        </span>

        {isPending ? (
          <Button className="mt-6 w-full" disabled={isPending}>
            <div className="flex items-center gap-x-1">
              <Loader className="animate-spin" size={16} />
              <p>Loading</p>
            </div>
          </Button>
        ) : (
          <SubmitButton className="mt-6 w-full" data-testid="register-button">
            Join
          </SubmitButton>
        )}
      </form>
      <span className="mt-6 text-center text-small-regular text-ui-fg-base">
        Already a member?{' '}
        <button
          className="underline"
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
        >
          Sign in
        </button>
        .
      </span>
    </div>
  );
};

export default Register;
