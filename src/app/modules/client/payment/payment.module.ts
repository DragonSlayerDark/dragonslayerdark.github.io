import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment.component';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileModule } from '../profile/profile.module';
import { FormListCardsComponent } from './form-list-cards/form-list-cards.component';
import { FormAddressListComponent } from './form-address-list/form-address-list.component';
import * as payments from 'payment-stripe-widgets';
import { environment } from 'src/environments/environment';
import { PayorderComponent } from './payorder/payorder.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';

@NgModule({
  declarations: [
    PaymentComponent,
    ConfirmOrderComponent,
    FormListCardsComponent,
    FormAddressListComponent,
    PayorderComponent,
    SubscriptionsComponent,
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    ProfileModule,
    payments.PaymentModule.forRoot({
      paymentServer: environment.payment,
      stripePublicKey: environment.stripePublicKey,
    }),
  ]
})
export class PaymentModule { }
