import { Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { EntityStrapi } from '../../entities/strapi_payload_entity';
import { Pet } from '../../entities/models/pet.model';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { AppState } from '../../app.state';
import { PAWLLocalStorage } from 'src/app/exports/enums';
import { selectAllPets } from '../../entities/selectors/pet.selectors';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  selectedPet$: Observable<EntityStrapi<Pet>> = null;


  constructor(
    private store: Store<AppState>
  ) { }

  onActivate() {
    let scrollToTop = window.setInterval(() => {
        let pos = window.pageYOffset;
        if (pos > 0) {
            window.scrollTo(0, pos - 20); // how far to scroll on each step
        } else {
            window.clearInterval(scrollToTop);
        }
    }, 16);
  }


  setPet(){
    this.selectedPet$ = this.store.select(selectAllPets).pipe(
      tap(pets => console.log(pets[0])),
      filter(((x) => x.length != 0)), map((pets: EntityStrapi<Pet>[]) => {
        let selectedPetID = localStorage.getItem(PAWLLocalStorage.SELECTED_PET_ID) || pets[0].id;
        let selectedPet = pets.find(pet => pet.id == selectedPetID);
        const petInfo = {
          petBreedId: selectedPet.attributes.pet_breed.data['id'],
          petTypeId: selectedPet.attributes.pet_type.data['id'],
          petSize: selectedPet.attributes.pet_size,
          dob: selectedPet.attributes.dob,
          gender: selectedPet.attributes.gender,
          name: selectedPet.attributes.name
        };
        if (localStorage.getItem(PAWLLocalStorage.SELECTED_PET_ID) == null) {
          localStorage.setItem(PAWLLocalStorage.SELECTED_PET_ID, selectedPet.id + "");
        }
        if (localStorage.getItem(PAWLLocalStorage.SELECTED_PET) == null) {
          localStorage.setItem(PAWLLocalStorage.SELECTED_PET, JSON.stringify(petInfo) + "");
        }
        return selectedPet;
      }));
  }

}
