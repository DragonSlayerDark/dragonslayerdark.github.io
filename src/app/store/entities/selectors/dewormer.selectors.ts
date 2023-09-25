import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, usersFeatureKey, selectAll } from '../reducers/user.reducer';
import { dewormersFeatureKey } from '../reducers/dewormer.reducer'

export const selectDewormerState = createFeatureSelector<State>(dewormersFeatureKey);

export const selectAllDewormers = createSelector(
  selectDewormerState,
  selectAll
);

export const selectDewormerById = (id: string | number) => createSelector(
  selectDewormerState,
  (state: State) => state.entities[id]
)
