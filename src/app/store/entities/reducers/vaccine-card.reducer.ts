import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { VaccineCard } from '../models/vaccine-card.model';
import * as VaccineCardActions from '../actions/vaccine-card.actions';
import { EntityStrapi } from '../strapi_payload_entity';

export const vaccineCardsFeatureKey = 'vaccineCards';

export interface State extends EntityState<EntityStrapi<VaccineCard>> {
  // additional entities state properties
}

export const adapter: EntityAdapter<EntityStrapi<VaccineCard>> = createEntityAdapter<EntityStrapi<VaccineCard>>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(VaccineCardActions.addVaccineCardSuccess,
    (state, action) => adapter.addOne(action.vaccineCard, state)
  ),
  on(VaccineCardActions.upsertVaccineCardSuccess,
    (state, action) => adapter.upsertOne(action.vaccineCard, state)
  ),
  on(VaccineCardActions.addVaccineCards,
    (state, action) => adapter.addMany(action.vaccineCards, state)
  ),
  on(VaccineCardActions.upsertVaccineCards,
    (state, action) => adapter.upsertMany(action.vaccineCards, state)
  ),
  on(VaccineCardActions.updateVaccineCard,
    (state, action) => adapter.updateOne(action.vaccineCard, state)
  ),
  on(VaccineCardActions.updateVaccineCards,
    (state, action) => adapter.updateMany(action.vaccineCards, state)
  ),
  on(VaccineCardActions.deleteVaccineCard,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(VaccineCardActions.deleteVaccineCards,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  // on(VaccineCardActions.loadVaccineCardsSuccess,
  //   (state, action) => adapter.setAll(action.vaccineCards, state)
  // ),
  on(VaccineCardActions.clearVaccineCards,
    state => adapter.removeAll(state)
  ),
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
