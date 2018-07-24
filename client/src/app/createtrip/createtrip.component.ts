import { Component, OnInit } from '@angular/core';
import { TripService } from '../trip.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createtrip',
  templateUrl: './createtrip.component.html',
  styleUrls: ['./createtrip.component.css']
})
export class CreatetripComponent implements OnInit {
  trip:{};
  constructor(
    private tripService:TripService,
    private router:Router
  ) { }

  ngOnInit() {
    if(!localStorage.getItem("User")){
      this.router.navigate(['/login']);
    }
    this.trip = {
      title:"",
      description:"",
      date_from:"",
      date_to:""
    }
  }

  createTrip(){
    console.log(this.trip);
  }

}
