import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth_services/store/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  showAddressList: boolean = false;
  showPaymentMethodsList: boolean = false;
  showOrdersList: boolean = false;
  showSettingsList: boolean = false;
  showPetlis:boolean = false;
  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }


  cerrarSesion(){
    this.auth.logout();
  }
}
