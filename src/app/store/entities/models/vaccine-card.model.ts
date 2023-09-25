import { PetType } from "./pet-type.model";
import { Product } from './product.model';

export interface VaccineCard {
  id: string;
  vaccines: Vaccine[];
  pet_type: PetType;
}


export interface Vaccine {
  id: number;
  name: string;
  vaccines_cards: VaccineCard[];
  product: Product
}
