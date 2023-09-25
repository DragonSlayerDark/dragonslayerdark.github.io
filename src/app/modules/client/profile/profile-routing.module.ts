import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetsListComponent } from './pets-list/pets-list.component';
import { ProfileComponent } from './profile.component';
import { UserComponent } from './user/user.component';
import { ListAddressComponent } from './list/list-address/list-address.component';
import { ListPaymentComponent } from './list/list-payment/list-payment.component';
import { OrdersListComponent } from '../../shared/orders-list/orders-list.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CreateAddressComponent } from './create/create-address/create-address.component';
import { SettingsComponent } from './settings/settings.component';
import { EditAddressComponent } from './edit/edit-address/edit-address.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';
import { NotificationsComponent } from './notifications/notifications.component';


const routes: Routes = [{
  path: '',
 component: ProfileComponent ,
  children:[
    {
      path:'',
      redirectTo: 'user',
      pathMatch: 'full'
    },
    {
      path:'user',
      component: UserComponent
    },
    {
      path:'petslist',
      component:PetsListComponent
    },
    {
      path:'adresslist',
      component:ListAddressComponent
    },
    {
      path:'paymentslist',
      component:ListPaymentComponent
    },
    {
      path:'orderlist',
      component:OrdersListComponent
    },
    {
      path:'editUser',
      component: EditProfileComponent
    },
    {
      path:'createAddress',
      component: CreateAddressComponent
    },
    {
      path:'ajustes',
      component: SettingsComponent
    },
    {
      path:'editAddress/:id',
      component: EditAddressComponent
    },
    {
      path:'editPassword',
      component: EditPasswordComponent
    },
    {
      path:'notifications',
      component: NotificationsComponent
    },
    {
      path: '**',
      redirectTo: 'user',
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
