import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Order } from '../models/order.model';
import { EntityStrapi } from '../strapi_payload_entity';

export const loadOrders = createAction(
  '[Order/API] Load Orders',
  props<{ userID?: number, pending?: boolean }>()
);

export const loadOrdersSuccess = createAction(
  '[Order/API] Load Orders Success',
  props<{ orders: EntityStrapi<Order>[] }>()
);

export const addOrder = createAction(
  '[Order/API] Add Order',
  props<{ order: EntityStrapi<Order> }>()
);

export const upsertOrder = createAction(
  '[Order/API] Upsert Order',
  props<{ order: EntityStrapi<Order> }>()
);

export const addOrders = createAction(
  '[Order/API] Add Orders',
  props<{ orders: EntityStrapi<Order>[] }>()
);

export const upsertOrders = createAction(
  '[Order/API] Upsert Orders',
  props<{ orders: EntityStrapi<Order>[] }>()
);

export const updateOrder = createAction(
  '[Order/API] Update Order',
  props<{ order: Update<EntityStrapi<Order>> }>()
);

export const updateOrders = createAction(
  '[Order/API] Update Orders',
  props<{ orders: Update<EntityStrapi<Order>>[] }>()
);

export const deleteOrder = createAction(
  '[Order/API] Delete Order',
  props<{ id: string }>()
);

export const deleteOrders = createAction(
  '[Order/API] Delete Orders',
  props<{ ids: string[] }>()
);

export const clearOrders = createAction('[Order/API] Clear Orders');

export const failure = createAction(
  '[Order/API] Failure',
  props<{ error: any }>()
);
