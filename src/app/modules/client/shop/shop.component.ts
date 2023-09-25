import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loadSavedCart } from 'src/app/store/custom/actions/cart.actions';
import { AppService } from '../../../store/custom/services/app.service';



@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  constructor(
    private store: Store<AppState>,
    private App: AppService
  ){}

  ngOnInit(): void {
    this.store.dispatch(loadSavedCart());
    this.App.onActivate();
  }


}
