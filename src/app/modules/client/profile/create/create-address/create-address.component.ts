import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth_services/store/auth.service';
import { SharedService } from 'src/app/modules/shared/shared.service';
import { AppState } from 'src/app/store/app.state';
import { addAddress, addAddressSuccess, loadAddresses } from 'src/app/store/entities/actions/address.actions';

@Component({
  selector: 'app-create-address',
  templateUrl: './create-address.component.html',
  styleUrls: ['./create-address.component.scss']
})
export class CreateAddressComponent implements OnInit, OnDestroy {

  form: FormGroup;
  @Output() addAddressSuccess = new EventEmitter();
  onDestroy: EventEmitter<void> = new EventEmitter();

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private shared: SharedService,
    private actions$: Actions,
    private auth: AuthService
  ) {
    this.form = this.fb.group({
      street: this.fb.control('', [Validators.required]),
      city: this.fb.control('', [Validators.required]),
      state: this.fb.control('', [Validators.required]),
      zip: this.fb.control('', [Validators.required]),
      country: this.fb.control('', [Validators.required]),
      name: this.fb.control('', [Validators.required]),
    });
  }

  ngOnDestroy(): void {
    this.onDestroy.emit();
    this.onDestroy.complete();
  }

  ngOnInit(): void {
    this.actions$.pipe(
      ofType(addAddressSuccess),
      takeUntil(this.onDestroy)
    ).subscribe((action) => {
      this.addAddressSuccess.emit();
    });
    this.store.dispatch(loadAddresses({ userID: this.auth.getId() }));

  }

  createAddress() {
    if (this.form.invalid) {
      this.shared.sendAlert('warning', 'Campos faltantes', 'Por favor, complete todos los campos');
      return;
    }

    this.store.dispatch(addAddress({
      street: this.form.value.street,
      city: this.form.value.city,
      state: this.form.value.state,
      zip: this.form.value.zip,
      country: this.form.value.country,
      name: this.form.value.name
    }));

  }

}
