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
  constructor(
    private tripService:TripService,
    private router:Router
  ) { }

  ngOnInit() {
    if(this.tripService.curUser == null){
      this.router.navigate(['/login'])
    }else{
      this.currentUser = this.tripService.curUser;
    }
  }

}
