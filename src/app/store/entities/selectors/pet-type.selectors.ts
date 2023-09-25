import { createFeatureSelector, createSelector } from '@ngrx/store';
import { petTypesFeatureKey, selectAll, State } from '../reducers/pet-type.reducer';

export const selectPetTypesState = createFeatureSelector<State>(petTypesFeatureKey);

export const selectAllPetTypes = createSelector(
    selectPetTypesState,
    selectAll
);