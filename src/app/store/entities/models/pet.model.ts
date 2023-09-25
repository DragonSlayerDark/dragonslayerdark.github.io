import { StrapiPayloadEntity } from "src/app/store/entities/strapi_payload_entity";
import { PetBreed, PetBreedPayload } from "./pet-breed.model";

export interface PetPayload extends StrapiPayloadEntity<Pet>{
}

export interface Pet {
  name: string;
  photo: any;
  dob: Date;
  gender: Gender;
  user: any;
  memorial: boolean;
  fallecimiento: Date;
  pet_size: PetSize;
  pet_type: PetTypePayload;
  pet_breed: PetBreedPayload;
  pet_second_breed: PetBreedPayload;
  vaccine_card: any,
  dewormer: any,
  vaccine_history: any
}

interface PetTypePayload extends StrapiPayloadEntity<PetType>{
}

interface PetType {
  name: string;
}

type Gender = 'male' | 'female';
type PetSize = 'small' | 'medium' | 'large' | 'xlarge';
