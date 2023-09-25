import { Product } from "../../entities/models/product.model";
import { EntityStrapi } from "../../entities/strapi_payload_entity";

export interface CartEntity {
    product: EntityStrapi<Product>;
    quantity: number;
}