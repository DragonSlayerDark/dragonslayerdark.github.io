import { StrapiPayloadEntity } from "../strapi_payload_entity";

export interface CategoryPayload extends StrapiPayloadEntity<Category>{
}


export interface Category {
  id: string;
  name: string;
}
