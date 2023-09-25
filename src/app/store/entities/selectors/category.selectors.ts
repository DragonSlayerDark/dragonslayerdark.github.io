import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectAll, State } from '../reducers/category.reducer';

export const selectCategoriesState = createFeatureSelector<State>('categories');

export const selectAllCategories = createSelector(
  selectCategoriesState,
  selectAll
);
