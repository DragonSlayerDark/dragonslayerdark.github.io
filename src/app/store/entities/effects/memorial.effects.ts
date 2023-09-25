import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {map, switchMap} from 'rxjs'
import * as fromMemorials from '../actions/memorial.actions'
import { Memorial } from '../models/memorial.model';
import { MemorialService } from '../services/memorial.service';
import { EntityStrapi } from '../strapi_payload_entity';



@Injectable()
export class MemorialEffects {


  constructor(
    private actions$: Actions,
    private memorialService: MemorialService
    ) {}


  loadMemorials$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromMemorials.loadMemorials),
      switchMap(() => {
        return this.memorialService.getMemorials().pipe(
          map((x) => {
            return fromMemorials.loadMemorialsSuccess({ memorials: x.data as EntityStrapi<Memorial>[] });
          })
        )
      })
    )
  );
}
