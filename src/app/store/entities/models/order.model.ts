import { User } from 'src/app/auth_services/model/user.model';
import { EntityStrapi } from '../strapi_payload_entity';
import { PetPayload } from './pet.model';
import { Product } from './product.model';

export interface Order {
  id: string;
  subtotal: number;
  orderDate: Date;
  tax: number;
  payment: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  user: User;
  deliveryAddress: any;
  paid: boolean;
  pet: PetPayload;
  products: {
    product: {
      data: EntityStrapi<Product>
    }
    quantity:number;
  }[];
}
