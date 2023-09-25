import { PetType } from "./pet-type.model";
import { Vaccine } from "./vaccine-card.model";

export interface Dewormer {
  id: string;
  vaccines: Vaccine[];
  pet_type: PetType;
}

