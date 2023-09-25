import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Dewormer } from '../models/dewormer.model';
import { EntityStrapi } from '../strapi_payload_entity';
import { Pet } from '../models/pet.model';

export const loadDewormers = createAction(
  '[Dewormer/API] Load Dewormers',
  props<{ dewormers: EntityStrapi<Dewormer>[] }>()
);

export const addDewormer = createAction(
  '[Dewormer/API] Add Dewormer',
  props<{ petID:string | number }>()
);

export const addDewormerSuccess = createAction(
  '[Dewormer/API] Add Dewormer Success',
  props<{ dewormer: EntityStrapi<Dewormer> }>()
);

export const upsertDewormer = createAction(
  '[Dewormer/API] Upsert Dewormer',
  props<{ petID: string | number }>()
);

export const upsertDewormerSuccess = createAction(
  '[Dewormer/API] Upsert Dewormer Success',
  props<{ dewormer: EntityStrapi<Dewormer> }>()
);

export const addDewormers = createAction(
  '[Dewormer/API] Add Dewormers',
  props<{ dewormers: EntityStrapi<Dewormer>[] }>()
);

export const upsertDewormers = createAction(
  '[Dewormer/API] Upsert Dewormers',
  props<{ dewormers: EntityStrapi<Dewormer>[] }>()
);

export const updateDewormer = createAction(
  '[Dewormer/API] Update Dewormer',
  props<{ dewormer: Update<EntityStrapi<Dewormer>> }>()
);

export const updateDewormers = createAction(
  '[Dewormer/API] Update Dewormers',
  props<{ dewormers: Update<EntityStrapi<Dewormer>>[] }>()
);

export const deleteDewormer = createAction(
  '[Dewormer/API] Delete Dewormer',
  props<{ id: string }>()
);

export const deleteDewormers = createAction(
  '[Dewormer/API] Delete Dewormers',
  props<{ ids: string[] }>()
);

export const clearDewormers = createAction(
  '[Dewormer/API] Clear Dewormers'
);

export const updateDewormersApplied = createAction(
  '[VaccineCard/API] Update Dewormers Applied',
  props<{ id: string | number, vaccineID: string | number, remove: boolean, productId: string | number, cedula: string | number, date: string, vaccine_card_id: string | number }>()
);

export const updateAppliedDewormersSuccess = createAction(
  '[VaccineCard/API] Update Dewormers Applied Success',
  props<{ pet: Pet }>()
);

export const failure = createAction(
  '[VaccineCard/API] Failure',
  props<{ error: any }>()
);
