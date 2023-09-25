import { StrapiPayloadEntity } from "src/app/store/entities/strapi_payload_entity";
import { Category, CategoryPayload } from "./category.model";
import { PetTypePayload } from "./pet-type.model";
import { SubCategory, SubCategoryPayload } from "./sub-category.model";

export interface ProductPayload extends StrapiPayloadEntity<Product>{
}

export interface Product {
  name: string;
  description: string;
  fullDescription: string;
  subtotal: number;
  tax: number;
  brand: string;
  size: string;
  pet_type: PetTypePayload;
  category: CategoryPayload;
  sub_category: SubCategoryPayload;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  stripe_id: string;
}
