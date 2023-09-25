import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Memorial } from '../models/memorial.model';
import * as MemorialActions from '../actions/memorial.actions';
import { EntityStrapi } from '../strapi_payload_entity';

export const memorialsFeatureKey = 'memorials';

export interface State extends EntityState<EntityStrapi<Memorial>> {
  // additional entities state properties
}

export const adapter: EntityAdapter<EntityStrapi<Memorial>> = createEntityAdapter<EntityStrapi<Memorial>>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(MemorialActions.addMemorial,
    (state, action) => adapter.addOne(action.memorial, state)
  ),
  on(MemorialActions.upsertMemorial,
    (state, action) => adapter.upsertOne(action.memorial, state)
  ),
  on(MemorialActions.addMemorials,
    (state, action) => adapter.addMany(action.memorials, state)
  ),
  on(MemorialActions.upsertMemorials,
    (state, action) => adapter.upsertMany(action.memorials, state)
  ),
  on(MemorialActions.updateMemorial,
    (state, action) => adapter.updateOne(action.memorial, state)
  ),
  on(MemorialActions.updateMemorials,
    (state, action) => adapter.updateMany(action.memorials, state)
  ),
  on(MemorialActions.deleteMemorial,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(MemorialActions.deleteMemorials,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(MemorialActions.loadMemorialsSuccess,
    (state, action) => adapter.setAll(action.memorials, state)
  ),
  on(MemorialActions.clearMemorials,
    state => adapter.removeAll(state)
  ),
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
