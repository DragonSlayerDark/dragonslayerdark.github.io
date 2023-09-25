import { Component, OnInit, Input, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getNetpayClient } from 'src/app/store/custom/actions/cart.actions';
import { PaymentSource } from 'src/app/store/custom/models/user_netpay.model';
import { getCards } from 'src/app/store/custom/selectors/cart.selectors';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SharedService } from 'src/app/modules/shared/shared.service';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
// Import eventEmmiter
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-list-cards',
  templateUrl: './form-list-cards.component.html',
  styleUrls: ['./form-list-cards.component.scss']
})
export class FormListCardsComponent implements OnInit {

  cards$: Observable<PaymentSource[]>;
  form: FormGroup;
  @Output() selectedCardEvent = new EventEmitter();
  faEdit = faEdit;
  faDelete = faTrashAlt;
  @Input() selectCard: boolean = true;
  showContinueButton = false;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private shared: SharedService
  ) {
    this.form = this.fb.group({
      selectedCard: new FormControl('')
    });
    this.form.get('selectedCard').valueChanges.subscribe((value) => {
      this.showContinueButton = value != '' && value != null;
    });
  }

  ngOnInit(): void {
    this.store.dispatch(getNetpayClient());
    this.cards$ = this.store.pipe(select(getCards));
  }

  edit(id: string) {
    this.shared.sendAlert('warning', 'Editar tarjeta', 'Esta funcionalidad aún no está disponible');
  }

  delete(id: string) {
    this.shared.sendAlert('warning', 'Eliminar tarjeta', 'Esta funcionalidad aún no está disponible');
  }

  selectedCard() {
    this.selectedCardEvent.emit(this.form.value.selectedCard);
  }

}
