import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { ApiTestingComponent } from './api-testing/api-testing.component';
import { JsApiTestingComponent } from './js-api-testing/js-api-testing.component';
import { DirApiTestingComponent } from './dir-api-testing/dir-api-testing.component';

const routes: Routes = [
  {path:'registration',component:RegistrationComponent},
  {path:'apitesting',component:ApiTestingComponent},
  {path:'jsapitesting',component:JsApiTestingComponent},
  {path:'dirapitesting',component:DirApiTestingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
