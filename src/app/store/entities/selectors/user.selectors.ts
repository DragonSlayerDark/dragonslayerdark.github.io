import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, usersFeatureKey, selectAll } from '../reducers/user.reducer';

export const selectUsersState = createFeatureSelector<State>(usersFeatureKey);

export const selectAllUsers = createSelector(
    selectUsersState,
    selectAll
);