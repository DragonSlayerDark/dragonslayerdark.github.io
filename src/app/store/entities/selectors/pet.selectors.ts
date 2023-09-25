import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectAll, State } from '../reducers/pet.reducer';

export const selectPetsState = createFeatureSelector<State>('pets');

export const selectAllPets = createSelector(
    selectPetsState,
    selectAll
);

// Select a pet by id

export const selectPetById = (id: number | string) => createSelector(
    selectPetsState,
    (state: State) => state.entities[id]
);
