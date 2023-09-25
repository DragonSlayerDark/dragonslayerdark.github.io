import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PushNotificationPayload } from '../models/push_notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificacionPushService {
  url = environment.server

  constructor(
    private http: HttpClient
  ) { }

  saveToken(token) {
    const formData = new FormData();
    formData.append('data', JSON.stringify({
      ...token
    }));
    console.log('formData=> ', formData);
    return this.http.post<PushNotificationPayload>(environment.server + `/api/user-notification-keys`,formData);
  }
}
