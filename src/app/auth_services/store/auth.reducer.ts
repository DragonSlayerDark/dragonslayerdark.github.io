import { createReducer, on } from '@ngrx/store';
import { User } from '../model/user.model';
import * as auth from './auth.actions';


export interface AuthState {
  token: string | null;
  usuario: User | null;
  cargando: boolean;
  error: any;
  friends: User[] | null;
};

const initialState: AuthState = {
  token: null,
  usuario: null,
  cargando: false,
  error: null,
  friends: [],

};

export const authreducer = createReducer(
  initialState,
  on(auth.login, (state) => ({
    ...state,
    cargando: true,
    error: null,
  })),
  on(auth.loginSuccess, (state, { jwt }) => ({
    ...state,
    cargando: false,
    token: jwt,
    // usuario: { ...usuario, role: { ...usuario.role } }
  })),
  on(auth.loginFailure, (state, { error }) => ({
    ...state,
    cargando: false,
    error: { ...error }
  })),
  on(auth.cerrarSesion, (state) => ({
    ...initialState
  })),
  on(auth.llenarSesion, (state, { usuario }) => ({
    ...state,
    usuario: { ...usuario }
  })),
  on(auth.getMe, (state) => ({
    ...state,
    error: null,
    // cargando: true
  })),
  on(auth.getMeSuccess, (state, { usuario }) => ({
    ...state,
    // cargando: false,
    usuario: { ...usuario }
  })),
  on(auth.actualizarUser, (state) => ({
    ...state,
    cargando: true,
    error: null
  })),
  on(auth.actualizarUserSuccess, (state, { usuario }) => ({
    ...state,
    cargando: false,
    usuario: { ...usuario },
    error: null
  })),
  on(auth.actualizarUserFailure, (state, { error }) => ({
    ...state,
    cargando: false,
    error: { ...error }
  })),
  on(auth.getMeFailure, (state, { error }) => ({
    ...state,
    // cargando: false,
    usuario: null,
    error: { ...error }
  })),
  on(auth.getRecoveryToken, (state) => ({
    ...state,
    cargando: true,
    error: null
  })),
  on(auth.getRecoveryTokenSuccess, (state) => ({
    ...state,
    cargando: false,
    error: null
  })),
  on(auth.getRecoveryTokenFailure, (state, { error }) => ({
    ...state,
    cargando: false,
    error: { ...error }
  })),
  on(auth.passwordRecovery, (state) => ({
    ...state,
    cargando: true,
    error: null
  })),
  on(auth.passwordRecoverySuccess, (state) => ({
    ...state,
    cargando: false,
    error: null
  })),
  on(auth.passwordRecoveryFailure, (state, { error }) => ({
    ...state,
    cargando: false,
    error: { ...error }
  })),
  on(auth.getFriendsSuccess, (state, { usuarios }) => ({
    ...state,
    cargando: false,
    friends: [...usuarios],
    error: null
  })),
  on(auth.getFriendsFailure, (state, { error }) => ({
    ...state,
    cargando: false,
    friends: null,
    error: { ...error }
  })),
  on(auth.deleteAccount, (state => ({
    ...state,
    cargando: true,
    error: null
  }))),
  on(auth.deleteAccountSuccess, (state) => ({
    ...state,
    cargando: false,
    error: null
  })),
  on(auth.backUpAccount, (state => ({
    ...state,
    cargando: true,
    error: null
  }))),
  on(auth.backUpAccountSuccess, (state, {usuario}) => ({
    ...state,
    cargando:false,
    error: null,
    backup: {...usuario}
  })),
);
