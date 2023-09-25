import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPetRoutingModule } from './add-pet-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddPetComponent } from './add-pet.component';
import { MatStepperModule } from '@angular/material/stepper';



@NgModule({
  declarations: [
    AddPetComponent
  ],
  imports: [
    CommonModule,
    AddPetRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatStepperModule
  ]
})
export class AddPetModule { }
