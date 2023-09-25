import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Category } from '../models/category.model';
import * as CategoryActions from '../actions/category.actions';
import { EntityStrapi } from '../strapi_payload_entity';

export const categoriesFeatureKey = 'categories';

export interface State extends EntityState<EntityStrapi<Category>> {
  // additional entities state properties
}

export const adapter: EntityAdapter<EntityStrapi<Category>> = 
createEntityAdapter<EntityStrapi<Category>>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(CategoryActions.addCategory,
    (state, action) => adapter.addOne(action.category, state)
  ),
  on(CategoryActions.upsertCategory,
    (state, action) => adapter.upsertOne(action.category, state)
  ),
  on(CategoryActions.addcategories,
    (state, action) => adapter.addMany(action.categories, state)
  ),
  on(CategoryActions.upsertcategories,
    (state, action) => adapter.upsertMany(action.categories, state)
  ),
  on(CategoryActions.updateCategory,
    (state, action) => adapter.updateOne(action.category, state)
  ),
  on(CategoryActions.updatecategories,
    (state, action) => adapter.updateMany(action.categories, state)
  ),
  on(CategoryActions.deleteCategory,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(CategoryActions.deletecategories,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(CategoryActions.loadcategoriesSuccess,
    (state, action) => adapter.setAll(action.categories, state)
  ),
  on(CategoryActions.clearcategories,
    state => adapter.removeAll(state)
  ),
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
