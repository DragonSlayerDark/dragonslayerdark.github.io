import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from 'src/app/auth_services/model/user.model';
import { actualizarUser } from 'src/app/auth_services/store/auth.actions';
import { AuthService } from 'src/app/auth_services/store/auth.service';
import { SharedService } from 'src/app/modules/shared/shared.service';
import { AppState } from 'src/app/store/app.state';
import { AppService } from '../../../../store/custom/services/app.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  form: FormGroup;
  user: User;
  imageInput: File;
  localImg: string | ArrayBuffer;


  constructor(

    private auth:AuthService,
    private store: Store<AppState>,
    private fb: FormBuilder,
    private shared: SharedService,
    private App: AppService

  ) {
    let user = this.auth.getUser(true);
    this.form = this.fb.group({
      firstName: new FormControl(user.firstName),
      lastName: new FormControl(user.lastName),
      secondLastName: new FormControl(user.secondLastName),
      email: new FormControl(user.email),
      //falta hacer el update de imagen

    })


   }

  ngOnInit(): void {
    this.user = this.auth.getUser();
    this.App.onActivate();

  }

  submit() {



    console.log("ONSUBMIT", this.form.value);
    if(this.form.invalid){
      return this.shared.sendAlert('warning', 'Formulario Invalido', 'Por favor, verifica que hayas llenado los campos correctamente');
    }

    let user = {...this.form.value}
    this.store.dispatch(actualizarUser({ usuario: user}));
  }



}
