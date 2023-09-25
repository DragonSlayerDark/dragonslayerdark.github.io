import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Notification } from '../models/notification.model';
import { EntityStrapi } from '../strapi_payload_entity';

export const loadNotification = createAction(
  '[Notification/API] Load Notification',
  props<{ id: number }>()
);

export const loadNotificationSuccess = createAction(
  '[Notificatin/API] Load Notification Success',
  props<{ notification: EntityStrapi<Notification>[] }>()
);

export const loadNotificationError = createAction(
  '[Notificatin/API] Load Notification Error',
  props<{ payload: any }>()
);
