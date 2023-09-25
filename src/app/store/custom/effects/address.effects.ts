import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { catchError, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { AuthService } from 'src/app/auth_services/store/auth.service';
import { SharedService } from 'src/app/modules/shared/shared.service';
import { AppState } from '../../app.state';
import * as addressActions from '../../entities/actions/address.actions';
import { selectAllAddress } from '../../entities/selectors/address.selectors';
import { AddressService } from '../services/address.service';

@Injectable({
  providedIn: 'root'
})
export class AddressEffects {

  loadAddresses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addressActions.loadAddresses),
      switchMap(({ userID }) =>
        this.addressService.getAddresses(userID).pipe(
          map(data => {
            return addressActions.loadAddressesSuccess({ addresses: data })
          }),
          catchError(error => of(addressActions.failure({ error }))))
      ),
    );
  });

  deleteAddress$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addressActions.deleteAddress),
      withLatestFrom(
        this.store.pipe(select(selectAllAddress))
      ),
      switchMap(([{ id }, address]) =>
        this.addressService.deleteAddress(id, address).pipe(
          map(data => addressActions.deleteAddressSuccess({ address: data })),
          catchError(error => of(addressActions.failure({ error }))))
      ),
      tap(() => {
        this.shared.sendAlert('success', 'Exito', 'Direccion eliminada con exito');
        this.router.navigate(['/profile', 'adresslist']);
      })
    );
  });

  addAddress$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addressActions.addAddress),
      withLatestFrom(
        this.store.pipe(select(selectAllAddress))
      ),
      switchMap(([{ city, country, state, street, zip, name }, addresses]) =>
        this.addressService.addAddress(city, country, state, street, zip, name, addresses).pipe(
          map(data => addressActions.addAddressSuccess({ address: data })),
          catchError(error => of(addressActions.failure({ error }))))
      ), tap (() => {
        this.shared.sendAlert('success', 'Dirección Agregada', 'Dirección agregada correctamente a lista de direcciones');
        let route = this.router.url
        if (route === '/profile/createAddress') {
          this.router.navigate(['profile', 'adresslist']);
        }
      })
    );
  });

  updateAddress$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addressActions.updateAddress),
      withLatestFrom(
        this.store.pipe(select(selectAllAddress))
      ),
      switchMap(([{id,  city, country, state, street, zip, name, }, address]) =>
        this.addressService.updateAddress( id,city, country, state, street, zip, name, address).pipe(
          map(data => addressActions.updateAddressSuccess({ address: data })),
          catchError(error => of(addressActions.failure({ error }))))
      ), tap (() => {
        this.shared.sendAlert('success', 'Exito', 'Direccion modificada con exito');
        this.router.navigate(['/profile','adresslist']);
      })
    );
  });



  constructor(
    private actions$: Actions,
    private addressService: AddressService,
    private store: Store<AppState>,
    private auth: AuthService,
    private shared: SharedService,
    private router: Router
  ) { }
}
