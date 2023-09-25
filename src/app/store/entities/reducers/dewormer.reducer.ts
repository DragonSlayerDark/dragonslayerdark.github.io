import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Dewormer } from '../models/dewormer.model';
import * as DewormerActions from '../actions/dewormer.actions';
import { EntityStrapi } from '../strapi_payload_entity';

export const dewormersFeatureKey = 'dewormers';

export interface State extends EntityState<EntityStrapi<Dewormer>> {
  // additional entities state properties
}

export const adapter: EntityAdapter<EntityStrapi<Dewormer>> = createEntityAdapter<EntityStrapi<Dewormer>>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(DewormerActions.addDewormerSuccess,
    (state, action) => adapter.addOne(action.dewormer, state)
  ),
  on(DewormerActions.upsertDewormerSuccess,
    (state, action) => adapter.upsertOne(action.dewormer, state)
  ),
  on(DewormerActions.addDewormers,
    (state, action) => adapter.addMany(action.dewormers, state)
  ),
  on(DewormerActions.upsertDewormers,
    (state, action) => adapter.upsertMany(action.dewormers, state)
  ),
  on(DewormerActions.updateDewormer,
    (state, action) => adapter.updateOne(action.dewormer, state)
  ),
  on(DewormerActions.updateDewormers,
    (state, action) => adapter.updateMany(action.dewormers, state)
  ),
  on(DewormerActions.deleteDewormer,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(DewormerActions.deleteDewormers,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(DewormerActions.loadDewormers,
    (state, action) => adapter.setAll(action.dewormers, state)
  ),
  on(DewormerActions.clearDewormers,
    state => adapter.removeAll(state)
  ),
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
