import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/modules/shared/shared.service';
import { AppState } from 'src/app/store/app.state';
import { modifyCart, removeProductFromCart } from 'src/app/store/custom/actions/cart.actions';
import { CartEntity } from 'src/app/store/custom/models/cart.model';
import { getCart, getCartLength } from 'src/app/store/custom/selectors/cart.selectors';
import Swal from 'sweetalert2';
import { AppService } from '../../../../store/custom/services/app.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss']
})
export class MyOrderComponent implements OnInit {

  products$: Observable<CartEntity[]>;
  cartItemsLength = this.store.pipe(select(getCartLength));

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private shared: SharedService,
    private App: AppService
  ) {
    this.products$ = this.store.pipe(select(getCart));
  }

  ngOnInit(): void {
    this.App.onActivate();
  }

  goToPayment() {
    this.router.navigate(['/payment']);
  }

  modifyCart(item: CartEntity, add: boolean) {
    this.store.dispatch(modifyCart({
      itemID: item.product.id,
      add
    }));
  }

  calculateTotal(products: CartEntity[]) {
    return products.reduce((total, item) => total + item.product.attributes.subtotal * item.quantity, 0);
  }

  removeProduct( productID ){
    this.shared.sendConfirmation('warning', 'Alerta','Este producto será eliminado del carrito').then((res) => {
      if(res.isConfirmed){
        this.store.dispatch(removeProductFromCart({ productID: productID }));
        const Swal3=  Swal.mixin({
          customClass: {
            container: 'swalcontainer',
            popup: 'swalpopup',
            title: 'swaltitle',
            confirmButton: 'swalbutton swalaccept',
            cancelButton: 'swalbutton swalcnl',

          },
          buttonsStyling: false
        })

        Swal3.fire(
          'Producto Eliminado',
          'El producto ha sido eliminado de forma exitosa'
        );
      } else if(res.dismiss || res.isDenied){
        const Swal3=  Swal.mixin({
          customClass: {
            container: 'swalcontainer',
            popup: 'swalpopup',
            title: 'swaltitle',
            confirmButton: 'swalbutton swalaccept',
            cancelButton: 'swalbutton swalcnl',

          },
          buttonsStyling: false
        })

        Swal3.fire(
          'Eliminacion cancelada'
        );
      }
    });
  }

}
