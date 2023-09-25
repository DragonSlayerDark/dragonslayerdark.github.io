import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { PushNotification } from '../models/push_notification.model';
import * as PushNotificationActions from '../actions/push-notifications.actions';
import { EntityStrapi } from '../../entities/strapi_payload_entity';

export const pushNotificationFeatureKey = 'devicePushNotifications';
export interface State extends EntityState<EntityStrapi<PushNotification>> {
  // additional entities state properties
};

export const adapter: EntityAdapter<EntityStrapi<PushNotification>> = createEntityAdapter<EntityStrapi<PushNotification>>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
    initialState,
    on(PushNotificationActions.addToken,
      (state, action) => adapter.addOne(action.devicePushNotifications, state)
    ),
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();