'use client';

import { addCustomerAddress } from '@lib/data/customer';
import useToggleState from '@lib/hooks/use-toggle-state';
import { Plus } from '@medusajs/icons';
import type { HttpTypes } from '@medusajs/types';
import { Button, Heading } from '@medusajs/ui';
import CountrySelect from '@modules/checkout/components/country-select';
import { SubmitButton } from '@modules/checkout/components/submit-button';
import Input from '@modules/common/components/input';
import Modal from '@modules/common/components/modal';
import { useActionState, useEffect, useState } from 'react';

const AddAddress = ({
  region,
  addresses,
}: {
  region: HttpTypes.StoreRegion;
  addresses: HttpTypes.StoreCustomerAddress[];
}) => {
  const [successState, setSuccessState] = useState(false);
  const { state, open, close: closeModal } = useToggleState(false);

  const [formState, formAction] = useActionState(addCustomerAddress, {
    isDefaultShipping: addresses.length === 0,
    success: false,
    error: null,
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

  return (
    <>
      <button
        className="flex h-full min-h-[220px] w-full flex-col justify-between rounded-rounded border border-ui-border-base p-5"
        data-testid="add-address-button"
        onClick={open}
      >
        <span className="text-base-semi">New address</span>
        <Plus />
      </button>

      <Modal close={close} data-testid="add-address-modal" isOpen={state}>
        <Modal.Title>
          <Heading className="mb-2">Add address</Heading>
        </Modal.Title>
        <form action={formAction}>
          <Modal.Body>
            <div className="flex flex-col gap-y-2">
              <div className="grid grid-cols-2 gap-x-2">
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
              </div>
              <Input
                autoComplete="organization"
                data-testid="company-input"
                label="Company"
                name="company"
              />
              <Input
                autoComplete="address-line1"
                data-testid="address-1-input"
                label="Address"
                name="address_1"
                required
              />
              <Input
                autoComplete="address-line2"
                data-testid="address-2-input"
                label="Apartment, suite, etc."
                name="address_2"
              />
              <div className="grid grid-cols-[144px_1fr] gap-x-2">
                <Input
                  autoComplete="postal-code"
                  data-testid="postal-code-input"
                  label="Postal code"
                  name="postal_code"
                  required
                />
                <Input
                  autoComplete="locality"
                  data-testid="city-input"
                  label="City"
                  name="city"
                  required
                />
              </div>
              <Input
                autoComplete="address-level1"
                data-testid="state-input"
                label="Province / State"
                name="province"
              />
              <CountrySelect
                autoComplete="country"
                data-testid="country-select"
                name="country_code"
                region={region}
                required
              />
              <Input
                autoComplete="phone"
                data-testid="phone-input"
                label="Phone"
                name="phone"
              />
            </div>
            {formState.error && (
              <div
                className="py-2 text-rose-500 text-small-regular"
                data-testid="address-error"
              >
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

export default AddAddress;
