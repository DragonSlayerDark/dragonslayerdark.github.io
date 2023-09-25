import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { PetType } from '../models/pet-type.model';
import { EntityStrapi } from '../strapi_payload_entity';
import * as PetTypeActions from '../actions/pet-type.actions';

export const petTypesFeatureKey = 'petTypes';

export interface State extends EntityState<EntityStrapi<PetType>> {
  // additional entities state properties
}

export const adapter: EntityAdapter<EntityStrapi<PetType>> = createEntityAdapter<EntityStrapi<PetType>>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(PetTypeActions.addPetType,
    (state, action) => adapter.addOne(action.petType, state)
  ),
  on(PetTypeActions.upsertPetType,
    (state, action) => adapter.upsertOne(action.petType, state)
  ),
  on(PetTypeActions.addPetTypes,
    (state, action) => adapter.addMany(action.petTypes, state)
  ),
  on(PetTypeActions.upsertPetTypes,
    (state, action) => adapter.upsertMany(action.petTypes, state)
  ),
  on(PetTypeActions.updatePetType,
    (state, action) => adapter.updateOne(action.petType, state)
  ),
  on(PetTypeActions.updatePetTypes,
    (state, action) => adapter.updateMany(action.petTypes, state)
  ),
  on(PetTypeActions.deletePetType,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(PetTypeActions.deletePetTypes,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(PetTypeActions.loadPetTypesSuccess,
    (state, action) => adapter.setAll(action.petTypes, state)
  ),
  on(PetTypeActions.clearPetTypes,
    state => adapter.removeAll(state)
  ),
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
