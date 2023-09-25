import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs'
import {filter, take, takeUntil} from 'rxjs/operators'
import { AppModule } from 'src/app/app.module';
import { AuthService } from 'src/app/auth_services/store/auth.service';
import { PAWLLocalStorage } from 'src/app/exports/enums';
import { SharedService } from 'src/app/modules/shared/shared.service';
import { loadPetBreeds } from 'src/app/store/entities/actions/pet-breed.actions';
import { loadPetTypes } from 'src/app/store/entities/actions/pet-type.actions';
import { addPet, updatePet } from 'src/app/store/entities/actions/pet.actions';
import { PetBreed } from 'src/app/store/entities/models/pet-breed.model';
import { PetType } from 'src/app/store/entities/models/pet-type.model';
import { Pet } from 'src/app/store/entities/models/pet.model';
import { selectAllPetBreeds } from 'src/app/store/entities/selectors/pet-breed.selectors';
import { selectAllPetTypes } from 'src/app/store/entities/selectors/pet-type.selectors';
import { selectPetById } from 'src/app/store/entities/selectors/pet.selectors';
import { PetService } from 'src/app/store/entities/services/pet.service';
import { EntityStrapi } from 'src/app/store/entities/strapi_payload_entity';
import { AppService } from '../../../../store/custom/services/app.service';

@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.component.html',
  styleUrls: ['./edit-pet.component.scss']
})
export class EditPetComponent implements OnInit {

  isLinear = false;
  isChecked = true;
  petId= localStorage.getItem(PAWLLocalStorage.SELECTED_PET_ID);
  pet = JSON.parse(localStorage.getItem(PAWLLocalStorage.SELECTED_PET));
  vaccineCardType: number;
  dewormerType: number;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  breeds$: Observable<EntityStrapi<PetBreed>[]>;
  petTypes$: Observable<EntityStrapi<PetType>[]>;
  pet$: Observable<EntityStrapi<Pet>>
  addPetForm: FormGroup;

  constructor(
    private store: Store<AppModule>,
    private auth: AuthService,
    private fb: FormBuilder,
    private shared:SharedService,
    private App: AppService
  ) {
    //falta crear el update de la imagen

    this.addPetForm = this.fb.group({
      id: new FormControl(this.petId),
      especie: new FormControl(this.pet.petTypeId),
      size: new FormControl(this.pet.petSize),
      name: new FormControl(this.pet.name),
      dob: new FormControl(this.pet.dob),
      raza: new FormControl(this.pet.petBreedId),
      // segundaraza: new FormControl(),
      genero: new FormControl(this.pet.gender),
    })


  }


  ngOnInit(): void {
    this.store.dispatch(loadPetBreeds({ pet_type_id: this.pet.petTypeId }));
    this.store.dispatch(loadPetTypes());
    this.breeds$ = this.store.pipe(select(selectAllPetBreeds));
    this.petTypes$ = this.store.pipe(select(selectAllPetTypes));
    this.App.onActivate();
  }

  loadPetBreeds(pet_type_id: number) {
    this.store.dispatch(loadPetBreeds({ pet_type_id: pet_type_id }));
    this.isChecked = true;
  }

  checkPetBreed() {
    if (this.isChecked === false) {
      return this.shared.sendAlert('warning', 'Especie de mascota no seleccionada', 'Por favor seleccione una especie');
    }
  }

  onSubmit(input:any) {
    console.log("ONSUBMIT", this.addPetForm.value);
    if (this.addPetForm.invalid) {
      return this.shared.sendAlert('warning', 'Formulario Invalido', 'Por favor verifique los campos');
    }
    this.store.dispatch(updatePet({
      pet: {
        id: this.petId,
        name: this.addPetForm.controls['name'].value,
        dob: this.addPetForm.controls['dob'].value,
        gender: this.addPetForm.controls['genero'].value,
        pet_size: this.addPetForm.controls['size'].value,
        pet_type: this.addPetForm.controls['especie'].value,
        pet_breed: this.addPetForm.controls['raza'].value,
        // pet_second_breed: this.addPetForm.controls['segundaraza'].value,
        user: this.auth.getUser().id,
        vaccine_card: { vaccine_card: this.vaccineCardType},
        dewormer: { vaccine_card: this.dewormerType}
}, img: input.files[0]
    }))
    this.isChecked = false;
  }


  selectVaccineCard() {
    const dobString = this.addPetForm.get('dob').value;
    const dob = new Date(dobString);
    const today = new Date();

    // Revisamos que la fecha de nacimiento no sea una fecha futura
    if (dob > today) {
      this.shared.sendAlert('warning', 'Error', 'La fecha de nacimiento debe ser anterior a la fecha actual')
      return this.addPetForm.get('dob')?.setValue(this.pet.dob);
    }

    // Calculamos la diferencia en semanas
    const timeDiff = today.getTime() - dob.getTime();
    const weeksDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7));

    // Revisamos el tipo de pet y la diferencia en semanas para asignarle una cartilla de vacunacion
    switch (this.pet.petTypeId) {
      case "3": // perro
        this.vaccineCardType = weeksDiff <= 17 ? 1 : 3;
        this.dewormerType = 6;
        break;
      case "2": // gato
        this.vaccineCardType = weeksDiff <= 16 ? 2 : 4;
        this.dewormerType = 5;
        break;
      default:
        this.shared.sendAlert('warning', 'Especie de mascota no eleccionada', 'Por favor seleccione una especie');
        this.addPetForm.get('dob')?.setValue(this.pet.dob)
        return;
    }

  }
}
