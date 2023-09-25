import { StrapiPayloadEntity } from "../strapi_payload_entity";


export interface NotificationPayload extends StrapiPayloadEntity<Notification>{
}

export interface Notification {
  id: string;
  message: string;
  type: string;
  user_id: number;
  Metadata: any;
}
