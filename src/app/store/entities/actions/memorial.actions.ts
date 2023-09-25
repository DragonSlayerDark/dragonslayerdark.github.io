import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Memorial } from '../models/memorial.model';
import { EntityStrapi } from '../strapi_payload_entity';

export const loadMemorials = createAction(
  '[Memorial/API] Load Memorials',
);

export const loadMemorialsSuccess = createAction(
  '[Memorial/API] Load Memorials Success',
  props<{ memorials: EntityStrapi<Memorial>[] }>()
);

export const addMemorial = createAction(
  '[Memorial/API] Add Memorial',
  props<{ memorial: EntityStrapi<Memorial> }>()
);

export const upsertMemorial = createAction(
  '[Memorial/API] Upsert Memorial',
  props<{ memorial: EntityStrapi<Memorial> }>()
);

export const addMemorials = createAction(
  '[Memorial/API] Add Memorials',
  props<{ memorials: EntityStrapi<Memorial>[] }>()
);

export const upsertMemorials = createAction(
  '[Memorial/API] Upsert Memorials',
  props<{ memorials: EntityStrapi<Memorial>[] }>()
);

export const updateMemorial = createAction(
  '[Memorial/API] Update Memorial',
  props<{ memorial: Update<EntityStrapi<Memorial>> }>()
);

export const updateMemorials = createAction(
  '[Memorial/API] Update Memorials',
  props<{ memorials: Update<EntityStrapi<Memorial>>[] }>()
);

export const deleteMemorial = createAction(
  '[Memorial/API] Delete Memorial',
  props<{ id: string }>()
);

export const deleteMemorials = createAction(
  '[Memorial/API] Delete Memorials',
  props<{ ids: string[] }>()
);

export const clearMemorials = createAction(
  '[Memorial/API] Clear Memorials'
);
