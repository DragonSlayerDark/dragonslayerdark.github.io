import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth_services/store/auth.service';
import { environment } from 'src/environments/environment';
import { AppService } from '../../../../../store/custom/services/app.service';

@Component({
  selector: 'app-list-payment',
  templateUrl: './list-payment.component.html',
  styleUrls: ['./list-payment.component.scss']
})
export class ListPaymentComponent implements OnInit {
  userID = this.auth.getId().toString();
  projectID = environment.projectID;
  orderID = '';
  email = this.auth.getEmail();
  flag = JSON.parse(localStorage.getItem('cardsFlag'));

  constructor(
    private auth:AuthService,
    private App: AppService,
     )
  { }

  ngOnInit(): void {
    //El componente tarda en cargar las tarjetas, por lo tanto reviso despues de cargado el componente
    setTimeout(() => this.checkFlag(), 1000);
    this.App.onActivate();
  }

  checkFlag(){
    let element = document.getElementById('myElement');
    let count = element.childElementCount;
    if(count === 0){
      localStorage.setItem('cardsFlag', 'false');
      return location.reload();
    }else {
      return localStorage.setItem('cardsFlag', 'true');
    }
  }

}
