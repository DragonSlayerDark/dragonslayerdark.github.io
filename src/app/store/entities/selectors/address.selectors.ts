import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, addressesFeatureKey, selectAll } from '../reducers/address.reducer';

export const selectAddressState = createFeatureSelector<State>(addressesFeatureKey);

export const selectAllAddress = createSelector(selectAddressState, selectAll);

export const selectAddressById = (id: number | string) => createSelector(
  selectAddressState,
  (state: State) => state.entities[id]
)
