import { Component, OnInit } from '@angular/core';
import { TripService } from '../trip.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  newUser: {};

  constructor(private tripService:TripService) { }

  ngOnInit() {
    this.newUser = {
      email:"",
      first_name:"",
      last_name:"",
      password:"",
      confirm_pw:""
    }
  }
  register(){
    console.log("entering here")
    console.log(this.newUser);
  }

}
