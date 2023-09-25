import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { takeUntil, Observable, tap, map, filter } from 'rxjs';
import { AuthService } from 'src/app/auth_services/store/auth.service';
import { SharedService } from 'src/app/modules/shared/shared.service';
import { AppState } from 'src/app/store/app.state';
import { deleteAddress, loadAddresses, updateAddress, updateAddressSuccess } from 'src/app/store/entities/actions/address.actions';
import { Address } from 'src/app/store/entities/models/address.model';
import { selectAddressById } from 'src/app/store/entities/selectors/address.selectors';
import Swal from 'sweetalert2';
import { AppService } from '../../../../../store/custom/services/app.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent implements OnInit ,OnDestroy {

  form: FormGroup;
  @Output() updateAddressSuccess = new EventEmitter();
  onDestroy: EventEmitter<void> = new EventEmitter();
  address$: Observable<Address>
  addressId: string;
  addressObj = JSON.parse(localStorage.getItem('addressObj'))

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private shared: SharedService,
    private actions$: Actions,
    private auth: AuthService,
    private activeRoute: ActivatedRoute,
    private App: AppService

  ) {

    this.store.dispatch(loadAddresses({ userID: this.auth.getId() }));
    this.addressId = this.activeRoute.snapshot.params['id']
    console.log(this.addressObj);

    this.form = this.fb.group({
      street: this.fb.control(this.addressObj.street, [Validators.required]),
      city: this.fb.control(this.addressObj.city, [Validators.required]),
      state: this.fb.control(this.addressObj.state, [Validators.required]) ,
      zip: this.fb.control(this.addressObj.zip, [Validators.required]),
      country: this.fb.control(this.addressObj.country, [Validators.required]),
      name: this.fb.control(this.addressObj.name, [Validators.required])
    });

   }


  ngOnDestroy(): void {
    this.onDestroy.emit();
    this.onDestroy.complete();
  }

  ngOnInit(): void {
    this.App.onActivate();
    this.actions$.pipe(
      ofType(updateAddressSuccess),
      takeUntil(this.onDestroy)
    ).subscribe((action) => {
      this.updateAddressSuccess.emit();
    })
    console.log(this.addressId);
  }

  delete() {
    this.shared.sendConfirmation('warning', 'Atencion', 'Esta direccion sera eliminada de forma permanente').then((res) => {
      if (res.isConfirmed) {
        this.store.dispatch(deleteAddress({ id: this.addressId }));
      } else if (res.dismiss || res.isDenied) {
        const Swal3 = Swal.mixin({
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
          'Eliminar cancelado'
        );
      }
    })
  }

  updateAddress() {
    this.store.dispatch(updateAddress({
      id: this.addressId,
      street: this.form.value.street,
      city: this.form.value.city,
      state: this.form.value.state,
      zip: this.form.value.zip,
      country: this.form.value.country,
      name: this.form.value.name
    }))
  }

}
