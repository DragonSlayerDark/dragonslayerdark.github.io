import { createAction, props } from "@ngrx/store";

import { PushNotification } from "../models/push_notification.model";
import { EntityStrapi } from "../../entities/strapi_payload_entity";

export const addToken = createAction(
    '[Pusn Notification] Add Token To User',
    props<{ devicePushNotifications: any }>()
);

export const addTokenSuccess = createAction(
    '[Pusn Notification] Add Token To User Success',
    props<{ devicePushNotifications: EntityStrapi<PushNotification> }>()
);

export const addTokenError = createAction(
    '[Pusn Notification] Add Token To User Error',
    props<{ payload: any }>()
);
