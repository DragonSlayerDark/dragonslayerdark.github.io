import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import * as petTypesActions from '../actions/pet-type.actions';
import { PetTypeService } from '../services/pet-type.service';

@Injectable({
  providedIn: 'root'
})
export class PetTypeEffects {

  loadPetTypes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(petTypesActions.loadPetTypes),
      switchMap(() =>
        this.petTypeService.getTypes().pipe(
          map(data => petTypesActions.loadPetTypesSuccess({ petTypes: data })),
          catchError(error => of(petTypesActions.failure({ error }))))
      ),
    );
  });

  constructor(
    private petTypeService: PetTypeService,
    private actions$: Actions
  ) { }
}
