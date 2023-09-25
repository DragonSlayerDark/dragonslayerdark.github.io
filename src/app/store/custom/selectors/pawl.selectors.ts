import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "../reducers/pawl.reducer";

export const getState = createFeatureSelector<State>('pawl');


export const selectLoading = createSelector(
    getState,
    (state: State) => state.numberRequests > 0
);