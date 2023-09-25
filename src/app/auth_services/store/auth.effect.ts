import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as authActions from '../store/auth.actions';
import { User } from '../model/user.model';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { AuthJSStrapi } from '../auth';
import { SharedService } from 'src/app/modules/shared/shared.service';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.login),
      switchMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map((data: { jwt: string, user: User }) => authActions.loginSuccess({ jwt: data.jwt })),
          catchError(error => of(authActions.loginFailure({ error }))))
      ),
    )
  });

  /**
   * Cuando hace login con otro provider, hace falta ejecutar getMe() porque solamente trae token
   */
  loginSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.loginSuccess),
      tap(({ jwt }) => {
        localStorage.setItem('token', jwt);
        this.store.dispatch(authActions.getMe());
      }),
    );
  }, {
    dispatch: false
  });

  actualizarUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.actualizarUser),
      switchMap(({ usuario }) =>
        this.authService.actualizarUser(usuario).pipe(
          map((usuario: User) => {
            localStorage.setItem('usuario', JSON.stringify(usuario));
            return authActions.actualizarUserSuccess({ usuario });
          }),
          catchError(error => of(authActions.actualizarUserFailure({ error }))))
      ),tap(() => {
        let route = (this.router.url)
        console.log(route);
        if (route === '/profile/editPassword'){
          this.shared.sendAlert('success', 'Contraseña actualizada', 'Contraseña actualizada con éxito');
          this.router.navigate(['/profile']);

        } else if (route === '/profile/editUser') {
          this.shared.sendAlert('success', 'Usuario actualizado', 'Informacion de usuario actualizada con éxito');
          this.router.navigate(['/home']);
        }
      })
    );
  });

  registrar$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.registrar),
      switchMap((formData) =>
        this.authService.registrar(formData).pipe(
          map((data: { jwt: string, user: User }) => {
            localStorage.setItem('token', data.jwt);
            localStorage.setItem('usuario', JSON.stringify(data.user));
            this.router.navigate(AuthJSStrapi.config.homeRoute);
            this.store.dispatch(authActions.getMe());
            return authActions.registrarSuccess({ usuario: data.user, jwt: data.jwt })
          }),
          catchError(error => of(authActions.registrarFailure({ error }))))
      ),
    );
  });



  getMe$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.getMe),
      switchMap(() =>
        this.authService.getMe().pipe(
          map((usuario: User) => {
            localStorage.setItem('usuario', JSON.stringify(usuario));
            if (this.router.url.includes('login') || this.router.url.includes('register')) {
              this.router.navigate(AuthJSStrapi.config.homeRoute);
            }
            return authActions.getMeSuccess({ usuario })
          }),
          catchError(error => {
            setTimeout(() => {
              this.router.navigate(AuthJSStrapi.config.loginRoute);
            }, 100);
            this.store.dispatch(authActions.cerrarSesion());
            return of(authActions.getMeFailure({ error }));
          }))
      ),
    );
  });

  cerrarSesion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.cerrarSesion),
      tap(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        localStorage.removeItem('error');
        this.router.navigate(AuthJSStrapi.config.loginRoute);
      })
    );
  }, { dispatch: false });

  getRecoveryToken$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(authActions.getRecoveryToken),
			switchMap(({ email }) =>
				this.authService.getRecoveryToken(email).pipe(
					map((data: any) => authActions.getRecoveryTokenSuccess({ payload: data })),
					catchError(error => of(authActions.getRecoveryTokenFailure({ error: error }))
					))
			),
		);
	});

	passwordRecovery$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(authActions.passwordRecovery),
			switchMap(({ code, password, passwordConfirmation }) =>
				this.authService.passwordRecovery(code, password, passwordConfirmation).pipe(
					map((data: any) => authActions.passwordRecoverySuccess({ payload: data })),
					catchError(error => of(authActions.passwordRecoveryFailure({ error: error }))
					))
			),
		);
	});

  deleteAccount$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.deleteAccount),
      switchMap(() =>
        this.authService.deleteAccount().pipe(
          switchMap(x => {
            return [
              authActions.deleteAccountSuccess({ usuario: x }),
            ]
          }), tap(()=>{
            this.authService.logout();
            this.shared.sendAlert('success', 'Cuenta Eliminada', 'Su cuenta ha sido Eliminada');
          })
        )
      ),
    );
  });

  backUpAccount$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.backUpAccount),
      switchMap(({ usuario }) =>
        this.authService.deletedAccountBackUp(usuario).pipe(
          map(x => authActions.deleteAccountSuccess({ usuario: x })),
        )
      ),
    );
  });

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private store: Store<any>,
    private shared: SharedService
  ) { }
}
