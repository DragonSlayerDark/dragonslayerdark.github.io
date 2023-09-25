import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Address } from '../models/address.model';

export const loadAddresses = createAction(
  '[Address/API] Load Addresss',
  props<{ userID: string | number }>()
);

export const loadAddressesSuccess = createAction(
  '[Address/API] Load Addresses Success',
  props<{ addresses: Address[] }>()
);

export const addAddress = createAction(
  '[Address/API] Add Address',
  props<{
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    name: string;
  }>()
);

export const addAddressSuccess = createAction(
  '[Address/API] Add Address Success',
  props<{ address: Address }>()
);

export const upsertAddress = createAction(
  '[Address/API] Upsert Address',
  props<{ address: Address }>()
);

export const addAddresss = createAction(
  '[Address/API] Add Addresss',
  props<{ addresss: Address[] }>()
);

export const upsertAddresss = createAction(
  '[Address/API] Upsert Addresss',
  props<{ addresss: Address[] }>()
);

export const updateAddress = createAction(
  '[Address/API] Update Address',
  props<{
    id: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    name: string;
   }>()
);

export const updateAddressSuccess = createAction(
  '[Address/API] Update Address Success',
  props<{ address: Update<Address> }>()
);

export const updateAddresss = createAction(
  '[Address/API] Update Addresss',
  props<{ addresss: Update<Address>[] }>()
);

export const deleteAddress = createAction(
  '[Address/API] Delete Address',
  props<{ id: string }>()
);

export const deleteAddressSuccess = createAction(
  '[Address/API] Delete Address Success',
  props<{ address: Address }>()
);

export const deleteAddresss = createAction(
  '[Address/API] Delete Addresss',
  props<{ ids: string[] }>()
);

export const clearAddresss = createAction(
  '[Address/API] Clear Addresss'
);

export const failure = createAction(
  '[Address/API] Failure',
  props<{ error: any }>()
);
