import { Component, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AuthService } from 'src/app/auth_services/store/auth.service';
import { AppState } from 'src/app/store/app.state';
import { loadAddresses, loadAddressesSuccess } from 'src/app/store/entities/actions/address.actions';
import { EventEmitter } from '@angular/core';
import { selectAllAddress } from 'src/app/store/entities/selectors/address.selectors';
import { take } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-form-address-list',
  templateUrl: './form-address-list.component.html',
  styleUrls: ['./form-address-list.component.scss']
})
export class FormAddressListComponent implements OnInit {

  @Output() addressSelected = new EventEmitter();
  showAddresses = false;
  showCreateAddress = false;

  constructor(
    private store: Store<AppState>,
    private auth: AuthService,
    private actions$: Actions
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadAddresses({
      userID: this.auth.getUser().id,
    }));

    this.actions$.pipe(
      ofType(loadAddressesSuccess),
      take(1)
    ).subscribe(({ addresses }) => {
      if (addresses.length != 0) {
        this.showAddresses = true;
        // Scroll to top of the window with animation
      } else {
        this.showCreateAddress = true;
      }
    });
  }

  selectedAddress(address: any) {
    this.addressSelected.emit(address);
  }

}
