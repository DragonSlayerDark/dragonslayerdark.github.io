import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { backUpAccount, deleteAccount } from 'src/app/auth_services/store/auth.actions';
import { SharedService } from 'src/app/modules/shared/shared.service';
import { AppState } from 'src/app/store/app.state';
import Swal from 'sweetalert2';
import { AppService } from '../../../../store/custom/services/app.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  user = localStorage.getItem('usuario');
  userObj = JSON.parse(this.user)

  constructor(
    private shared: SharedService,
    private store: Store<AppState>,
    private App: AppService
  ) { }

  ngOnInit(): void {
    console.log(this.userObj);
    this.App.onActivate();
  }


  eliminarCuenta(){
    this.shared.sendConfirmation('warning', 'Peligro', 'Esta apunto de eliminar su cuenta, esta accion no puede ser revertida').then((res) => {
      if(res.isConfirmed){
        this.store.dispatch(backUpAccount({usuario: {
          username: this.userObj.username,
          provider: this.userObj.provider,
          email: this.userObj.email,
          firstName: this.userObj.firstname,
          lastName: this.userObj.lastName,
          secondLastName: this.userObj.secondLastName
        }}));
        this.store.dispatch(deleteAccount());
      }else if(res.dismiss || res.isDenied){
        const Swal3=  Swal.mixin({
          customClass: {
            container: 'swalcontainer',
            popup: 'swalpopup',
            title: 'swaltitle',
            confirmButton: 'swalbutton swalaccept',
            cancelButton: 'swalbutton swalcnl',

          },
          buttonsStyling: false
        })

        Swal3.fire(
          'Eliminar Cancelado'
        );
      }
    });
  }
}
