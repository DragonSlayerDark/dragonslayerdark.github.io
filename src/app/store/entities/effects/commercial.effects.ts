import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap} from 'rxjs'
import * as fromCommercials from '../actions/commercial.actions';
import { Commercial } from '../models/commercial.model';
import { CommercialService } from '../services/commercial.service';
import { ProductService } from '../services/product.service';
import { EntityStrapi } from '../strapi_payload_entity';



@Injectable()
export class CommercialEffects {


  constructor(
    private actions$: Actions,
    private commercialService: CommercialService
    ) {}


  loadCommercials$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCommercials.loadCommercials),
      switchMap(() => {
        return this.commercialService.getCommercials().pipe(
          map((x) => {
            return fromCommercials.loadCommercialsSuccess({ commercials: x.data as EntityStrapi<Commercial>[] });
          })
        )
      })
    )
  );
}
