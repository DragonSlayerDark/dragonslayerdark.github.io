import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { PetBreed } from '../models/pet-breed.model';
import { EntityStrapi } from '../strapi_payload_entity';


export const loadPetBreeds = createAction(
  '[PetBreed/API] Load PetBreeds',
  props<{ pet_type_id: string | number}>()
);

export const loadPetBreedsSuccess = createAction(
  '[PetBreed/API] Load PetBreeds Success',
  props<{ petBreeds: EntityStrapi<PetBreed>[] }>()
);

export const addPetBreed = createAction(
  '[PetBreed/API] Add PetBreed',
  props<{ petBreed: EntityStrapi<PetBreed> }>()
);

export const upsertPetBreed = createAction(
  '[PetBreed/API] Upsert PetBreed',
  props<{ petBreed: EntityStrapi<PetBreed> }>()
);

export const addPetBreeds = createAction(
  '[PetBreed/API] Add PetBreeds',
  props<{ petBreeds: EntityStrapi<PetBreed>[] }>()
);

export const upsertPetBreeds = createAction(
  '[PetBreed/API] Upsert PetBreeds',
  props<{ petBreeds: EntityStrapi<PetBreed>[] }>()
);

export const updatePetBreed = createAction(
  '[PetBreed/API] Update PetBreed',
  props<{ petBreed: Update<EntityStrapi<PetBreed>> }>()
);

export const updatePetBreeds = createAction(
  '[PetBreed/API] Update PetBreeds',
  props<{ petBreeds: Update<EntityStrapi<PetBreed>>[] }>()
);

export const deletePetBreed = createAction(
  '[PetBreed/API] Delete PetBreed',
  props<{ id: string }>()
);

export const deletePetBreeds = createAction(
  '[PetBreed/API] Delete PetBreeds',
  props<{ ids: string[] }>()
);

export const clearPetBreeds = createAction(
  '[PetBreed/API] Clear PetBreeds'
);
