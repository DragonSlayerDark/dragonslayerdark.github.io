import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Product } from '../models/product.model';
import { EntityStrapi } from '../strapi_payload_entity';

export const loadProducts = createAction(
  '[Product/API] Load Products',
  props<{
    page: number
  }>()
);

export const loadProduct = createAction(
  '[Product/API] Load Product',
  props<{ id: string | number }>()
);

export const loadProductSuccess = createAction(
  '[Product/API] Load Product Success',
  props<{ product: EntityStrapi<Product> }>()
);

export const loadProductsById = createAction(
  '[Product/API] Load Products By Id',
  props<{pet_type_id: string | number}>()
);

export const loadProductsByIdSuccess = createAction(
  '[Product/API] Load Products By Id Success',
  props<{ products: EntityStrapi<Product>[] }>()
);

export const loadProductsByPetTypeId = createAction(
  '[Product/API] Load Products By PetType Id',
  props<{ pet_type_id: string | number, page:number }>()
);

export const loadProductsByPetTypeIdSuccess = createAction(
  '[Product/API] Load Products By PetType Id Success',
  props<{ products: EntityStrapi<Product>[] }>()
);

export const loadProductsSuccess = createAction(
  '[Product/API] Load Products Success',
  props<{ products: EntityStrapi<Product>[] }>()
);

export const loadVaccineProducts = createAction(
  '[Product/API] Load Vaccine Products',
  props<{ id1: string | number, id2: string | number }>()
);

export const loadVaccineProductsSuccess = createAction(
  '[Product/API] Load Vaccine Products Success',
  props<{ products: EntityStrapi<Product>[] }>()
);

export const addProduct = createAction(
  '[Product/API] Add Product',
  props<{ product: EntityStrapi<Product> }>()
);

export const upsertProduct = createAction(
  '[Product/API] Upsert Product',
  props<{ product: EntityStrapi<Product> }>()
);

export const addProducts = createAction(
  '[Product/API] Add Products',
  props<{ products: EntityStrapi<Product>[] }>()
);

export const upsertProducts = createAction(
  '[Product/API] Upsert Products',
  props<{ products: EntityStrapi<Product>[] }>()
);

export const updateProduct = createAction(
  '[Product/API] Update Product',
  props<{ product: Update<EntityStrapi<Product>> }>()
);

export const updateProducts = createAction(
  '[Product/API] Update Products',
  props<{ products: Update<EntityStrapi<Product>>[] }>()
);

export const deleteProduct = createAction(
  '[Product/API] Delete Product',
  props<{ id: string }>()
);

export const deleteProducts = createAction(
  '[Product/API] Delete Products',
  props<{ ids: string[] }>()
);

export const clearProducts = createAction(
  '[Product/API] Clear Products'
);

export const failure = createAction(
  '[Product/API] Failure',
  props<{ error: any }>()
);
