import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PetBreedService } from '../services/pet-breed.service';
import * as fromPetBreeds from '../actions/pet-breed.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { EntityStrapi } from '../strapi_payload_entity';
import { PetBreed } from '../models/pet-breed.model';



@Injectable()
export class PetBreedEffects {


  constructor(
    private actions$: Actions,
    private petBreedService: PetBreedService
    ) {}

    loadPetBreeds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPetBreeds.loadPetBreeds),
      switchMap(({ pet_type_id }) =>
        this.petBreedService.getBreeds(pet_type_id).pipe(
            map(x => fromPetBreeds.loadPetBreedsSuccess({ petBreeds:  x.data as EntityStrapi<PetBreed>[] })),
          )
        ),
      )
    );

}
