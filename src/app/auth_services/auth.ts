import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { Action, ActionReducer, Store } from "@ngrx/store";
import { AuthGuard } from "./guards/auth.guard";
import { NoUserGuard } from "./guards/no-user.guard";
import { TokenInterceptorService } from "./interceptor/token.interceptor";
import { AuthEffects } from "./store/auth.effect";
import { authreducer, AuthState } from "./store/auth.reducer";
import { AuthService } from "./store/auth.service";

export class AuthJSStrapi {
  static AuthReducer: ActionReducer<AuthState, Action> = authreducer;
  static AuthEffect: typeof AuthEffects = AuthEffects;
  static AuthService: typeof AuthService = AuthService;
  static Interceptor: any = { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true };
  static guards: {
    noUser: typeof NoUserGuard,
    auth: typeof AuthGuard
  } = {
      noUser: NoUserGuard,
      auth: AuthGuard
    };

  static config: ConfigRoutes;

  static init(config: ConfigRoutes) {
    AuthJSStrapi.config = config;
  }
}


interface ConfigRoutes {
  server: string
  loginRoute: string[],
  homeRoute: string[],

}
