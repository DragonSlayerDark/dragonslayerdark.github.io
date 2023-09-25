import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthJSStrapi } from './auth_services/auth';
import { PAWLMainRoutes } from './exports/enums';

const routes: Routes = [
  {
    path: '',
    redirectTo: PAWLMainRoutes.CLIENT,
    pathMatch: 'full'
  },
  {
    path: PAWLMainRoutes.CLIENT, loadChildren: () => import('./modules/client/client.module').then(m => m.ClientModule),
    canActivate: [AuthJSStrapi.guards.auth]
  },
  {
    path: PAWLMainRoutes.ADMIN, loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthJSStrapi.guards.auth]
  },
  {
    path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
    canActivate: [AuthJSStrapi.guards.noUser]
  },
  {
    path: '**',
    redirectTo: PAWLMainRoutes.CLIENT
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
