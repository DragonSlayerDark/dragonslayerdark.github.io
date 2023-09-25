import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Category } from '../models/category.model';
import { EntityStrapi } from '../strapi_payload_entity';


export const loadCategories = createAction(
  '[Category/API] Load Categories',
  props<{ id: string | number }>()
)

export const loadcategoriesSuccess = createAction(
  '[Category/API] Load categories Success',
  props<{ categories: EntityStrapi<Category>[] }>()
);

export const addCategory = createAction(
  '[Category/API] Add Category',
  props<{ category: EntityStrapi<Category> }>()
);

export const upsertCategory = createAction(
  '[Category/API] Upsert Category',
  props<{ category: EntityStrapi<Category> }>()
);

export const addcategories = createAction(
  '[Category/API] Add categories',
  props<{ categories: EntityStrapi<Category>[] }>()
);

export const upsertcategories = createAction(
  '[Category/API] Upsert categories',
  props<{ categories: EntityStrapi<Category>[] }>()
);

export const updateCategory = createAction(
  '[Category/API] Update Category',
  props<{ category: Update<EntityStrapi<Category>> }>()
);

export const updatecategories = createAction(
  '[Category/API] Update categories',
  props<{ categories: Update<EntityStrapi<Category>>[] }>()
);

export const deleteCategory = createAction(
  '[Category/API] Delete Category',
  props<{ id: string }>()
);

export const deletecategories = createAction(
  '[Category/API] Delete categories',
  props<{ ids: string[] }>()
);

export const clearcategories = createAction(
  '[Category/API] Clear categories'
);

export const failure = createAction(
  '[Category/API] Failure',
  props<{ error: any }>()
);
