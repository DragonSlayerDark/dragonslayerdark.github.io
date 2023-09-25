import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { notificationFeatureKey, selectAll, State } from '../reducers/notification.reducer';

export const getNotificationState = createFeatureSelector<State>(notificationFeatureKey);

export const selectAllNotification = createSelector(
    getNotificationState,
    selectAll
);
