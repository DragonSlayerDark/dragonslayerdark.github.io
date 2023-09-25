import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectAll, State } from '../reducers/pet-breed.reducer';

export const selectPetBreedsState = createFeatureSelector<State>('petBreeds');

export const selectAllPetBreeds = createSelector(
    selectPetBreedsState,
    selectAll
);