import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SharedService } from '../../../modules/shared/shared.service';
import { NotificacionPushService } from '../services/push-notification.service';
import * as actions from '../actions/push-notifications.actions';
import { map, catchError, of, switchMap, tap } from 'rxjs';
import { EntityStrapi } from '../../entities/strapi_payload_entity';
import { PushNotification } from '../models/push_notification.model';


@Injectable()
export class usuarioEffects {

    constructor(
        private actions$: Actions,
        private shared: SharedService,
        private notificacionPushService: NotificacionPushService
    ) {}

    createDeviceToken$ = createEffect(() =>  
        this.actions$.pipe(
            ofType( actions.addToken ),
            switchMap(({devicePushNotifications}) => 
                this.notificacionPushService.saveToken(devicePushNotifications).pipe(
                    map( x => actions.addTokenSuccess({ devicePushNotifications: x.data as EntityStrapi<PushNotification> }) ),
                    tap(()=> {
                        // this.shared.sendAlert('success', 'Notificaciones', 'Se Enviaran notificaciones de forma exitosa');
                    }),
                    catchError(err => of(actions.addTokenError({ payload: err })) )
                )
            )
        )
    );
}