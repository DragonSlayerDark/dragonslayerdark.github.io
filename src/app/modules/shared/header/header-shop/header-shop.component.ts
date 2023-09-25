import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { PAWLLocalStorage } from 'src/app/exports/enums';
import { AppState } from 'src/app/store/app.state';
import { selectAllPets, selectPetById } from 'src/app/store/entities/selectors/pet.selectors';
import { selectAll } from 'src/app/store/entities/reducers/pet-breed.reducer';
import { HeaderChildAbstract } from '../header-child-abstract/header-child-abstract.component';
import { getCartLength } from 'src/app/store/custom/selectors/cart.selectors';
import { Observable, tap, filter, map } from 'rxjs';
import { Pet } from 'src/app/store/entities/models/pet.model';
import { EntityStrapi } from 'src/app/store/entities/strapi_payload_entity';
import { loadPets } from 'src/app/store/entities/actions/pet.actions';
import { AuthService } from 'src/app/auth_services/store/auth.service';
import { PetService } from 'src/app/store/entities/services/pet.service';
import { AppService } from 'src/app/store/custom/services/app.service';

@Component({
  selector: 'app-header-shop',
  templateUrl: './header-shop.component.html',
  styleUrls: ['./header-shop.component.scss']
})
export class HeaderShopComponent extends HeaderChildAbstract implements OnInit {

  cartItemsLength = this.store.pipe(select(getCartLength));
  selectedPet$: Observable<EntityStrapi<Pet>> = null;
  selectedPetID = localStorage.getItem(PAWLLocalStorage.SELECTED_PET_ID);
  cart= localStorage.getItem('cart')
  pet$: Observable<EntityStrapi<Pet>>;
  pets$: Observable<EntityStrapi<Pet>[]>;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private auth: AuthService,
    private petService: PetService,
    private app:AppService
  ) {
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(loadPets({
      userID: this.auth.getUser().id
    }));
    this.pet$ = this.store.pipe(select(selectPetById( this.selectedPetID )), tap((x) => console.log(x)));
    this.pets$ = this.store.select(selectAllPets).pipe(filter((x) => x.length != 0), map((pets: EntityStrapi<Pet>[]) => {
      let selectedPetID = localStorage.getItem(PAWLLocalStorage.SELECTED_PET_ID) || pets[0].id;
      let modifiedPets = [...pets];

      if (selectedPetID) {
        // Find the selected pet and remove it from the array
        let selectedPet = modifiedPets.find(pet => pet.id == selectedPetID);
        modifiedPets = modifiedPets.filter((pet) => pet.id != selectedPet.id);
      }
      return modifiedPets;
    }));
  }

  goToCart() {
    this.router.navigate(['/shop/cart']);
  }

  changePet(petId: number, petTypeId: number) {
    this.petService.setPet(petId = petId, petTypeId = petTypeId);
    this.router.navigate(['/shop', 'products']).then(() => {
      location.reload();
    });
  }

}
