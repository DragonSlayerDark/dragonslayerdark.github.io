import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectAll, State } from '../reducers/commercial.reducer';

export const selectCommercialsState = createFeatureSelector<State>('commercials');

export const selectAllCommercials = createSelector(
  selectCommercialsState,
  selectAll
);

