import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { PetBreed } from '../models/pet-breed.model';
import * as PetBreedActions from '../actions/pet-breed.actions';
import { EntityStrapi } from '../strapi_payload_entity';

export const petBreedsFeatureKey = 'petBreeds';

export interface State extends EntityState<EntityStrapi<PetBreed>> {
  // additional entities state properties
}

export const adapter: EntityAdapter<EntityStrapi<PetBreed>> = createEntityAdapter<EntityStrapi<PetBreed>>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(PetBreedActions.addPetBreed,
    (state, action) => adapter.addOne(action.petBreed, state)
  ),
  on(PetBreedActions.upsertPetBreed,
    (state, action) => adapter.upsertOne(action.petBreed, state)
  ),
  on(PetBreedActions.addPetBreeds,
    (state, action) => adapter.addMany(action.petBreeds, state)
  ),
  on(PetBreedActions.upsertPetBreeds,
    (state, action) => adapter.upsertMany(action.petBreeds, state)
  ),
  on(PetBreedActions.updatePetBreed,
    (state, action) => adapter.updateOne(action.petBreed, state)
  ),
  on(PetBreedActions.updatePetBreeds,
    (state, action) => adapter.updateMany(action.petBreeds, state)
  ),
  on(PetBreedActions.deletePetBreed,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(PetBreedActions.deletePetBreeds,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(PetBreedActions.loadPetBreedsSuccess,
    (state, action) => adapter.setAll(action.petBreeds, state)
  ),
  on(PetBreedActions.clearPetBreeds,
    state => adapter.removeAll(state)
  ),
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
