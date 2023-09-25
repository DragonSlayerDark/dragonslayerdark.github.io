import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Address } from '../models/address.model';
import * as AddressActions from '../actions/address.actions';

export const addressesFeatureKey = 'addresses';

export interface State extends EntityState<Address> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Address> = createEntityAdapter<Address>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(AddressActions.addAddressSuccess,
    (state, action) => adapter.addOne(action.address, state)
  ),
  on(AddressActions.upsertAddress,
    (state, action) => adapter.upsertOne(action.address, state)
  ),
  on(AddressActions.addAddresss,
    (state, action) => adapter.addMany(action.addresss, state)
  ),
  on(AddressActions.upsertAddresss,
    (state, action) => adapter.upsertMany(action.addresss, state)
  ),
  on(AddressActions.updateAddressSuccess,
    (state, action) => adapter.updateOne(action.address, state)
  ),
  on(AddressActions.updateAddresss,
    (state, action) => adapter.updateMany(action.addresss, state)
  ),
  on(AddressActions.deleteAddress,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(AddressActions.deleteAddresss,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(AddressActions.loadAddressesSuccess,
    (state, action) => adapter.setAll(action.addresses, state)
  ),
  on(AddressActions.clearAddresss,
    state => adapter.removeAll(state)
  ),
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
