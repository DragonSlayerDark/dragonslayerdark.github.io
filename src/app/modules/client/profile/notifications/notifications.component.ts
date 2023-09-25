import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import { AuthService } from '../../../../auth_services/store/auth.service';
import { loadNotification } from 'src/app/store/entities/actions/notification.actions';
import { selectAllNotification } from 'src/app/store/entities/selectors/notification.selectors';
import { Observable, map } from 'rxjs';
import { Notification } from 'src/app/store/entities/models/notification.model';
import { EntityStrapi } from 'src/app/store/entities/strapi_payload_entity';
import { AppService } from 'src/app/store/custom/services/app.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  public notifications$ : Observable<EntityStrapi<Notification>[]>;

  constructor(
    private store: Store<AppState>,
    private auth: AuthService,
    private App: AppService
  ) { 
  }

  ngOnInit(): void {
    this.store.dispatch( loadNotification({ id: this.auth.getUser().id }) );
    console.log(this.notifications$);
    this.notifications$ = this.store.pipe(select(selectAllNotification));
    this.App.onActivate();

  }

}
