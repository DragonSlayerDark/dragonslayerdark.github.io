import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Product } from '../models/product.model';
import * as ProductActions from '../actions/product.actions';
import { EntityStrapi } from '../strapi_payload_entity';

export const productsFeatureKey = 'products';

export interface State extends EntityState<EntityStrapi<Product>> {
  // additional entities state properties
}

export const adapter: EntityAdapter<EntityStrapi<Product>> = createEntityAdapter<EntityStrapi<Product>>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(ProductActions.addProduct,
    (state, action) => adapter.addOne(action.product, state)
  ),
  on(ProductActions.upsertProduct,
    (state, action) => adapter.upsertOne(action.product, state)
  ),
  on(ProductActions.addProducts,
    (state, action) => adapter.addMany(action.products, state)
  ),
  on(ProductActions.upsertProducts,
    (state, action) => adapter.upsertMany(action.products, state)
  ),
  on(ProductActions.updateProduct,
    (state, action) => adapter.updateOne(action.product, state)
  ),
  on(ProductActions.updateProducts,
    (state, action) => adapter.updateMany(action.products, state)
  ),
  on(ProductActions.deleteProduct,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(ProductActions.deleteProducts,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(ProductActions.loadProductsSuccess,
    (state, action) => adapter.setAll(action.products, state)
  ),
  on(ProductActions.loadProductsByIdSuccess,
    (state, action) => adapter.setAll(action.products, state)
  ),
  on(ProductActions.loadProductsByPetTypeIdSuccess,
    (state, action) => adapter.setAll(action.products, state)
  ),
  on(ProductActions.loadProductSuccess,
    (state, action) => adapter.setOne(action.product, state)
  ),
  on(ProductActions.loadVaccineProductsSuccess,
    (state, action) => adapter.setAll(action.products, state)
  ),

  on(ProductActions.clearProducts,
    state => adapter.removeAll(state)
  ),
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
