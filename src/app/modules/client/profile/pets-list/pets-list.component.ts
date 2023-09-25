import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/auth_services/store/auth.service';
import { loadPets } from 'src/app/store/entities/actions/pet.actions';
import { selectAllPets } from 'src/app/store/entities/selectors/pet.selectors';
import { AppState } from 'src/app/store/app.state';
import { filter, map, Observable } from 'rxjs';
import { EntityStrapi } from 'src/app/store/entities/strapi_payload_entity';
import { Pet } from 'src/app/store/entities/models/pet.model';
import { Router } from '@angular/router';
import { PetService } from 'src/app/store/entities/services/pet.service';
import { AppService } from '../../../../store/custom/services/app.service';

@Component({
  selector: 'app-pets-list',
  templateUrl: './pets-list.component.html',
  styleUrls: ['./pets-list.component.scss']
})
export class PetsListComponent implements OnInit, OnDestroy {

  pets$: Observable<EntityStrapi<Pet>[]>

  constructor(
    private store: Store<AppState>,
    private auth: AuthService,
    private petService: PetService,
    private router: Router,
    private App: AppService
    )
  {
    this.pets$ = this.store.select(selectAllPets);
    this.auth.checkPetId();
   }


  ngOnDestroy(): void {
  }
  ngOnInit(): void {
    this.store.dispatch(loadPets({
      userID: this.auth.getUser().id
    }));

    this.App.onActivate();


  }

  selectPet(petId: number, petTypeId: number){
    this.petService.setPet(petId = petId, petTypeId = petTypeId);
    this.router.navigate(['/my-pets', 'list', petId]);
    this.ngOnInit();
  }



}
