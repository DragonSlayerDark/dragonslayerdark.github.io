import { StrapiPayloadEntity } from "../strapi_payload_entity";


export interface PetTypePayload extends StrapiPayloadEntity<PetType>{
}

export interface PetType {
  id: string;
  name: string;
  icon: any;
}
