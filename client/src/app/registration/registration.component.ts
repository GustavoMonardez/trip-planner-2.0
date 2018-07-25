import { Component, OnInit } from '@angular/core';
import { TripService } from '../trip.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  newUser: {};

  constructor(
    private tripService:TripService,
    private router:Router
  ) { }

  ngOnInit() {
    this.newUser = {
      email:"",
      firstName:"",
      lastName:"",
      password:"",
      passwordConfirmation:""
    }
  }
  register(){
    this.tripService.registerUser(this.newUser).subscribe(data=>{
      console.log(data)
      if(data['email'] != null){
        this.router.navigate(['/login']);
      } else{
        console.log("There are errors here")
      }
    });
  }

}
