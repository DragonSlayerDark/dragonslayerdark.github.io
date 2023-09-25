import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { VaccineCard } from '../models/vaccine-card.model';
import { EntityStrapi } from '../strapi_payload_entity';
import { Pet } from '../models/pet.model';

// export const loadVaccineCards = createAction(
//   '[VaccineCard/API] Load VaccineCards',
//   props<{ petID: string | number }>()
// );

// export const loadVaccineCardsSuccess = createAction(
//   '[VaccineCard/API] Load VaccineCards Success',
//   props<{ vaccineCards: EntityStrapi<VaccineCard>[] }>()
// );

export const addVaccineCard = createAction(
  '[VaccineCard/API] Add VaccineCard',
  props<{ petID: string | number }>()
);

export const addVaccineCardSuccess = createAction(
  '[VaccineCard/API] Add VaccineCard Success',
  props<{ vaccineCard: EntityStrapi<VaccineCard> }>()
);

export const upsertVaccineCard = createAction(
  '[VaccineCard/API] Upsert VaccineCard',
  props<{ petID: string | number }>()
);

export const upsertVaccineCardSuccess = createAction(
  '[VaccineCard/API] Upsert VaccineCard Success',
  props<{ vaccineCard: EntityStrapi<VaccineCard> }>()
);

export const addVaccineCards = createAction(
  '[VaccineCard/API] Add VaccineCards',
  props<{ vaccineCards: EntityStrapi<VaccineCard>[] }>()
);

export const upsertVaccineCards = createAction(
  '[VaccineCard/API] Upsert VaccineCards',
  props<{ vaccineCards: EntityStrapi<VaccineCard>[] }>()
);

export const updateVaccineCard = createAction(
  '[VaccineCard/API] Update VaccineCard',
  props<{ vaccineCard: Update<EntityStrapi<VaccineCard>> }>()
);

export const updateVaccineCards = createAction(
  '[VaccineCard/API] Update VaccineCards',
  props<{ vaccineCards: Update<EntityStrapi<VaccineCard>>[] }>()
);

export const deleteVaccineCard = createAction(
  '[VaccineCard/API] Delete VaccineCard',
  props<{ id: string }>()
);

export const deleteVaccineCards = createAction(
  '[VaccineCard/API] Delete VaccineCards',
  props<{ ids: string[] }>()
);

export const clearVaccineCards = createAction(
  '[VaccineCard/API] Clear VaccineCards'
);

export const updateVaccinesApplied = createAction(
  '[VaccineCard/API] Update Vaccines Applied',
  props<{ id: string | number, vaccineID: string | number, remove: boolean, productId: string | number, cedula: string | number, date: string, vaccine_card_id: string | number }>()
);

export const updateAppliedVaccinesSuccess = createAction(
  '[VaccineCard/API] Update Vaccines Applied Success',
  props<{ pet: Pet }>()
);

export const failure = createAction(
  '[VaccineCard/API] Failure',
  props<{ error: any }>()
);
