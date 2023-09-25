import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Pet } from '../models/pet.model';
import * as PetActions from '../actions/pet.actions';
import { EntityStrapi } from '../strapi_payload_entity';

export const petsFeatureKey = 'pets';

export interface State extends EntityState<EntityStrapi<Pet>> {
  // additional entities state properties
}

export const adapter: EntityAdapter<EntityStrapi<Pet>> = createEntityAdapter<EntityStrapi<Pet>>();
//export const adapterPet: EntityAdapter<Pet> = createEntityAdapter<Pet>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(PetActions.upsertPet,
    (state, action) => adapter.upsertOne(action.pet, state)
  ),
  on(PetActions.addPets,
    (state, action) => adapter.addMany(action.pets, state)
  ),
  on(PetActions.upsertPets,
    (state, action) => adapter.upsertMany(action.pets, state)
  ),
  on(PetActions.updatePet,
    (state, action) => adapter.updateOne(action.pet, state)
  ),
  on(PetActions.updatePets,
    (state, action) => adapter.updateMany(action.pets, state)
  ),
  on(PetActions.deletePetSuccess,
    (state, action) => adapter.removeOne(action.pet.id, state)
  ),
  on(PetActions.deletePets,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(PetActions.loadPetsSuccess,
    (state, action) => adapter.setAll(action.pets, state)
  ),
  on(PetActions.clearPets,
    state => adapter.removeAll(state)
  ),
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
