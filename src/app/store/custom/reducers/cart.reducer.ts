import { createReducer, on } from "@ngrx/store";
import { Product } from "../../entities/models/product.model";
import { EntityStrapi } from "../../entities/strapi_payload_entity";
import * as fromCart from "../actions/cart.actions";
import { CartEntity } from "../models/cart.model";
import { UserNetpay } from "../models/user_netpay.model";

export const cartFeatureKey = 'cart';

export interface State {
    products: CartEntity[];
    user: UserNetpay;
}
export const initialState: State = {
    products: [],
    user: null
}

export const reducer = createReducer(
    initialState,
    on(fromCart.addProductToCart, ((state, { product }) => ({
        ...state,
        // Find if product is already in cart, if it is, increase quantity, if not add it to cart
        products: state.products.find(p => p.product.id === product.id) ?
            state.products.map(p => p.product.id === product.id ? { product, quantity: p.quantity + 1 } : p) :
            [...state.products, { product, quantity: 1 }]
    }))),
  on(fromCart.addProductsToCart, ((state, { product, quantity }) => ({
    ...state,
    // Find if product is already in cart, if it is, increase quantity, if not add it to cart
    products: state.products.find(p => p.product.id === product.id) ?
      state.products.map(p => p.product.id === product.id ? { product, quantity: p.quantity + quantity } : p) :
      [...state.products, { product, quantity: quantity }]
  }))),
    on(fromCart.loadSavedSuccess, ((state, { cart }) => ({
        ...state,
        products: cart
    }))),
    on(fromCart.modifyCart, ((state, { itemID, add }) => ({
        ...state,
        products: state.products.map(p => p.product.id === itemID ? { product: p.product, quantity: add ? p.quantity + 1 : p.quantity - 1 } : p)
    }))),
    on(fromCart.removeProductFromCart, ((state, { productID }) => ({
        ...state,
        products: state.products.filter(p => p.product.id !== productID)
    }))),
    on(fromCart.clearCart, ((state) => ({
        ...state,
        products: []
    }))),
    on(fromCart.getNetpayClientSuccess, ((state, { userPayload }) => ({
        ...state,
        user: userPayload
    }))),
);
