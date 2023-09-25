import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import * as fromCategory from 'src/app/store/entities/reducers/category.reducer';
import * as fromSubCategory from 'src/app/store/entities/reducers/sub-category.reducer';
import * as fromProduct from 'src/app/store/entities/reducers/product.reducer';
import * as fromCart from 'src/app/store/custom/reducers/cart.reducer';
import * as fromPet from 'src/app/store/entities/reducers/pet.reducer';
import * as fromPetBreed from 'src/app/store/entities/reducers/pet-breed.reducer';
import * as fromUsers from 'src/app/store/entities/reducers/user.reducer';
import * as fromPetTypes from './entities/reducers/pet-type.reducer';
import * as fromOrders from 'src/app/store/entities/reducers/order.reducer';
import * as fromVaccineCards from './entities/reducers/vaccine-card.reducer';
import * as fromDewormers from './entities/reducers/dewormer.reducer'
import * as fromCommercials from './entities/reducers/commercial.reducer';
import * as fromMemorials from './entities/reducers/memorial.reducer'
import * as fromPushNotification from './custom/reducers/push-notification.reducer';
import * as fromNotification from './entities/reducers/notification.reducer';
import { CategoryEffects } from './entities/effects/category.effects';
import { SubCategoryEffects } from './entities/effects/sub-category.effects';
import { ProductEffects } from './entities/effects/product.effects';
import { CartEffects } from './custom/effects/cart.effects';
import { PetEffects } from './entities/effects/pet.effects';
import { PetBreedEffects } from './entities/effects/pet-breed.effects';
import { PanelEffects } from './entities/effects/panel.effects';
import { AuthJSStrapi } from '../auth_services/auth';
import { SocketEffects } from './custom/effects/socket.effects';
import { PetTypeEffects } from './entities/effects/pet-type.effects';
import { VaccineCardEffects } from './entities/effects/vaccine-card.effects';
import { CommercialEffects } from './entities/effects/commercial.effects';
import { MemorialEffects } from './entities/effects/memorial.effects';
import * as fromAddress from './entities/reducers/address.reducer';
import { AddressEffects } from './custom/effects/address.effects';
import * as fromPawl from './custom/reducers/pawl.reducer';
import { AuthState } from '../auth_services/store/auth.reducer';
import { dewormersFeatureKey, State } from './entities/reducers/dewormer.reducer';
import { DewormerEffects } from './entities/effects/dewormer.effects';
import { usuarioEffects } from './custom/effects/usuario.effects';
import { NotificationEffects } from './entities/effects/notification.effects';

export interface AppState {
  router: fromRouter.RouterReducerState;
  [fromCategory.categoriesFeatureKey]: fromCategory.State;
  [fromSubCategory.subCategoriesFeatureKey]: fromSubCategory.State;
  [fromProduct.productsFeatureKey]: fromProduct.State;
  [fromCart.cartFeatureKey]: fromCart.State;
  [fromPet.petsFeatureKey]: fromPet.State;
  [fromPetBreed.petBreedsFeatureKey]: fromPetBreed.State;
  [fromPetTypes.petTypesFeatureKey]: fromPetTypes.State;
  [fromUsers.usersFeatureKey]: fromUsers.State;
  [fromOrders.ordersFeatureKey]: fromOrders.State;
  [fromVaccineCards.vaccineCardsFeatureKey]: fromVaccineCards.State;
  [fromDewormers.dewormersFeatureKey]: fromDewormers.State
  [fromCommercials.commercialsFeatureKey]: fromCommercials.State;
  [fromMemorials.memorialsFeatureKey]: fromMemorials.State;
  [fromAddress.addressesFeatureKey]: fromAddress.State;
  ['auth']: AuthJSStrapi;
  ['authReducer']: AuthState
  [fromPawl.pawlFeatureKey]: fromPawl.State;
  [fromPushNotification.pushNotificationFeatureKey]: fromPushNotification.State;
  [fromNotification.notificationFeatureKey]: fromNotification.State;
}

export const reducers: ActionReducerMap<AppState> = {
  router: fromRouter.routerReducer,
  products: fromProduct.reducer,
  categories: fromCategory.reducer,
  subCategories: fromSubCategory.reducer,
  cart: fromCart.reducer,
  pets: fromPet.reducer,
  petBreeds: fromPetBreed.reducer,
  users: fromUsers.reducer,
  orders: fromOrders.reducer,
  auth: AuthJSStrapi.AuthReducer,
  petTypes: fromPetTypes.reducer,
  vaccineCards: fromVaccineCards.reducer,
  dewormers: fromDewormers.reducer,
  commercials: fromCommercials.reducer,
  memorials: fromMemorials.reducer,
  addresses: fromAddress.reducer,
  pawl: fromPawl.reducer,
  authReducer: AuthJSStrapi.AuthReducer,
  devicePushNotifications: fromPushNotification.reducer,
  notifications: fromNotification.reducer
};

export const EFFECTS = [
  ProductEffects,
  CategoryEffects,
  SubCategoryEffects,
  CartEffects,
  PetEffects,
  PetBreedEffects,
  PanelEffects,
  AuthJSStrapi.AuthEffect,
  SocketEffects,
  PetTypeEffects,
  VaccineCardEffects,
  DewormerEffects,
  CommercialEffects,
  MemorialEffects,
  AddressEffects,
  usuarioEffects,
  NotificationEffects
];
