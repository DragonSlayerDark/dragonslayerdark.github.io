import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Commercial } from '../models/commercial.model';
import { EntityStrapi } from '../strapi_payload_entity';

export const loadCommercials = createAction(
  '[Commercial/API] Load Commercials',
);

export const loadCommercialsSuccess = createAction(
  '[Commercial/API] Load Commercials Success',
  props<{ commercials: EntityStrapi<Commercial>[] }>()
);

export const addCommercial = createAction(
  '[Commercial/API] Add Commercial',
  props<{ commercial: EntityStrapi<Commercial> }>()
);

export const upsertCommercial = createAction(
  '[Commercial/API] Upsert Commercial',
  props<{ commercial: EntityStrapi<Commercial> }>()
);

export const addCommercials = createAction(
  '[Commercial/API] Add Commercials',
  props<{ commercials: EntityStrapi<Commercial>[] }>()
);

export const upsertCommercials = createAction(
  '[Commercial/API] Upsert Commercials',
  props<{ commercials: EntityStrapi<Commercial>[] }>()
);

export const updateCommercial = createAction(
  '[Commercial/API] Update Commercial',
  props<{ commercial: Update<EntityStrapi<Commercial>> }>()
);

export const updateCommercials = createAction(
  '[Commercial/API] Update Commercials',
  props<{ commercials: Update<EntityStrapi<Commercial>>[] }>()
);

export const deleteCommercial = createAction(
  '[Commercial/API] Delete Commercial',
  props<{ id: string }>()
);

export const deleteCommercials = createAction(
  '[Commercial/API] Delete Commercials',
  props<{ ids: string[] }>()
);

export const clearCommercials = createAction(
  '[Commercial/API] Clear Commercials'
);
