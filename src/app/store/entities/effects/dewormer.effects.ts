import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { SharedService } from 'src/app/modules/shared/shared.service';
import * as dewormerActions from '../actions/dewormer.actions'
import { DewormerService } from '../services/dewormer.service';



@Injectable()
export class DewormerEffects {


  constructor(
    private actions$: Actions,
    private dewormerService: DewormerService,
    private sharedService: SharedService
    ) {}

  addDewormer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(dewormerActions.addDewormer),
      switchMap(({ petID }) =>
        this.dewormerService.getDewormer(petID).pipe(
          map(data => dewormerActions.addDewormerSuccess({ dewormer: data })),
          catchError(error => {
            this.sharedService.sendAlert('error', 'Error', error.error.error.message);
            return of(dewormerActions.failure({ error }))
          }))
      ),
    );
  });

  upsertDewormerCard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(dewormerActions.upsertDewormer),
      switchMap(({ petID }) =>
        this.dewormerService.getDewormer(petID).pipe(
          map(data => dewormerActions.upsertDewormerSuccess({ dewormer: data })),
          catchError(error => {
            this.sharedService.sendAlert('error', 'Error', error.error.error.message);
            return of(dewormerActions.failure({ error }))
          }))
      ),
    );
  });

  updateDewormersApplied$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(dewormerActions.updateDewormersApplied),
      switchMap(({ id, vaccineID, remove, productId, cedula, date, vaccine_card_id }) =>
        this.dewormerService.updateDewormerVaccine(id, vaccineID, remove, productId, cedula, date, vaccine_card_id).pipe(
          switchMap(data => [
            // vaccineCardActions.updateAppliedVaccinesSuccess({ pet: data }),
            dewormerActions.upsertDewormer({ petID: id })
          ]),
          catchError(error => of(dewormerActions.failure({ error }))))
      ),
    );
  });
}
