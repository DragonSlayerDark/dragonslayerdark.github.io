import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { AuthService } from '../store/auth.service';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { addRequestToQueue, removeRequestFromQueue } from 'src/app/store/custom/actions/pawl.actions';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private store: Store<AppState>
  ) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if ((!req.url.includes('api/auth/local') && !req.url.includes('auth')) || req.url.includes(environment.payment)) {
      if (this.auth.isAuthCheck()) {

        let headers: any = {
          Authorization: `Bearer ${this.auth.getToken()}`
        };

        if (req.url.includes(environment.payment)) { // if is a payment request
          console.log('payment request');
          headers = {
            ...headers,
            project: environment.projectID,
            user: this.auth.getUser().id + ""
          }
        }

        req = req.clone({
          setHeaders: headers
        });
      }
    }
    this.store.dispatch(addRequestToQueue());
    return next.handle(req).pipe(
      finalize(() => this.store.dispatch(removeRequestFromQueue()))
    );
  }
}
