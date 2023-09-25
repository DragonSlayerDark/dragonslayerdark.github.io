import { StrapiPayloadEntity } from "../../../store/entities/strapi_payload_entity";

export interface PushNotificationPayload extends StrapiPayloadEntity<PushNotification>{
}

export interface PushNotification {
    users_permissions_user: number,
    subscription: any;
}
  