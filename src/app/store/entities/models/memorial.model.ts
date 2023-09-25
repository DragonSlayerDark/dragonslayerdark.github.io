import { StrapiPayloadEntity } from "../strapi_payload_entity";

export interface MemorialPayload extends StrapiPayloadEntity<Memorial> {
}

export interface Memorial {
  id: string;
  name: string;
  media: any;
}
