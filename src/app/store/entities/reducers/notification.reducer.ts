import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Notification } from '../models/notification.model';
import * as NotificationActions from '../actions/notification.actions';
import { EntityStrapi } from '../strapi_payload_entity';

export const notificationFeatureKey = 'notifications';

export interface State extends EntityState<EntityStrapi<Notification>> {
  // additional entities state properties
}

export const adapter: EntityAdapter<EntityStrapi<Notification>> = 
  createEntityAdapter<EntityStrapi<Notification>>();

export const initialState: State = adapter.getInitialState({
    // additional entity state properties
});
  
export const reducer = createReducer(
    initialState,
    on(NotificationActions.loadNotificationSuccess,
      (state, { notification }) =>  adapter.setAll(notification, state)
    )
);

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();
