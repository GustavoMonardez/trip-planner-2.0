import { Component, OnInit } from '@angular/core';
import { TripService } from '../trip.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:{};

  constructor(
    private tripService:TripService,
    private router:Router
  ) { }

  ngOnInit() {
    this.user = {
      email:"",
      password:""
    }
  }
  login(){
    this.tripService.loginUser(this.user).subscribe(data=>{
      if(data['email'] != null){
        console.log("hey the login was correct");
        //store the in the service
        this.tripService.storeUser(data);
        //route them somewhere here
        //this.router.navigate(['/someroute'])
      } else{
        this.user = {
          email:"",
          password:""
        }
        console.log("hey the login was wrong");
      }
    })
  }
}
