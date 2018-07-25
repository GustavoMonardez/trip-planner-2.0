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
  userId:string;
  constructor(
    private tripService:TripService,
    private router:Router
  ) { }

  ngOnInit() {
    if(!localStorage.getItem("userId")){
      this.router.navigate(['/login']);
    } else {
      this.userId = localStorage.getItem("userId");
      this.trip = {
        title:"",
        description:"",
        date_from:"",
        date_to:""
      }

    }
    
  }

  createTrip(){
    this.tripService.createTrip(this.trip, this.userId).subscribe(trip=>{
      //eventually add an if check to test if the trip is valid here
      console.log(trip)
      if(trip['id'] != null){
        this.router.navigate(['/dashboard']);
      }
    });
  }

}
