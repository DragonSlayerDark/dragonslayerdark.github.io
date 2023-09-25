import { ApplicationRef, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ScannedActionsSubject, Store } from '@ngrx/store';
import { filter, map, Subscription } from 'rxjs';
import { login } from 'src/app/auth_services/store/auth.actions';
import { AppState } from 'src/app/store/app.state';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  subs: Subscription[] = [];
  loginError: boolean = false;
  loading!: boolean;
  bandera: boolean = JSON.parse(localStorage.getItem('primeraVez'));

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private shared: SharedService,
    private ref: ChangeDetectorRef,
    actions$: ScannedActionsSubject
  ) {
    this.form = this.fb.group({
      correo: new FormControl(localStorage.getItem('correo'), [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });

    actions$.pipe(
      filter(action => action.type === '[Auth] Login Failure'),
    ).subscribe(action => this.loginError = true);
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
    setTimeout(() => this.banderaToggle(), 6000);

  }
//necesita testing
  // banderaToggle() {
  //   return new Promise<void>((resolve, reject) => {
  //     localStorage.clear();
  //     resolve();
  //   })
  //     .then(() => {
  //       if (this.bandera === false || this.bandera === null) {
  //         localStorage.setItem('primeraVez', JSON.stringify(true));
  //         this.bandera = JSON.parse(localStorage.getItem('primeraVez'));
  //         console.log(this.bandera);
  //         return this.ref.detectChanges();
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('An error occurred:', error);
  //     });
  // }

  banderaToggle() {
    if (this.bandera === false || this.bandera === null) {
      localStorage.setItem('primeraVez', JSON.stringify(true));
      this.bandera = JSON.parse(localStorage.getItem('primeraVez'));
      console.log(this.bandera);
      return this.ref.detectChanges()
    }
  }

  enviar() {
    if (this.form.invalid) {
      return this.shared.sendAlert('warning', 'Formulario inválido', 'Por favor llene los campos');
    }
    localStorage.setItem('correo', this.form.value.correo);
    this.store.dispatch(login({
      email: this.form.value.correo,
      password: this.form.value.password
    }));
  }

}
