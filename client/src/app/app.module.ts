import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TripService } from './trip.service';
import { HttpClientModule} from '@angular/common/http';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreatetripComponent } from './createtrip/createtrip.component';
import { TripsComponent } from './trips/trips.component';
import { NgDragDropModule } from 'ng-drag-drop';



@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    DashboardComponent,
    CreatetripComponent,
    TripsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgDragDropModule.forRoot()
  ],
  providers: [TripService],
  bootstrap: [AppComponent]
})
export class AppModule { }
