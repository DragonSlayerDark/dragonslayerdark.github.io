import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '../../shared/shared.module';
import { CreateAddressComponent } from './create/create-address/create-address.component';
import { EditAddressComponent } from './edit/edit-address/edit-address.component';
import { ListAddressComponent } from './list/list-address/list-address.component';
import { SettingsComponent } from './settings/settings.component';
import { ListPaymentComponent } from './list/list-payment/list-payment.component';
import { AdminModule } from '../../admin/admin.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PetsListComponent } from './pets-list/pets-list.component';
import { UserComponent } from './user/user.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import * as payments from 'payment-stripe-widgets';
import { environment } from 'src/environments/environment';
import { EditPasswordComponent } from './edit-password/edit-password.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotificationChipComponent } from './notification-chip/notification-chip.component';


@NgModule({
  declarations: [
    ProfileComponent,
    CreateAddressComponent,
    EditAddressComponent,
    ListAddressComponent,
    SettingsComponent,
    ListPaymentComponent,
    PetsListComponent,
    UserComponent,
    EditProfileComponent,
    EditPasswordComponent,
    NotificationsComponent,
    NotificationChipComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    payments.PaymentModule.forRoot({
      paymentServer: environment.payment,
      stripePublicKey: environment.stripePublicKey,
    }),
  ],
  exports: [
    ListAddressComponent,
    CreateAddressComponent
  ]
})
export class ProfileModule { }
