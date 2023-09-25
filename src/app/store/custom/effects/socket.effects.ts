import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, tap } from 'rxjs';
import { socketEmit } from '../actions/socket.actions';
import { SocketService } from '../services/socket.service';

@Injectable({
  providedIn: 'root'
})
export class SocketEffects {

  constructor(
    private socket: SocketService,
    private actions$: Actions
  ) { }

  socketEmit$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(socketEmit),
      tap(({ payload, room }) => {
        console.log("EMMITED", payload, room);
        this.socket.emit(payload, room);
      })
    )
  }, {
    dispatch: false
  });
}
