import { Component, OnInit } from '@angular/core';
import { TripService } from '../trip.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser:any;
  userEmail:any;
  userId:any;
  userName:any;
  constructor(
    private tripService:TripService,
    private router:Router
  ) { }

  ngOnInit() {
    this.userEmail = localStorage.getItem("userEmail");
    this.userId = localStorage.getItem("userId");
    this.userName = localStorage.getItem("userName");
  }

}
