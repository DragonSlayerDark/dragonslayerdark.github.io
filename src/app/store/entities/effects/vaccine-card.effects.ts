import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { SharedService } from 'src/app/modules/shared/shared.service';
import { VaccineCardService } from '../../custom/services/vaccine-card.service';
import * as vaccineCardActions from '../actions/vaccine-card.actions';

@Injectable({
  providedIn: 'root'
})
export class VaccineCardEffects {

  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private vaccineCardService: VaccineCardService,
    private sharedService: SharedService
  ) { }

  addVaccineCard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(vaccineCardActions.addVaccineCard),
      switchMap(({ petID }) =>
        this.vaccineCardService.getVaccineCard(petID).pipe(
          map(data => vaccineCardActions.addVaccineCardSuccess({ vaccineCard: data })),
          catchError(error => {
            this.sharedService.sendAlert('error', 'Error', error.error.error.message);
            return of(vaccineCardActions.failure({ error }))
          }))
      ),
    );
  });

  upsertVaccineCard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(vaccineCardActions.upsertVaccineCard),
      switchMap(({ petID }) =>
        this.vaccineCardService.getVaccineCard(petID).pipe(
          map(data => vaccineCardActions.upsertVaccineCardSuccess({ vaccineCard: data })),
          catchError(error => {
            this.sharedService.sendAlert('error', 'Error', error.error.error.message);
            return of(vaccineCardActions.failure({ error }))
          }))
      ),
    );
  });

  updateVaccinesApplied$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(vaccineCardActions.updateVaccinesApplied),
      switchMap(({ id, vaccineID, remove, productId, cedula, date, vaccine_card_id }) =>
        this.vaccineCardService.updateAppliedVaccine(id, vaccineID, remove, productId, cedula, date, vaccine_card_id).pipe(
          switchMap(data => [
            // vaccineCardActions.updateAppliedVaccinesSuccess({ pet: data }),
            vaccineCardActions.upsertVaccineCard({ petID: id })
          ]),
          catchError(error => of(vaccineCardActions.failure({ error }))))
      ),
    );
  });

}
