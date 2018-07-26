import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TripService } from './trip.service';
import { HttpClientModule} from '@angular/common/http';
import { RegistrationComponent } from './registration/registration.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiTestingComponent } from './api-testing/api-testing.component';

import { AgmCoreModule } from '@agm/core';
import { JsApiTestingComponent } from './js-api-testing/js-api-testing.component';
import { DirApiTestingComponent } from './dir-api-testing/dir-api-testing.component';
import { GooglePlacesDirective } from './google-places.directive';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreatetripComponent } from './createtrip/createtrip.component';
import { TripsComponent } from './trips/trips.component';
import { NgDragDropModule } from 'ng-drag-drop';

import { MapViewComponent } from './map-view/map-view.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { UserService } from './user.service'




@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    ApiTestingComponent,
    JsApiTestingComponent,
    DirApiTestingComponent,
    GooglePlacesDirective,
    LoginComponent,
    DashboardComponent,
    CreatetripComponent,
    TripsComponent,
    MapViewComponent,
    UserSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgDragDropModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'API_KEY',
      libraries: ["places"]
    })
  ],
  providers: [
    TripService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
