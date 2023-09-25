import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ScannedActionsSubject, Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { login, registrar } from 'src/app/auth_services/store/auth.actions';
import { AppState } from 'src/app/store/app.state';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  subs: Subscription[] = [];
  registerError: boolean = false;
  loading!: boolean;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private shared: SharedService,
    actions$: ScannedActionsSubject
  ) {
    this.form = this.fb.group({
      correo: new FormControl(localStorage.getItem('correo'), [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      passwordConfirm: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      secondLastName: new FormControl('')
    });

    actions$.pipe(
      filter(action => action.type === '[Auth] Registrar Failure'),
    ).subscribe(action => this.registerError = true);
    this.store.select('authReducer').subscribe(data => this.loading = data.cargando)
  }

  ngOnInit(): void {
    // this.subs[0] = this.store.select('auth').pipe(map((x) => x.error)).subscribe(async (x) => {
    //   if (x) {
    //     let errorMensaje;

    //     switch (x.status) {
    //       case 400:
    //         errorMensaje = 'Correo o contraseña incorrectos';
    //         break;
    //       default:
    //         errorMensaje = x.error.message || (x.error.message && x.error.message[0]?.messages[0]?.message);
    //         break;
    //     }
    //     // this.shared.enviarAlerta('error', 'Error', errorMensaje);
    //   }
    // });
  }

  enviar() {
    let password = (<HTMLInputElement>document.getElementById("password")).value.length;
    let passwordConfirm = (<HTMLInputElement>document.getElementById("passwordConfirm")).value.length;

    if (this.form.invalid) {
      return this.shared.sendAlert('warning', 'Formulario Invalido', 'Por favor, verifica que hayas llenado los campos correctamente');
    }
    if (password < 6 || passwordConfirm < 6) {
        return this.shared.sendAlert('warning', 'Contraseña Invalida', 'Su contraseña debe tener al menos 6 caracteres');//checks if password has at leas  6 characters
    }
    if (this.form.value.passwordConfirm !== this.form.value.password) {//checks if password and password confirmation are equal
        return this.shared.sendAlert('warning', 'Error', 'Las contraseñas no coinciden');
    }
    localStorage.setItem('correo', this.form.value.correo);
    this.store.dispatch(registrar({
      email: this.form.value.correo,
      password: this.form.value.password,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      secondLastName: this.form.value.secondLastName
    }));
  }

}
