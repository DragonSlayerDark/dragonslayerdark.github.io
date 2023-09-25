import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Pet } from '../models/pet.model';
import { EntityStrapi } from '../strapi_payload_entity';

export const loadPets = createAction(
  '[Pet/API] Load Pets',
  props<{userID: string | number}>()
);

export const loadPetsSuccess = createAction(
  '[Pet/API] Load Pets Success',
  props<{ pets: EntityStrapi<Pet>[] }>()
);

export const addPet = createAction(
  '[Pet/API] Add Pet',
  props<{ pet: any; img: File }>()
);

export const addPetSuccess = createAction(
  '[Pet/API] Add Pet Success',
  props<{ pet: EntityStrapi<Pet> }>()
);


export const upsertPet = createAction(
  '[Pet/API] Upsert Pet',
  props<{ pet: EntityStrapi<Pet> }>()
);

export const addPets = createAction(
  '[Pet/API] Add Pets',
  props<{ pets: EntityStrapi<Pet>[] }>()
);

export const upsertPets = createAction(
  '[Pet/API] Upsert Pets',
  props<{ pets: EntityStrapi<Pet>[] }>()
);

export const updatePet = createAction(
  '[Pet/API] Update Pet',
  props<{ pet: any ; img?: File }>()
);

export const updatePetSuccess = createAction(
  '[Pet/API] Update Pet Success',
  props<{ pet: EntityStrapi<Pet> }>()
);

export const updatePets = createAction(
  '[Pet/API] Update Pets',
  props<{ pets: Update<EntityStrapi<Pet>>[] }>()
);

export const deletePet = createAction(
  '[Pet/API] Delete Pet',
  props<{ id: string }>()
);

export const deletePetSuccess = createAction(
  '[Pet/API] Delete Pet Success',
  props<{ pet: EntityStrapi<Pet>}>()
)

export const deletePets = createAction(
  '[Pet/API] Delete Pets',
  props<{ ids: string[] }>()
);

export const clearPets = createAction(
  '[Pet/API] Clear Pets'
);
