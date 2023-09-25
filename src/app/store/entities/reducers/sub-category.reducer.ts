import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { SubCategory } from '../models/sub-category.model';
import * as SubCategoryActions from '../actions/sub-category.actions';
import { EntityStrapi } from '../strapi_payload_entity';

export const subCategoriesFeatureKey = 'subCategories';

export interface State extends EntityState<EntityStrapi<SubCategory>> {
  // additional entities state properties
}

export const adapter: EntityAdapter<EntityStrapi<SubCategory>> = createEntityAdapter<EntityStrapi<SubCategory>>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(SubCategoryActions.addSubCategory,
    (state, action) => adapter.addOne(action.subCategory, state)
  ),
  on(SubCategoryActions.upsertSubCategory,
    (state, action) => adapter.upsertOne(action.subCategory, state)
  ),
  on(SubCategoryActions.addSubCategories,
    (state, action) => adapter.addMany(action.subCategories, state)
  ),
  on(SubCategoryActions.upsertSubCategories,
    (state, action) => adapter.upsertMany(action.subCategories, state)
  ),
  on(SubCategoryActions.updateSubCategory,
    (state, action) => adapter.updateOne(action.subCategory, state)
  ),
  on(SubCategoryActions.updateSubCategories,
    (state, action) => adapter.updateMany(action.subCategories, state)
  ),
  on(SubCategoryActions.deleteSubCategory,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(SubCategoryActions.deleteSubCategories,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(SubCategoryActions.loadSubCategoriesSuccess,
    (state, action) => adapter.setAll(action.subCategories, state)
  ),
  on(SubCategoryActions.clearSubCategories,
    state => adapter.removeAll(state)
  ),
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
