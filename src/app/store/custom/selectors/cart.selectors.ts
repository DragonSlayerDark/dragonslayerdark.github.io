import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromCart from "../reducers/cart.reducer";

export const getCartState = createFeatureSelector<fromCart.State>(fromCart.cartFeatureKey);

export const getCartLength = createSelector(
    getCartState,
    (state) => state.products.length ? state.products.reduce((total, x) => total + x.quantity, 0) : ''
)

export const getCart = createSelector(
    getCartState,
    (state) => state.products
);

export const getCards = createSelector(
    getCartState,
    (state) => state.user?.paymentSources
);