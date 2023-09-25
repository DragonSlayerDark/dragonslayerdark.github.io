import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, Observable, of } from 'rxjs';
import {  tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth_services/store/auth.service';
import { PAWLLocalStorage } from 'src/app/exports/enums';
import { AppState } from 'src/app/store/app.state';
import { loadPets } from 'src/app/store/entities/actions/pet.actions';
import { Pet } from 'src/app/store/entities/models/pet.model';
import { selectAllPets } from 'src/app/store/entities/selectors/pet.selectors';
import { PetService } from 'src/app/store/entities/services/pet.service';
import { EntityStrapi } from 'src/app/store/entities/strapi_payload_entity';
import { environment } from 'src/environments/environment';
import { AppService } from '../../../store/custom/services/app.service';


@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent implements OnInit {

  @Input() showAdd: boolean = false;


  pets$: Observable<EntityStrapi<Pet>[]>
  selectedPet$: Observable<EntityStrapi<Pet>> = null;
  server: string = environment.server;
  dataArray$: Observable<string[]>;
  vaccineCardId: number;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private auth: AuthService, 
    private petService: PetService,
    private App: AppService
  ) {

    this.dataArray$ = of(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9']);


    this.pets$ = this.store.select(selectAllPets).pipe(filter((x) => x.length != 0), map((pets: EntityStrapi<Pet>[]) => {
      let selectedPetID = localStorage.getItem(PAWLLocalStorage.SELECTED_PET_ID) || pets[0].id;
      let modifiedPets = [...pets];
      let user = JSON.parse(localStorage.getItem("usuario"));

      if (selectedPetID) {
        // Find the selected pet and remove it from the array
        let selectedPet = modifiedPets.find(pet => pet.id == selectedPetID);
        modifiedPets = modifiedPets.filter((pet) => pet.id != selectedPet.id);
      }
      // Return only the first 2 pets
      return modifiedPets;
    }));




    this.selectedPet$ = this.store.select(selectAllPets).pipe(
      tap(pets => console.log(pets[0])),
      filter(((x) => x.length != 0)), map((pets: EntityStrapi<Pet>[]) => {
      let selectedPetID = localStorage.getItem(PAWLLocalStorage.SELECTED_PET_ID) || pets[0].id;
      let selectedPet = pets.find(pet => pet.id == selectedPetID);

        const dob = new Date(selectedPet.attributes.dob);
        const today = new Date();
        const timeDiff = today.getTime() - dob.getTime();
        const weeksDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7));

        switch (selectedPet?.attributes?.pet_type?.data['id']) {
          case "3": // perro
            this.vaccineCardId = weeksDiff <= 17 ? 1 : 3;
            break;
          case "2": // gato
            this.vaccineCardId = weeksDiff <= 16 ? 2 : 4;
            break;
          default:
            this.vaccineCardId = 0; // Set a default value in case pet type is unknown
            break;
        }
        const petInfo = {
          petBreedId: selectedPet?.attributes?.pet_breed?.data['id'],
          petTypeId: selectedPet?.attributes?.pet_type?.data['id'],
          petSize: selectedPet?.attributes?.pet_size,
          dob: selectedPet?.attributes?.dob,
          gender: selectedPet?.attributes?.gender,
          name: selectedPet?.attributes?.name,
          vaccineCardId: this.vaccineCardId
        };
      if(localStorage.getItem(PAWLLocalStorage.SELECTED_PET_ID) == null){
        localStorage.setItem(PAWLLocalStorage.SELECTED_PET_ID, selectedPet.id+"");
      }
          localStorage.setItem(PAWLLocalStorage.SELECTED_PET, JSON.stringify(petInfo) + "");

      return selectedPet;
    }));
  }

  ngOnInit(): void {
    this.store.dispatch(loadPets({
      userID: this.auth.getUser().id
      // userID: 1
    }));
    this.App.onActivate();

    this.hideemptycontainers();
  }

  selectedPets(petId: number, petTypeId: number, pet){
    this.router.navigate(['/my-pets', 'list', petId]);
    this.petService.setPet(petId = petId, petTypeId = petTypeId);
  }

  selectPet(petId: number, petTypeId: number, pet){
    this.petService.setPet(petId = petId, petTypeId = petTypeId);
    this.router.navigate(['/my-pets', 'list', petId]);
    this.ngOnInit();
  }

  hideemptycontainers(){
    const elements = document.querySelectorAll(`.group-container`);
    elements.forEach((element) => {
      // Type assertion to HTMLDivElement
      const divElement = element as HTMLDivElement;

      if (divElement.innerHTML.trim() === '') {
        divElement.style.display = "none";
        console.log('vacios');
      }
    });



  }
}
