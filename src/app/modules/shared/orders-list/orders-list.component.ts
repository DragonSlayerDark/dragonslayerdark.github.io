import { Component, Input, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { map, Observable, tap } from 'rxjs';
import { Order } from 'src/app/store/entities/models/order.model';
import { selectAllOrders } from 'src/app/store/entities/selectors/order.selectors';
import { addOrder, loadOrders } from 'src/app/store/entities/actions/order.actions';
import { EntityStrapi } from 'src/app/store/entities/strapi_payload_entity';
import { SocketService } from 'src/app/store/custom/services/socket.service';
import { EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth_services/store/auth.service';
import { AppService } from '../../../store/custom/services/app.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],

})
export class OrdersListComponent implements OnInit {
  orders$: Observable<EntityStrapi<Order>[]>;
  @Input() userID: number;
  @Input() showPendingOrders = false;
  @Output() clickedElement = new EventEmitter<EntityStrapi<Order>>();


  constructor(
    private store: Store<AppState>,
    private socketService: SocketService,
    private auth: AuthService,
    private App: AppService

  ) {
    this.orders$ = this.store.pipe(select(selectAllOrders), map((x) => x.reverse()));
    this.socketService.socket.on('orders', (data: EntityStrapi<Order>) => {
      if (!this.showPendingOrders) {
        this.store.dispatch(addOrder({ order: data }));
      }
    })
  }

  ngOnInit(): void {
    this.store.dispatch(loadOrders({
      // userID: this.auth != null ? this.userID : null, //aqui tengo la duda de por que se usaba el Id obtenido desde el input y no de otra forma
      userID: this.auth.getUser().id != null ? this.auth.getUser().id : null,
      pending: this.showPendingOrders
    }));
    this.App.onActivate();
  }

  clickedElementEmit(order: EntityStrapi<Order>) {
    this.clickedElement.emit(order);
  }
}
