import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, ordersFeatureKey, selectAll } from '../reducers/order.reducer';

export const selectOrdersState = createFeatureSelector<State>(ordersFeatureKey);

export const selectAllOrders = createSelector(selectOrdersState, selectAll);

export const selectOrderById = (id: number) => createSelector(selectAllOrders, (allOrders) => {
    if (allOrders) {
        return allOrders.find(p => p.id == id);
    }
    return null;
});
