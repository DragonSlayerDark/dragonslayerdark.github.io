import { StrapiPayloadEntity } from "../strapi_payload_entity";

export interface SubCategoryPayload extends StrapiPayloadEntity<SubCategory>{
}

export interface SubCategory {
  id: string;
  name: string;
}
