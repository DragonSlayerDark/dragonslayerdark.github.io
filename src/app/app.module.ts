import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EFFECTS, reducers } from './store/app.state';
import { ProductEffects } from './store/entities/effects/product.effects';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthJSStrapi } from './auth_services/auth';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { GraphQLModule } from './graphql.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaymentModule } from 'payment-stripe-widgets';
import { ServiceWorkerModule, SwRegistrationOptions } from '@angular/service-worker';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


AuthJSStrapi.init({
  server: environment.server,
  loginRoute: ['/auth', 'login'],
  homeRoute: ['/social', 'posts'],
});
const config: SocketIoConfig = { url: `${environment.payment}/pawl`, options: {} };

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot(EFFECTS),
    HttpClientModule,
    SocketIoModule.forRoot(config),
    GraphQLModule,
    SharedModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    AuthJSStrapi.Interceptor,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
