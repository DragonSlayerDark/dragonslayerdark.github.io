import { createAction, props } from "@ngrx/store";
import { Order } from "../../entities/models/order.model";
import { Product } from "../../entities/models/product.model";
import { EntityStrapi, StrapiPayloadEntity } from "../../entities/strapi_payload_entity";
import { CartEntity } from "../models/cart.model";
import { UserNetpay, UserNetpayPayload } from "../models/user_netpay.model";

export const addProductToCart = createAction(
    '[Cart] Add Product To Cart',
    props<{ product: EntityStrapi<Product> }>()
);

export const addProductsToCart = createAction(
  '[Cart] Add Products To Cart',
  props<{ product: EntityStrapi<Product>, quantity: number }>()
);

export const removeProductFromCart = createAction(
    '[Cart] Remove Product To Cart',
    props<{ productID: number }>()
);

export const saveCart = createAction(
    '[Cart] Save Cart'
);

export const loadSavedCart = createAction(
    '[Cart] Load Saved Cart'
);

export const clearCart = createAction(
    '[Cart] Clear Cart'
);

export const loadSavedSuccess = createAction(
    '[Cart] Load Saved Cart Success',
    props<{
        cart: CartEntity[]
    }>()
);

export const createOrder = createAction(
    '[Cart] Create Order',
    props<{ addressID: string | number }>()
);

export const createNetpayClient = createAction(
    '[Cart] Create Netpay Client',
    props<{
        firstName: string;
        lastName: string;
        phone: string;
        email: string;
        paymentSource: {
            source: string;
        };
    }>()
);

export const createNetpayClientSuccess = createAction(
    '[Cart] Create Netpay Client Success',
    props<{ user: UserNetpay }>()
);

export const getNetpayClient = createAction(
    '[Cart] Get Netpay Client',
);

export const getNetpayClientSuccess = createAction(
    '[Cart] Get Netpay Client Success',
    props<{ userPayload: UserNetpay }>()
);

export const createOrderSuccess = createAction(
    '[Cart] Create Order Success',
    props<{
        response: any
    }>()
);

export const updatePaymentResponse = createAction(
    '[Cart] Update Payment Response',
    props<{ orderID: string, paymentResponse: any }>()
);

export const updatePaymentResponseSuccess = createAction(
    '[Cart] Update Payment Response Success',
    props<{ order: StrapiPayloadEntity<Order> }>()
);

export const updatePaymentResponseFailure = createAction(
    '[Cart] Update Payment Response Failure',
    props<{ error: any }>()
);


export const createPayment = createAction(
    '[Cart] Create Payment',
    props<{
        token: string;
        orderID: string;
        amount: number;
    }>()
);

export const confirmPayment = createAction(
    '[Cart] Confirm Payment',
    props<{
        token: string;
    }>()
);

export const modifyCart = createAction(
    '[Cart] Modify Cart',
    props<{
        itemID: number;
        add: boolean;
    }>()
);

export const errorPayment = createAction(
    '[Cart] Error Payment',
    props<{
        error: boolean,
        data: any
    }>()
);

export const error = createAction(
    '[Cart] Error Cart',
    props<{
        error: any
    }>()
);

export const errorOrder = createAction(
    '[Cart] Error Order',
    props<{
        error: boolean;
        data: any;
    }>()
);
