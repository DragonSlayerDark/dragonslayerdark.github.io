import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCreditCard, faLock } from '@fortawesome/free-solid-svg-icons';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { ProductsDTO } from 'payment-stripe-widgets/lib/models/DTO/product.model';
import { map, Observable, take } from 'rxjs';
import { AuthService } from 'src/app/auth_services/store/auth.service';
import { PAWLLocalStorage } from 'src/app/exports/enums';
import { AppState } from 'src/app/store/app.state';
import { createOrder, createOrderSuccess, createPayment, getNetpayClient, loadSavedCart } from 'src/app/store/custom/actions/cart.actions';
import { addRequestToQueue, removeRequestFromQueue } from 'src/app/store/custom/actions/pawl.actions';
import { getCart } from 'src/app/store/custom/selectors/cart.selectors';
import { loadAddresses } from 'src/app/store/entities/actions/address.actions';
import { Order } from 'src/app/store/entities/models/order.model';
import { selectAllAddress } from 'src/app/store/entities/selectors/address.selectors';
import { selectAllProducts } from 'src/app/store/entities/selectors/product.selectors';
import { EntityStrapi } from 'src/app/store/entities/strapi_payload_entity';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, AfterViewInit {

  faCreditCard = faCreditCard;
  faLock = faLock;

  userID: number;
  projectID = environment.projectID;
  orderID = '';
  noCart = false;

  constructor(
    private store: Store<AppState>,
    private auth: AuthService,
    private actions$: Actions,
    private router: Router,
  ) {
    this.userID = this.auth.getId();
    
  }

  ngOnInit(): void {
    if (localStorage.getItem(PAWLLocalStorage.CART)) {
      this.store.dispatch(loadSavedCart());
    } else {
      this.noCart = true;
    }
  }

  ngAfterViewInit(): void {
  }

  selectedAddress(address: number | string) {
    this.store.dispatch(createOrder({
      addressID: address
    }));

    this.actions$.pipe(
      ofType(createOrderSuccess),
      take(1)
    ).subscribe((x) => {
      this.orderID = x.response.data.id;
      this.router.navigate(['/payment/pay/order', this.orderID]);
    })
  }

  goToPay(order: EntityStrapi<Order>) {
    this.router.navigate(['/payment/pay/order', order.id]);
  }
}
