import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { selectUrl } from 'src/app/store/router/router.selector';
import { SwPush } from '@angular/service-worker';
import { addToken } from 'src/app/store/custom/actions/push-notifications.actions';
import { AuthService } from 'src/app/auth_services/store/auth.service';
import { environment } from 'src/environments/environment';
import { loadNotification } from 'src/app/store/entities/actions/notification.actions';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  route: Observable<string>;
  readonly VAPID_PUBLIC_KEY = 'BP3PXmOpJRum6yBC1Rzqor2bfnWGo4wGMSr0c51wrzH1HCM9clz1c6MvyrCVLIL3kToLmf_YzU2zLIY4Gde1tCw';


  constructor(
    private store: Store<AppState>,
    private swPush: SwPush,
    private auth: AuthService,

  ) {
    this.route = this.store.pipe(select(selectUrl)).pipe(filter((x) => !!x), map((x) => {
      // remove the leading slash, and the rest after the second slash
      return x.split('/')[1].split('/')[0];
    }));
  }

  ngOnInit(): void {
    if ( navigator.serviceWorker ) {
      console.log(navigator.serviceWorker);
      this.subscribeNotifications();
      // this.notificar();
    }
  }

  notificar() {
    if (!('serviceWorker' in navigator)) {
      throw new Error('No Service Worker support!')
    }
    if (!('PushManager' in window)) {
      throw new Error('No Push API Support!')
    }
    if ( !window.Notification ) {
      console.log('este navegador no soporta notificaciones');
      return;
    }

    if ( Notification.permission === 'granted' )  {
      new Notification('Hola Mundo - granted');
    } else if ( Notification.permission !== 'denied' ) {
      Notification.requestPermission((permission) => {
        // console.log(permission);
        if ( permission === 'granted' ) {
          this.subscribeNotifications();
          new Notification('Hola Mundo - pregunta');
        }
      });
    }
  }

  subscribeNotifications(): any {
    // console.log('isEnabled =>', this.swPush.isEnabled);
    this.swPush.requestSubscription({serverPublicKey: this.VAPID_PUBLIC_KEY})
    .then(sub => {
      const token = JSON.parse(JSON.stringify(sub));
      this.store.dispatch(addToken({
        devicePushNotifications: {
          users_permissions_user: this.auth.getUser().id,
          subscription: sub
        }
      }));
      // console.log('Token => ', token);
      // console.log('pase', sub);
      // this.notificar();
    }).catch(err => console.error('uy :( ', err));

    this.swPush.messages.subscribe((data: any) => {
      // console.log('data => ', data);
      const title = 'Pawl';
      const options = {
        body: data.message,
        icon: 'assets/logo.png',
        image: `${environment.server}${data.Metadata.photo || undefined}`,
        badge: 'assets/logo.png',
        vibrate: [75,75,75,75,75,75,75,75,150,150,150,450,75,75,75,75,75,525],
        openUrl: '/',
        data: {
          url: 'https://google.com',
          id: data.user_id
        }
      };
      // console.log('options => ', options);
      let notification = new Notification( `${title}` , options );
      this.store.dispatch( loadNotification({ id: this.auth.getUser().id }) );
      notification.onclick = function(event) {
        event.preventDefault(); // prevent the browser from focusing the Notification's tab
        window.open('https://mypawl.web.app/#/home', '_blank');
      }
      // new Notification(data.message);
    })
  }

}
