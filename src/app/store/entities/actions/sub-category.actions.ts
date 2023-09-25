import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { SubCategory } from '../models/sub-category.model';
import { EntityStrapi } from '../strapi_payload_entity';

export const loadSubCategories = createAction (
  '[SubCategory/API] Load SubCategories',
  props <{ id: string | number }>()
)

export const loadSubCategoriesSuccess = createAction(
  '[SubCategory/API] Load SubCategories Success',
  props<{ subCategories: EntityStrapi<SubCategory>[] }>()
);

export const addSubCategory = createAction(
  '[SubCategory/API] Add SubCategory',
  props<{ subCategory: EntityStrapi<SubCategory> }>()
);

export const upsertSubCategory = createAction(
  '[SubCategory/API] Upsert SubCategory',
  props<{ subCategory: EntityStrapi<SubCategory> }>()
);

export const addSubCategories = createAction(
  '[SubCategory/API] Add SubCategories',
  props<{ subCategories: EntityStrapi<SubCategory>[] }>()
);

export const upsertSubCategories = createAction(
  '[SubCategory/API] Upsert SubCategories',
  props<{ subCategories: EntityStrapi<SubCategory>[] }>()
);

export const updateSubCategory = createAction(
  '[SubCategory/API] Update SubCategory',
  props<{ subCategory: Update<EntityStrapi<SubCategory>> }>()
);

export const updateSubCategories = createAction(
  '[SubCategory/API] Update SubCategories',
  props<{ subCategories: Update<EntityStrapi<SubCategory>>[] }>()
);

export const deleteSubCategory = createAction(
  '[SubCategory/API] Delete SubCategory',
  props<{ id: string }>()
);

export const deleteSubCategories = createAction(
  '[SubCategory/API] Delete SubCategories',
  props<{ ids: string[] }>()
);

export const clearSubCategories = createAction(
  '[SubCategory/API] Clear SubCategories'
);

export const failure = createAction(
  '[SubCategory/API] Failure',
  props<{ error: any }>()
)
