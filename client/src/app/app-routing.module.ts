import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { CreatetripComponent } from './createtrip/createtrip.component';

const routes: Routes = [
  {path:'registration',component:RegistrationComponent},
  {path:'login',component:LoginComponent},
  {path:'createtrip',component:CreatetripComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
