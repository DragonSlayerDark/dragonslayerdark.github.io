import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs'
import * as fromNotifications from '../actions/notification.actions'
import { Notification } from '../models/notification.model';
import { NotificationService } from '../services/notification.service';
import { EntityStrapi } from '../strapi_payload_entity';



@Injectable()
export class NotificationEffects {

  loadNotifications$ = createEffect(() =>
    this.actions$.pipe(
      ofType( fromNotifications.loadNotification ),
      switchMap(({ id }) => 
        this.notificationService.getNotifications(id).pipe(
          map(data => fromNotifications.loadNotificationSuccess({ notification: data.data })),
          catchError(err => of( fromNotifications.loadNotificationError({ payload: err })) )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private notificationService: NotificationService
    ) {}
}
