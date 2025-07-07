'use client';

import { resetPassword, resetPasswordToken } from '@lib/data/customer';
import { toast } from '@medusajs/ui';
import Banner from '@modules/common/components/banner';
import Input from '@modules/common/components/input';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import { Loader } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useServerAction } from 'zsa-react';
import { Button, buttonVariants } from '@/_components/ui/button';
import useRedirectWithCounter from './useCounter';

type TResetPasswordParams = {
  readonly token: string;
  readonly email: string;
};

export default function ResetPassword() {
  /** action to request reset password token. */
  const { isPending, executeFormAction, isSuccess } = useServerAction(
    resetPasswordToken,
    {
      onSuccess: () => {
        toast.success('Reset password mail sent.', {
          description: 'Password reset email sent. Please check your inbox.',
        });
      },
      onError: ({ err }) => {
        toast.error('Reset password failed.', {
          description:
            (err?.code === 'INPUT_PARSE_ERROR' && 'Email field required.') ||
            'An error occurred while sending the reset password email.',
        });
      },
    }
  );

  const params = useSearchParams();
  const { token, email } = Object.fromEntries(params) as TResetPasswordParams;

  /** hook to display dynamic counter after reset password. */
  const { count, start } = useRedirectWithCounter(5, '/account');

  /** action to perform password reset. */
  const {
    isPending: isResetPending,
    execute,
    isSuccess: isResetSuccess,
  } = useServerAction(resetPassword, {
    onSuccess: () => {
      toast.success('Password reset successful.', {
        description: 'Your password has been reset.',
      });

      start();
    },
    onError: ({ err }) => {
      toast.error('Password reset failed.', {
        description:
          (err?.code === 'INPUT_PARSE_ERROR' && 'Password fields required.') ||
          err.message ||
          'An error occurred while resetting your password.',
      });
    },
  });

  const handleResetPassword = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const password = formData.get('password');
    const passwordConfirm = formData.get('password-confirm');

    if (!(password && passwordConfirm)) {
      toast.error('Password fields required.', {
        description: 'Please fill in both password fields.',
      });
      return;
    }

    await execute({
      password: password as string,
      'password-confirm': passwordConfirm as string,
      token,
    });
  };

  return (
    <div className="mx-auto grid max-w-sm items-center justify-center gap-8 py-40">
      <div className="grid gap-4 text-center">
        <h1 className="font-semibold text-lg uppercase">Reset password</h1>
        <p className="text-sm">
          Enter your email below, and we will send you instructions on how to
          reset your password.
        </p>
      </div>

      <div className="grid gap-4">
        {token && email ? (
          <form className="grid w-full gap-8" onSubmit={handleResetPassword}>
            <div className="grid gap-4">
              <Input
                label="Password"
                name="password"
                required
                type="password"
              />
              <Input
                label="Confirm password"
                name="password-confirm"
                required
                type="password"
              />
              {isResetSuccess ? (
                <Banner
                  description={
                    <>
                      Your password was successfully reset. You will be
                      automatically redirected to the login page. Redirect in{' '}
                      <span className="inline-flex size-5 items-center justify-center rounded-sm bg-gray-300 font-mono">
                        {count}
                      </span>
                      .
                    </>
                  }
                  title="Reset password was successful."
                  type="success"
                />
              ) : null}
            </div>
            <Button disabled={isResetPending} type="submit">
              {isResetPending ? (
                <div className="flex items-center gap-2">
                  <Loader className="h-4 w-4 animate-spin" />
                  <p>Loading ...</p>
                </div>
              ) : (
                <p>Reset password</p>
              )}
            </Button>
          </form>
        ) : (
          <form
            action={(payload) => void executeFormAction(payload)}
            className="grid w-full gap-8"
          >
            <Input
              autoComplete="email"
              label="Email"
              name="email"
              required
              type="email"
            />
            {isSuccess ? (
              <Banner
                description="We've sent you an email which you can use to reset your
                    password. Please also check the spam folder if you haven't
                    received it after a few minutes."
                title="Password reset email was sent successfully."
                type="success"
              />
            ) : null}
            <Button disabled={isPending} type="submit">
              {isPending ? (
                <div className="flex items-center gap-2">
                  <Loader className="h-4 w-4 animate-spin" />
                  <p>Loading ...</p>
                </div>
              ) : (
                <p>Request Password Reset</p>
              )}
            </Button>
          </form>
        )}

        <LocalizedClientLink
          className={buttonVariants({ variant: 'link' })}
          href="/account"
        >
          Back to login
        </LocalizedClientLink>
      </div>
    </div>
  );
}
