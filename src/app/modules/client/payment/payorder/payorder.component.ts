import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { selectRouteParam } from 'src/app/store/router/router.selector';
import { tap, map, take } from 'rxjs/operators';
import { ProductsDTO } from 'payment-stripe-widgets/lib/models/DTO/product.model';
import { Observable } from 'rxjs';
import { getCart } from 'src/app/store/custom/selectors/cart.selectors';
import { AuthService } from 'src/app/auth_services/store/auth.service';
import { environment } from 'src/environments/environment';
import { loadOrders, loadOrdersSuccess } from 'src/app/store/entities/actions/order.actions';
import { selectOrderById } from 'src/app/store/entities/selectors/order.selectors';
import { Actions, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payorder',
  templateUrl: './payorder.component.html',
  styleUrls: ['./payorder.component.scss']
})
export class PayorderComponent implements OnInit {

  metadata: {} = {};
  products$: Observable<ProductsDTO[]>;
  userID = this.auth.getId().toString();
  projectID = environment.projectID;
  orderID = '';
  email = this.auth.getEmail();


  constructor(
    private store: Store<AppState>,
    private auth: AuthService,
    private actions: Actions,
    private router: Router
  ) {
    this.store.pipe(select(selectRouteParam('id')), tap(id => {
      this.orderID = id;
      this.metadata = {
        orderID: id
      }
    }), take(1)).subscribe();

    // at this point, cart is empty, so we need to load it from the server
    this.store.dispatch(loadOrders({
      userID: this.auth.getId(),
    }));

    this.actions.pipe(ofType(loadOrdersSuccess), take(1)).subscribe(() => {
      this.products$ = this.store.pipe(select(selectOrderById(parseInt(this.orderID))), map(order => {
        if (!order || order.attributes.paid) {
          this.router.navigate(['shop/orders']);
          return;
        }
        const products: ProductsDTO[] = [];
        order.attributes.products.forEach(item => {
          products.push({
            id: item.product.data.attributes.stripe_id,
            quantity: item.quantity
          });
        });
        return products;
      }));
    });
  }

  ngOnInit(): void {

  }

}
