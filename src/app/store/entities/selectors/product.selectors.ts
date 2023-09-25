import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectAll, State } from '../reducers/product.reducer';

export const selectProductsState = createFeatureSelector<State>('products');

export const selectAllProducts = createSelector(
    selectProductsState,
    selectAll
);

export const selectProductById = (id: number | string ) => createSelector(
    selectProductsState,
    (state: State) => state.entities[id]
)
