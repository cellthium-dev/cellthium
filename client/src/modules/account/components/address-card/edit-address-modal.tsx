'use client';

import {
  deleteCustomerAddress,
  updateCustomerAddress,
} from '@lib/data/customer';
import useToggleState from '@lib/hooks/use-toggle-state';
import { PencilSquare as Edit, Trash } from '@medusajs/icons';
import type { HttpTypes } from '@medusajs/types';
import { Button, clx, Heading, Text } from '@medusajs/ui';
import CountrySelect from '@modules/checkout/components/country-select';
import { SubmitButton } from '@modules/checkout/components/submit-button';
import Input from '@modules/common/components/input';
import Modal from '@modules/common/components/modal';
import Spinner from '@modules/common/icons/spinner';
import type React from 'react';
import { useActionState, useEffect, useState } from 'react';

type EditAddressProps = {
  region: HttpTypes.StoreRegion;
  address: HttpTypes.StoreCustomerAddress;
  isActive?: boolean;
};

const EditAddress: React.FC<EditAddressProps> = ({
  region,
  address,
  isActive = false,
}) => {
  const [removing, setRemoving] = useState(false);
  const [successState, setSuccessState] = useState(false);
  const { state, open, close: closeModal } = useToggleState(false);

  const [formState, formAction] = useActionState(updateCustomerAddress, {
    success: false,
    error: null,
    addressId: address.id,
  });

  const close = () => {
    setSuccessState(false);
    closeModal();
  };

  useEffect(() => {
    if (successState) {
      close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successState]);

  useEffect(() => {
    if (formState.success) {
      setSuccessState(true);
    }
  }, [formState]);

  const removeAddress = async () => {
    setRemoving(true);
    await deleteCustomerAddress(address.id);
    setRemoving(false);
  };

  return (
    <>
      <div
        className={clx(
          'flex h-full min-h-[220px] w-full flex-col justify-between rounded-rounded border p-5 transition-colors',
          {
            'border-gray-900': isActive,
          }
        )}
        data-testid="address-container"
      >
        <div className="flex flex-col">
          <Heading
            className="text-left text-base-semi"
            data-testid="address-name"
          >
            {address.first_name} {address.last_name}
          </Heading>
          {address.company && (
            <Text
              className="txt-compact-small text-ui-fg-base"
              data-testid="address-company"
            >
              {address.company}
            </Text>
          )}
          <Text className="mt-2 flex flex-col text-left text-base-regular">
            <span data-testid="address-address">
              {address.address_1}
              {address.address_2 && <span>, {address.address_2}</span>}
            </span>
            <span data-testid="address-postal-city">
              {address.postal_code}, {address.city}
            </span>
            <span data-testid="address-province-country">
              {address.province && `${address.province}, `}
              {address.country_code?.toUpperCase()}
            </span>
          </Text>
        </div>
        <div className="flex items-center gap-x-4">
          <button
            className="flex items-center gap-x-2 text-small-regular text-ui-fg-base"
            data-testid="address-edit-button"
            onClick={open}
          >
            <Edit />
            Edit
          </button>
          <button
            className="flex items-center gap-x-2 text-small-regular text-ui-fg-base"
            data-testid="address-delete-button"
            onClick={removeAddress}
          >
            {removing ? <Spinner /> : <Trash />}
            Remove
          </button>
        </div>
      </div>

      <Modal close={close} data-testid="edit-address-modal" isOpen={state}>
        <Modal.Title>
          <Heading className="mb-2">Edit address</Heading>
        </Modal.Title>
        <form action={formAction}>
          <input name="addressId" type="hidden" value={address.id} />
          <Modal.Body>
            <div className="grid grid-cols-1 gap-y-2">
              <div className="grid grid-cols-2 gap-x-2">
                <Input
                  autoComplete="given-name"
                  data-testid="first-name-input"
                  defaultValue={address.first_name || undefined}
                  label="First name"
                  name="first_name"
                  required
                />
                <Input
                  autoComplete="family-name"
                  data-testid="last-name-input"
                  defaultValue={address.last_name || undefined}
                  label="Last name"
                  name="last_name"
                  required
                />
              </div>
              <Input
                autoComplete="organization"
                data-testid="company-input"
                defaultValue={address.company || undefined}
                label="Company"
                name="company"
              />
              <Input
                autoComplete="address-line1"
                data-testid="address-1-input"
                defaultValue={address.address_1 || undefined}
                label="Address"
                name="address_1"
                required
              />
              <Input
                autoComplete="address-line2"
                data-testid="address-2-input"
                defaultValue={address.address_2 || undefined}
                label="Apartment, suite, etc."
                name="address_2"
              />
              <div className="grid grid-cols-[144px_1fr] gap-x-2">
                <Input
                  autoComplete="postal-code"
                  data-testid="postal-code-input"
                  defaultValue={address.postal_code || undefined}
                  label="Postal code"
                  name="postal_code"
                  required
                />
                <Input
                  autoComplete="locality"
                  data-testid="city-input"
                  defaultValue={address.city || undefined}
                  label="City"
                  name="city"
                  required
                />
              </div>
              <Input
                autoComplete="address-level1"
                data-testid="state-input"
                defaultValue={address.province || undefined}
                label="Province / State"
                name="province"
              />
              <CountrySelect
                autoComplete="country"
                data-testid="country-select"
                defaultValue={address.country_code || undefined}
                name="country_code"
                region={region}
                required
              />
              <Input
                autoComplete="phone"
                data-testid="phone-input"
                defaultValue={address.phone || undefined}
                label="Phone"
                name="phone"
              />
            </div>
            {formState.error && (
              <div className="py-2 text-rose-500 text-small-regular">
                {formState.error}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <div className="mt-6 flex gap-3">
              <Button
                className="h-10"
                data-testid="cancel-button"
                onClick={close}
                type="reset"
                variant="secondary"
              >
                Cancel
              </Button>
              <SubmitButton data-testid="save-button">Save</SubmitButton>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default EditAddress;
