import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { PaymentComponent } from './payment.component';
import { PayorderComponent } from './payorder/payorder.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentComponent
  },
  {
    path: 'pay/order/:id',
    component: PayorderComponent
  },
  {
    path: 'confirm',
    component: ConfirmOrderComponent
  },
  {
    path: 'subscriptions',
    component: SubscriptionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
