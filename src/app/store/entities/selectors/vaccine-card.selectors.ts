import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, usersFeatureKey, selectAll } from '../reducers/user.reducer';
import { vaccineCardsFeatureKey } from '../reducers/vaccine-card.reducer';

export const selectVaccineCardState = createFeatureSelector<State>(vaccineCardsFeatureKey);

export const selectAllVaccineCards = createSelector(
    selectVaccineCardState,
    selectAll
);

export const selectVaccineCardByPetId = (id: string | number) => createSelector(
    selectVaccineCardState,
    (state: State) => state.entities[id]
);