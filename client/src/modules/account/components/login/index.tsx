import { login, loginWithGoogle } from '@lib/data/customer';
import { toast } from '@medusajs/ui';
import { LOGIN_VIEW } from '@modules/account/templates/login-template';
import { SubmitButton } from '@modules/checkout/components/submit-button';
import Banner from '@modules/common/components/banner';
import Input from '@modules/common/components/input';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import { Loader } from 'lucide-react';
import { redirect, useRouter } from 'next/navigation';
import type React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useServerAction } from 'zsa-react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void;
};

const Login = ({ setCurrentView }: Props) => {
  const {
    error,
    isError,
    execute: onLogin,
  } = useServerAction(login, {
    onError: ({ err }) => {
      toast.error('Login failed', { description: err.message });
    },
    onSuccess: () => {
      toast.success('Login successful');
      redirect('');
    },
  });

  const router = useRouter();
  const { isPending, execute } = useServerAction(loginWithGoogle, {
    onError: ({ err }) => {
      toast.error('Authentication failed', { description: err.message });
    },
    onSuccess: ({ data }) => {
      if (data.location) router.push(data.location);
    },
  });

  return (
    <div
      className="flex w-full max-w-sm flex-col items-center"
      data-testid="login-page"
    >
      <h1 className="mb-6 text-large-semi uppercase">Welcome back</h1>
      <p className="mb-8 text-center text-base-regular text-ui-fg-base">
        Sign in to access an enhanced shopping experience.
      </p>

      <div className="grid w-full gap-y-2">
        <form
          className="grid w-full gap-y-4"
          onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const formData = new FormData(event.currentTarget);
            await onLogin(formData);
          }}
        >
          <div className="flex w-full flex-col gap-y-2">
            <Input
              autoComplete="email"
              data-testid="email-input"
              label="Email"
              name="email"
              required
              title="Enter a valid email address."
              type="email"
            />
            <Input
              autoComplete="current-password"
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
              title="Login failed."
              type="error"
            />
          ) : null}

          <SubmitButton className="mt-6 w-full" data-testid="sign-in-button">
            Sign in
          </SubmitButton>
        </form>

        <div className="flex w-full items-center gap-x-4 ">
          <Separator className="flex-1" orientation="horizontal" />
          <span className="mx-auto">or</span>
          <Separator className="flex-1" orientation="horizontal" />
        </div>

        <Button
          disabled={isPending}
          onClick={async () => await execute()}
          variant={'outline-solid'}
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              <Loader className="animate-spin" size={16} />
              <p>Logging in ...</p>
            </div>
          ) : (
            <>
              <FaGoogle className="mr-2" />
              Continue with Google
            </>
          )}
        </Button>
      </div>

      <span className="mt-4 text-center text-small-regular text-ui-fg-base">
        Not a member?{' '}
        <button
          className="underline"
          data-testid="register-button"
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
        >
          Join us
        </button>
        .
      </span>
      <span className="mt-4 text-center text-small-regular text-ui-fg-base">
        Forgot password?{' '}
        <LocalizedClientLink
          className="underline"
          data-testid="register-button"
          href="/reset-password"
        >
          Reset
        </LocalizedClientLink>
      </span>
    </div>
  );
};

export default Login;
