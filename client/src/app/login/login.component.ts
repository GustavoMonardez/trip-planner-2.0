import { Component, OnInit } from '@angular/core';
import { TripService } from '../trip.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:{};

  constructor(private tripService:TripService) { }

  ngOnInit() {
    this.user = {
      email:"",
      password:""
    }
  }
  login(){
    console.log(this.user);
  }
}
