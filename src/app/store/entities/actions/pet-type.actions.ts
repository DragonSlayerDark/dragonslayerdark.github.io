import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { PetType } from '../models/pet-type.model';
import { EntityStrapi } from '../strapi_payload_entity';

export const loadPetTypes = createAction(
  '[PetType/API] Load PetTypes', 
);

export const loadPetTypesSuccess = createAction(
  '[PetType/API] Load PetTypes Success', 
  props<{ petTypes: EntityStrapi<PetType>[] }>()
);

export const addPetType = createAction(
  '[PetType/API] Add PetType',
  props<{ petType: EntityStrapi<PetType> }>()
);

export const upsertPetType = createAction(
  '[PetType/API] Upsert PetType',
  props<{ petType: EntityStrapi<PetType> }>()
);

export const addPetTypes = createAction(
  '[PetType/API] Add PetTypes',
  props<{ petTypes: EntityStrapi<PetType>[] }>()
);

export const upsertPetTypes = createAction(
  '[PetType/API] Upsert PetTypes',
  props<{ petTypes: EntityStrapi<PetType>[] }>()
);

export const updatePetType = createAction(
  '[PetType/API] Update PetType',
  props<{ petType: Update<EntityStrapi<PetType>> }>()
);

export const updatePetTypes = createAction(
  '[PetType/API] Update PetTypes',
  props<{ petTypes: Update<EntityStrapi<PetType>>[] }>()
);

export const deletePetType = createAction(
  '[PetType/API] Delete PetType',
  props<{ id: string }>()
);

export const deletePetTypes = createAction(
  '[PetType/API] Delete PetTypes',
  props<{ ids: string[] }>()
);

export const clearPetTypes = createAction(
  '[PetType/API] Clear PetTypes'
);

export const failure = createAction(
  '[PetType/API] Failure',
  props<{ error: any }>()
);