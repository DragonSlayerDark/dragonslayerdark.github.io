import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromPets from '../actions/pet.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { PetService } from '../services/pet.service';
import { EntityStrapi } from '../strapi_payload_entity';
import { Pet } from '../models/pet.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { SharedService } from 'src/app/modules/shared/shared.service';
import Swal from 'sweetalert2';
import { AppService } from '../../custom/services/app.service';



@Injectable()
export class PetEffects {


  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private petService: PetService,
    private router: Router,
    private shared: SharedService,
  ) { }

  loadPets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPets.loadPets),
      switchMap(({userID}) =>
        this.petService.getPets(userID).pipe(
          map(x => fromPets.loadPetsSuccess({ pets: x.data as EntityStrapi<Pet>[] }))
        )
      )
    )
  )

  insertPet$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromPets.addPet),
      switchMap(({pet, img}) =>
        this.petService.insertPet(pet, img).pipe(
          map(x => fromPets.addPetSuccess({ pet: x.data as EntityStrapi<Pet> })),
          tap(() => {
            this.router.navigate(['home']);
            this.shared.sendAlert('success', 'Mascota agregada', 'Su mascota ha sido agregada de forma exitosa');
          })
        )
      ),
    );
  });


  updatePet$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromPets.updatePet),
      switchMap(({pet, img}) =>
        this.petService.updatePet(pet, img).pipe(
          map(x => fromPets.updatePetSuccess({ pet: x.data as EntityStrapi<Pet> })),
          tap(() => {
            this.shared.sendAlert('success', 'Mascota modificada', 'Su mascota ha sido modificada de forma exitosa');
            let route = (this.router.url).replace(/\d+/g, '');
            if (route === '/my-pets/delete-pet/'){
              window.location.reload();
            } else if (route === '/my-pets/edit-pet/'){
              this.router.navigate(['/my-pets', pet.id]).then(() => {
                window.location.reload();
              })
            }

          })
          )
      ),
    );
  });

  deletePet$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromPets.deletePet),
      switchMap(({ id }) =>
        this.petService.deletePet(id).pipe(
          switchMap(x => {
            return [
              fromPets.deletePetSuccess({ pet: x.data as EntityStrapi<Pet> }),
            ]
          }),tap(() => {
            localStorage.removeItem('selectedPetID');
            localStorage.removeItem('selectedPetTypeID');
            this.router.navigate(['/profile', 'petslist']);
            const Swal3=  Swal.mixin({
              customClass: {
                container: 'swalcontainer',
                popup: 'swalpopup',
                title: 'swaltitle',
                confirmButton: 'swalbutton swalaccept',
                cancelButton: 'swalbutton swalcnl',

              },
              buttonsStyling: false
            })
            Swal3.fire(
              'Mascota eliminada', 'Su mascota ha sido eliminada, por favor seleccione otra mascota activa'
            )
          })
        )
      ),
    );
  });


}


