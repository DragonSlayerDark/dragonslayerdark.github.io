import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { PanelService } from '../services/panel.service';
import { EntityStrapi } from '../strapi_payload_entity';
import { Order } from '../models/order.model';
import * as usersActions from '../actions/user.actions';
import * as orderActions from '../actions/order.actions';

@Injectable({
  providedIn: 'root',
})
export class PanelEffects {
  constructor(private panelService: PanelService, private actions$: Actions) { }

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(usersActions.loadUsers),
      switchMap(() =>
        this.panelService.getUsers().pipe(
          map((data) => usersActions.loadUsersSuccess({ users: data })),
          catchError((error) => of(usersActions.failure({ error })))
        )
      )
    );
  });

  loadOrders$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(orderActions.loadOrders),
      switchMap(({ userID, pending }) =>
        this.panelService.getOrders(userID, pending).pipe(
          map((x) =>
            orderActions.loadOrdersSuccess({
              orders: x.data as EntityStrapi<Order>[],
            })
          ),
          catchError((error) => of(orderActions.failure({ error })))
        )
      )
    );
  });
}
