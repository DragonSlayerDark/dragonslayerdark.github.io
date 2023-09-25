import { StrapiPayloadEntity } from "../strapi_payload_entity";


export interface CommercialPayload extends StrapiPayloadEntity<Commercial>{
}

export interface Commercial {
  id: string;
  name: string;
  publicity: any;
}
