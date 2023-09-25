import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { catchError, map, of, switchMap, take, tap, withLatestFrom } from 'rxjs';
import { PAWLLocalStorage } from 'src/app/exports/enums';
import { SharedService } from 'src/app/modules/shared/shared.service';
import { AppState } from '../../app.state';
import { ProductService } from '../../entities/services/product.service';
import * as fromCart from '../actions/cart.actions';
import { socketEmit } from '../actions/socket.actions';
import { cartFeatureKey } from '../reducers/cart.reducer';
import { CartService } from '../services/cart.service';

@Injectable({
    providedIn: 'root'
})
export class CartEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private productService: ProductService,
        private cartService: CartService,
        private router: Router,
        private shared: SharedService
    ) { }

    saveCart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromCart.saveCart),
            withLatestFrom(this.store.pipe(select(cartFeatureKey))),
            tap(([x, { products }]) => {
                localStorage.setItem(PAWLLocalStorage.CART, JSON.stringify(products));
            })
        ),
        { dispatch: false }
    );

    clearCart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromCart.clearCart),
            tap(() => {
                localStorage.removeItem(PAWLLocalStorage.CART);
            })
        ),
        { dispatch: false }
    );

    loadSavedCart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromCart.loadSavedCart),
            switchMap(() => {
                // Todo: Load cart from backend
                let actions = [];
                localStorage.getItem(PAWLLocalStorage.CART) && actions.push(
                    fromCart.loadSavedSuccess({
                        cart: JSON.parse(localStorage.getItem(PAWLLocalStorage.CART))
                    })
                );
                return actions;
            })
        )
    );

    modifyCart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromCart.modifyCart),
            // Select cart from store with lastestValue pipe
            withLatestFrom(this.store.pipe(select(cartFeatureKey))),
            switchMap(([payload, state]) => {
                let actions: Action[] = [];
                // if quantity is 0, remove product from cart
                if (state.products.find(x => x.product.id === payload.itemID).quantity === 0) {
                    actions.push(fromCart.removeProductFromCart({ productID: payload.itemID }));
                }

                actions.push(fromCart.saveCart());
                return actions;
            })
        )
    );

    addProductToCart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromCart.addProductToCart),
            switchMap((action) => {
                return of(fromCart.saveCart());
            }), tap(() =>{
              this.shared.sendAlert('success', 'Agregado', 'Su Producto ha sido agregado al carrito');
            })
        )
    );

  addProductsToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCart.addProductsToCart),
      switchMap((action) => {
        return of(fromCart.saveCart());
      }), tap(() => {
        this.shared.sendAlert('success', 'Agregado', 'Su Producto ha sido agregado al carrito');
      })
    )
  );

    removeProductFromCart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromCart.removeProductFromCart),
            switchMap((action) => {
                return of(fromCart.saveCart());
            })
        )
    );

    createPayment$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromCart.createPayment),
            switchMap(({ token, orderID, amount }) => {
                return this.cartService.createPayment(token, orderID, amount).pipe(
                    switchMap((x) => {
                        console.log(x);
                        if (x.error) {
                            this.shared.sendAlert('warning', 'Error', ' Error al procesar el pago, intente con otra tarjeta');
                            return of(fromCart.errorPayment(x));
                        }
                        if (!!x.data.returnUrl) { // If payment needs a 3ds confirmation
                            window.location.href = x.data.returnUrl;
                            return [];
                        } else {
                            return of(fromCart.updatePaymentResponse({ paymentResponse: x.data, orderID }));
                        }
                    }),
                    catchError((error) => {
                        return of(fromCart.error({ error }));
                    })
                );
            })
        )
    );

    // confirmPayment$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(fromCart.confirmPayment),
    //         switchMap((action) => {
    //             return of(fromCart.updatePaymentResponse({ paymentResponse: action.token, orderID:  }));
    //         })
    //     )
    // );

    createOrder$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromCart.createOrder),
            switchMap(({ addressID }) => {
                return this.cartService.createOrder(addressID).pipe(
                    switchMap((x) => {
                        return [
                            fromCart.clearCart(),
                            fromCart.createOrderSuccess({ response: x }),
                        ];
                    }),
                    catchError((error) => {
                        return of(fromCart.error({ error }));
                    })
                )
            })
        )
    );

    updatePaymentResponse$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(fromCart.updatePaymentResponse),
            switchMap(({ orderID, paymentResponse }) =>
                this.cartService.updatePaymentResponse(orderID, paymentResponse).pipe(
                    map(data => fromCart.updatePaymentResponseSuccess({ order: data as any })),
                    catchError(error => of(fromCart.updatePaymentResponseFailure({ error }))))
            ),
        );
    });

    updatePaymentResponseSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromCart.updatePaymentResponseSuccess),
            switchMap((action) => {
                this.router.navigate(['/shop', 'orders']);
                return [
                    socketEmit({ payload: action.order, room: 'orders' }),
                    fromCart.clearCart()
                ]
            })
        )
    );

    getNetpayClient$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(fromCart.getNetpayClient),
            switchMap(() =>
                this.cartService.getNetpayClient().pipe(
                    map(data => fromCart.getNetpayClientSuccess({ userPayload: data })),
                    catchError(error => of(fromCart.error({ error })))) // TODO: Cambiarlo, no se va a encontrar un cliente, no tirar un error, simplemente no hacer nada
            ),
        );
    });

    error$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromCart.error),
            tap((x) => {
                console.error(x);
            })
        ), { dispatch: false }
    );

}
