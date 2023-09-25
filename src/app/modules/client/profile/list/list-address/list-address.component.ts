import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { select, Store } from '@ngrx/store';
import { Observable, tap, take } from 'rxjs';
import { AuthService } from 'src/app/auth_services/store/auth.service';
import { SharedService } from 'src/app/modules/shared/shared.service';
import { AppState } from 'src/app/store/app.state';
import { deleteAddress, loadAddresses } from 'src/app/store/entities/actions/address.actions';
import { Address } from 'src/app/store/entities/models/address.model';
import { selectAllAddress } from 'src/app/store/entities/selectors/address.selectors';
import { AppService } from '../../../../../store/custom/services/app.service';

@Component({
  selector: 'app-list-address',
  templateUrl: './list-address.component.html',
  styleUrls: ['./list-address.component.scss']
})
export class ListAddressComponent implements OnInit {

  addresses$: Observable<Address[]>;
  faDelete = faTrashAlt;
  faEdit = faEdit;
  @Input() selectAddress: boolean = false;
  form: FormGroup;
  showContinueButton = false;
  @Output() selectedAddressEvent = new EventEmitter<Address>();

  constructor(
    private store: Store<AppState>,
    private auth: AuthService,
    private shared: SharedService,
    private fb: FormBuilder,
    private router:Router,
    private App: AppService
  ) {
    this.form = this.fb.group({
      selectedAddress: new FormControl('')
    });
  }

  ngOnInit(): void {
    console.log("INIT")
    this.store.dispatch(loadAddresses({ userID: this.auth.getId() }));
    this.addresses$ = this.store.pipe(select(selectAllAddress));
    this.form.get('selectedAddress').valueChanges.subscribe((value) => {
      this.showContinueButton = value != '' && value != null;
    });
    this.App.onActivate();
  }

  edit(id: string) {
    this.shared.sendAlert('warning', 'Editar dirección', 'Esta funcionalidad aún no está disponible');
  }

  selecedtAddress(address){
    localStorage.setItem('addressObj', JSON.stringify(address));
    this.router.navigate(['/profile/editAddress', address.id]).then(() =>{
      window.location.reload()
    });
  }

  selectedAddress() {
    // Emit the selected address, not only the id
    this.addresses$.pipe(
      take(1),
    ).subscribe((x) => {
      let address = x.find((y) => y.id == this.form.value.selectedAddress);
      let modifiedAddress = { ...address };
      delete modifiedAddress.id;
      this.selectedAddressEvent.emit(
        modifiedAddress
      );
    })
  }
}
