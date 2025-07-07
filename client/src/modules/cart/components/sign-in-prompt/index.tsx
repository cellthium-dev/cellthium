import { Button, Heading, Text } from '@medusajs/ui';
import LocalizedClientLink from '@modules/common/components/localized-client-link';

const SignInPrompt = () => {
  return (
    <div className="flex items-center justify-between bg-white">
      <div>
        <Heading className="txt-xlarge" level="h2">
          Already have an account?
        </Heading>
        <Text className="txt-medium mt-2 text-ui-fg-subtle">
          Sign in for a better experience.
        </Text>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <Button
            className="h-10"
            data-testid="sign-in-button"
            variant="secondary"
          >
            Sign in
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  );
};

export default SignInPrompt;
