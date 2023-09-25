import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyPetsRoutingModule } from './my-pets-routing.module';
import { MyPetsComponent } from './my-pets.component';
import { ListPetsComponent } from './list-pets/list-pets.component';
import { SharedModule } from '../../shared/shared.module';
import { VaccineCardClientComponent } from './vaccine-card-client/vaccine-card-client.component';
import { EditPetComponent } from './edit-pet/edit-pet.component';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { DeletePetComponent } from './delete-pet/delete-pet.component';


@NgModule({
  declarations: [
    MyPetsComponent,
    ListPetsComponent,
    VaccineCardClientComponent,
    EditPetComponent,
    DeletePetComponent
  ],
  imports: [
    CommonModule,
    MyPetsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatStepperModule
  ]
})
export class MyPetsModule { }
