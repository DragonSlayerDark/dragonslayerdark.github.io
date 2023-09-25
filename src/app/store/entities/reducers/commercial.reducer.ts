import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Commercial } from '../models/commercial.model';
import * as CommercialActions from '../actions/commercial.actions';
import { EntityStrapi } from '../strapi_payload_entity';

export const commercialsFeatureKey = 'commercials';

export interface State extends EntityState<EntityStrapi<Commercial>> {
  // additional entities state properties
}

export const adapter: EntityAdapter<EntityStrapi<Commercial>> = createEntityAdapter<EntityStrapi<Commercial>>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(CommercialActions.addCommercial,
    (state, action) => adapter.addOne(action.commercial, state)
  ),
  on(CommercialActions.upsertCommercial,
    (state, action) => adapter.upsertOne(action.commercial, state)
  ),
  on(CommercialActions.addCommercials,
    (state, action) => adapter.addMany(action.commercials, state)
  ),
  on(CommercialActions.upsertCommercials,
    (state, action) => adapter.upsertMany(action.commercials, state)
  ),
  on(CommercialActions.updateCommercial,
    (state, action) => adapter.updateOne(action.commercial, state)
  ),
  on(CommercialActions.updateCommercials,
    (state, action) => adapter.updateMany(action.commercials, state)
  ),
  on(CommercialActions.deleteCommercial,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(CommercialActions.deleteCommercials,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(CommercialActions.loadCommercialsSuccess,
    (state, action) => adapter.setAll(action.commercials, state)
  ),
  on(CommercialActions.clearCommercials,
    state => adapter.removeAll(state)
  ),
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
