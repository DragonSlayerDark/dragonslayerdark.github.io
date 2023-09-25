import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PAWLLocalStorage } from 'src/app/exports/enums';
import { VaccineCardComponent } from '../../shared/vaccine-card/vaccine-card.component';
import { DeletePetComponent } from './delete-pet/delete-pet.component';
import { EditPetComponent } from './edit-pet/edit-pet.component';
import { ListPetsComponent } from './list-pets/list-pets.component';
import { MyPetsComponent } from './my-pets.component';
import { VaccineCardClientComponent } from './vaccine-card-client/vaccine-card-client.component';
import { DewormerComponent } from '../../shared/dewormer/dewormer.component';

let selectedPetIDRoute: string = localStorage.getItem(PAWLLocalStorage.SELECTED_PET_ID) != null ? 'list/' + localStorage.getItem(PAWLLocalStorage.SELECTED_PET_ID) : '/profile/petslist';

const routes: Routes = [
  {
    path: '',
    component: MyPetsComponent,
    children: [
      {
        path: 'list/:id',
        component: ListPetsComponent
      },
      {
        path: 'vaccine-card/:id',
        component: VaccineCardClientComponent
      },
      {
        path: 'dewormer',
        component: DewormerComponent
      },
      {
        path: 'edit-pet/:id',
        component: EditPetComponent
      },
      {
        path: 'delete-pet/:id',
        component: DeletePetComponent
      },
      {
        path: '',
        redirectTo: selectedPetIDRoute,
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: selectedPetIDRoute
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyPetsRoutingModule { }
