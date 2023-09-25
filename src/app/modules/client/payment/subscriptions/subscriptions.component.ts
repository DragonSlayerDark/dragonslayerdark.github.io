import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth_services/store/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {

  userID: string = this.auth.getId().toString();
  projectID = environment.projectID;
  
  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }

}
