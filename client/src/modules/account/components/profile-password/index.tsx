'use client';

import type { HttpTypes } from '@medusajs/types';
import { toast } from '@medusajs/ui';
import Input from '@modules/common/components/input';
import React, { useActionState, useEffect } from 'react';
import AccountInfo from '../account-info';

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer;
};

const ProfilePassword: React.FC<MyInformationProps> = ({ customer }) => {
  const [successState, setSuccessState] = React.useState(false);

  // TODO: Add support for password updates
  const updatePassword = async () => {
    toast.info('Password update is not implemented');
  };

  const clearState = () => {
    setSuccessState(false);
  };

  return (
    <form
      action={updatePassword}
      className="w-full"
      onReset={() => clearState()}
    >
      <AccountInfo
        clearState={clearState}
        currentInfo={
          <span>The password is not shown for security reasons</span>
        }
        data-testid="account-password-editor"
        errorMessage={undefined}
        isError={false}
        isSuccess={successState}
        label="Password"
      >
        <div className="grid grid-cols-2 gap-4">
          <Input
            data-testid="old-password-input"
            label="Old password"
            name="old_password"
            required
            type="password"
          />
          <Input
            data-testid="new-password-input"
            label="New password"
            name="new_password"
            required
            type="password"
          />
          <Input
            data-testid="confirm-password-input"
            label="Confirm password"
            name="confirm_password"
            required
            type="password"
          />
        </div>
      </AccountInfo>
    </form>
  );
};

export default ProfilePassword;
