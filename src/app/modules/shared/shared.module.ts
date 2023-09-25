import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { PetsComponent } from './pets/pets.component';
import { InfoHomeComponent } from './info-home/info-home.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { HeaderShopComponent } from './header/header-shop/header-shop.component';
import { HeaderProfileComponent } from './header/header-profile/header-profile.component';
import { HeaderPetsComponent } from './header/header-pets/header-pets.component';
import { VaccineCardComponent } from './vaccine-card/vaccine-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ImagePipe } from './pipes/image.pipe';
import { PetSizePipe } from './pipes/pet-size.pipe';
import { SharedService } from './shared.service';
import { PetGenderPipe } from './pipes/pet-gender.pipe';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { LoadingComponent } from './loading/loading.component';
import { CardPrefixPipe } from './pipes/card-prefix.pipe';
import { AdvertisingComponent } from './advertising/advertising.component';
import { DewormerComponent } from './dewormer/dewormer.component';
import { MatExpansionModule } from '@angular/material/expansion';



@NgModule({
  declarations: [
    FooterComponent,
    PetsComponent,
    InfoHomeComponent,
    HeaderComponent,
    HeaderShopComponent,
    HeaderProfileComponent,
    HeaderPetsComponent,
    VaccineCardComponent,
    ImagePipe,
    PetSizePipe,
    PetGenderPipe,
    OrdersListComponent,
    LoadingComponent,
    CardPrefixPipe,
    AdvertisingComponent,
    DewormerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    MatExpansionModule
  ],
  exports: [
    FooterComponent,
    PetsComponent,
    InfoHomeComponent,
    HeaderComponent,
    VaccineCardComponent,
    FontAwesomeModule,
    ImagePipe,
    PetSizePipe,
    PetGenderPipe,
    OrdersListComponent,
    LoadingComponent,
    CardPrefixPipe,
    AdvertisingComponent,
    DewormerComponent
  ],
  providers: [
    SharedService
  ]
})
export class SharedModule { }
