import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable, take, takeUntil, tap } from 'rxjs';
import { AuthService } from 'src/app/auth_services/store/auth.service';
import { SharedService } from 'src/app/modules/shared/shared.service';
import { AppState } from 'src/app/store/app.state';
import { confirmPayment, errorPayment } from 'src/app/store/custom/actions/cart.actions';
import { CartService } from 'src/app/store/custom/services/cart.service';
import { selectQueryParam } from 'src/app/store/router/router.selector';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss']
})
export class ConfirmOrderComponent implements OnInit, OnDestroy {

  transaction_token: string;
  leave$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  projectID = environment.projectID;
  userID: string = this.auth.getId().toString();

  constructor(
    private router: Router,
    private cartService: CartService,
    private store: Store<AppState>,
    private actions$: Actions,
    private auth: AuthService,
    private shared: SharedService
  ) { }

  ngOnDestroy(): void {

  }

  ngOnInit(): void {
  }

  response(event: { body: any; valid: boolean; }) {
    console.log(event);
    if (event.valid) {
      console.log('Payment successful')
      localStorage.setItem('cardsFlag', 'true')
    } else {
      console.log('Payment failed')
    }
  }

}
