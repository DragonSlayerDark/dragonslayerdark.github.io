import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PAWLClientRoutes } from 'src/app/exports/enums';
import { ClientComponent } from './client.component';

const routes: Routes = [
  {
    path: '', component: ClientComponent,
    children: [
      {
        path: '',
        redirectTo: PAWLClientRoutes.HOME,
        pathMatch: 'full'
      },
      { path: PAWLClientRoutes.HOME, loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
      { path: PAWLClientRoutes.MY_PETS, loadChildren: () => import('./my-pets/my-pets.module').then(m => m.MyPetsModule) },
      { path: PAWLClientRoutes.SHOP, loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule) },
      { path: PAWLClientRoutes.PROFILE, loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
      { path: PAWLClientRoutes.ADD_PET, loadChildren: () => import('./add-pet/add-pet.module').then(m => m.AddPetModule) },
      { path: PAWLClientRoutes.PAYMENT, loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule) },
      // {
      //   path: '**',
      //   redirectTo: PAWLClientRoutes.HOME
      // },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
