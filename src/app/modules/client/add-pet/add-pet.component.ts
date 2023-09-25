import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { loadPetBreeds } from 'src/app/store/entities/actions/pet-breed.actions';
import { loadPetTypes } from 'src/app/store/entities/actions/pet-type.actions';
import { addPet, addPets, loadPets } from 'src/app/store/entities/actions/pet.actions';
import { PetBreed } from 'src/app/store/entities/models/pet-breed.model';
import { PetType } from 'src/app/store/entities/models/pet-type.model';
import { Pet } from 'src/app/store/entities/models/pet.model';
import { selectAllPetBreeds } from 'src/app/store/entities/selectors/pet-breed.selectors';
import { selectAllPetTypes } from 'src/app/store/entities/selectors/pet-type.selectors';
import { EntityStrapi } from 'src/app/store/entities/strapi_payload_entity';
import { MatStepper } from '@angular/material/stepper';
import { AuthService } from 'src/app/auth_services/store/auth.service';
import { SharedService } from '../../shared/shared.service';
import { AppService } from '../../../store/custom/services/app.service';



@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.scss']
})
export class AddPetComponent implements OnInit {

  isLinear = false;
  isChecked = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  imageInput: File;
  localImg: string | ArrayBuffer;
  pet_type_id: number;
  vaccineCardType: number;
  dewormerType: number;

  breeds$: Observable<EntityStrapi<PetBreed>[]>;
  petTypes$: Observable<EntityStrapi<PetType>[]>;

  addPetForm = new FormGroup({
    especie: new FormControl('', [Validators.required]),
    size: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    raza: new FormControl('', [Validators.required]),
    // segundaraza: new FormControl(null, []),
    genero: new FormControl("", [Validators.required]),
  })

  constructor(
    private store: Store<AppModule>,
    private auth: AuthService,
    private shared: SharedService,
    private App: AppService
  ) {
   }

  ngOnInit(): void {
    console.log("NGONINIT ADD PET");

    this.store.dispatch(loadPetTypes());
    this.breeds$ = this.store.pipe(select(selectAllPetBreeds));
    this.petTypes$ = this.store.pipe(select(selectAllPetTypes));
    this.App.onActivate();
  }

  onSubmit(input:any) {
    console.log("ONSUBMIT", this.addPetForm.value);
    if (this.addPetForm.invalid) {
      return this.shared.sendAlert('warning', 'Formulario Invalido', 'Por favor, verifique los campos');
    }

    this.store.dispatch(addPet({
      pet: {
        name: this.addPetForm.controls['name'].value,
        dob: this.addPetForm.controls['dob'].value,
        gender: this.addPetForm.controls['genero'].value,
        pet_size: this.addPetForm.controls['size'].value,
        pet_type: this.addPetForm.controls['especie'].value,
        pet_breed: this.addPetForm.controls['raza'].value,
        // pet_second_breed: this.addPetForm.controls['segundaraza'].value,
        user: this.auth.getUser().id,
        vaccine_card: { vaccine_card : this.vaccineCardType},
        dewormer: {vaccine_card: this.dewormerType}
      }, img: input.files[0]
    }))
  }

  /**
   * genera arrayBuffer apartir del elemento html input
   * @returns dataURL reader(arraybuffer)
   */
  processImg() {
    const selectedFile = document.getElementById('inputFile') as HTMLInputElement;
    this.imageInput = selectedFile.files[0];
    if (!this.imageInput.type.includes('image')) return alert('no es una imagen');
    const reader = new FileReader();
    reader.onload = (_event) => {
      this.localImg = reader.result;
    }
    return reader.readAsDataURL(this.imageInput);
  }
  handleIconClick() {
    document.getElementById('inputFile').click();
  };


  loadPetBreeds(pet_type_id: number) {
    this.store.dispatch(loadPetBreeds({ pet_type_id: pet_type_id }));
    this.isChecked = true;
    const selectedPetType = this.addPetForm.get('especie').value;
    console.log('Selected pet type:', selectedPetType);
    if (selectedPetType === '3') {
      console.log('Pet type is dog');
      this.pet_type_id = 1;
    } else {
      console.log('Pet type is cat');
      this.pet_type_id = 2;
    }
  }

  selectVaccineCard() {
    const dobString = this.addPetForm.get('dob').value;
    const dob = new Date(dobString);
    const today = new Date();

    // Revisamos que la fecha de nacimiento no sea una fecha futura
    if (dob > today) {
      this.shared.sendAlert('warning', 'Error', 'La fecha de nacimiento debe ser anterior a la fecha actual')
      return this.addPetForm.get('dob')?.reset();
    }

    // Calculamos la diferencia en semanas
    const timeDiff = today.getTime() - dob.getTime();
    const weeksDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7));

    // Revisamos el tipo de pet y la diferencia en semanas para asignarle una cartilla de vacunacion
    switch (this.pet_type_id) {
      case 1: // perro
        this.vaccineCardType = weeksDiff <= 17 ? 1 : 3;
        this.dewormerType=6;
        break;
      case 2: // gato
        this.vaccineCardType = weeksDiff <= 16 ? 2 : 4;
        this.dewormerType=5;
        break;
      default:
        this.shared.sendAlert('warning', 'Especie de mascota no eleccionada', 'Por favor seleccione una especie');
        this.addPetForm.get('dob')?.reset();
        return;
    }
  }





  checkPetBreed(){
    if(this.isChecked === false){
      return this.shared.sendAlert('warning', 'Especie de mascota no seleccionada', 'Por favor seleccione una especie');
    }
  }



}
