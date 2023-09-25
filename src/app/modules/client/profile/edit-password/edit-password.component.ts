import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from 'src/app/auth_services/model/user.model';
import { actualizarUser } from 'src/app/auth_services/store/auth.actions';
import { AuthService } from 'src/app/auth_services/store/auth.service';
import { SharedService } from 'src/app/modules/shared/shared.service';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss']
})
export class EditPasswordComponent implements OnInit {

  form: FormGroup;
  user: User;

  constructor(
    private auth:AuthService,
    private fb: FormBuilder,
    private store: Store<AppState>,
    private shared: SharedService
  ) {
    let user = this.auth.getUser(true);
    this.form = this.fb.group({
      firstName: new FormControl(user.firstName),
      lastName: new FormControl(user.lastName),
      secondLastName: new FormControl(user.secondLastName),
      email: new FormControl(user.email),
      password: new FormControl('', [Validators.required]),
      passwordConfirm: new FormControl('', [Validators.required])
    })
   }

  ngOnInit(): void {
    this.user = this.auth.getUser();
  }

  submit() {

    let password = (<HTMLInputElement>document.getElementById("password")).value.length;
    let passwordConfirm = (<HTMLInputElement>document.getElementById("passwordConfirm")).value.length;

    console.log("ONSUBMIT", this.form.value);
    if (this.form.invalid) {
      return this.shared.sendAlert('warning', 'Formulario Invalido', 'Por favor, verifica que hayas llenado los campos correctamente');
    }
    if (this.form.value.password !== '') {//checks if password has something
      if (password < 6 || passwordConfirm < 6) {
        return this.shared.sendAlert('warning', 'Contraseña Invalida', 'Su contraseña debe tener al menos 6 caracteres');//checks if password has at leas  6 characters
      }
      if (this.form.value.passwordConfirm !== this.form.value.password) {//checks if password and password confirmation are equal
        return this.shared.sendAlert('warning', 'Error', 'Las contraseñas no coinciden');
      }
    }
    let user = { ...this.form.value }
    this.store.dispatch(actualizarUser({ usuario: user }));
  }

}
