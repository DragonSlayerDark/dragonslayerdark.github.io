import { StrapiPayloadEntity } from "../strapi_payload_entity";

export interface PetBreedPayload extends StrapiPayloadEntity<PetBreed>{
}

export interface PetBreed {
  id: string;
  name: string;
}
