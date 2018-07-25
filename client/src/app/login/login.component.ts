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
    	console.log(data);
      if(data['email'] != null){
        localStorage.setItem("userEmail",data['email']);
        localStorage.setItem("userId",data['id']);
        localStorage.setItem("userName", data['firstName'] + " " + data['lastName'])
        this.router.navigate(['/dashboard']);
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
