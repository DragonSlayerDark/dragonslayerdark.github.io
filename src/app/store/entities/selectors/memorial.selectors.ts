import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectAll, State } from '../reducers/memorial.reducer';

export const selectMemorialsState = createFeatureSelector<State>('memorials');

export const selectAllMemorials = createSelector(
  selectMemorialsState,
  selectAll
);
