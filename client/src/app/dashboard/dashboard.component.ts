import { Component, OnInit } from '@angular/core';
import { TripService } from '../trip.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user:any;
  userId:any;
  tripsAttending:any;

  selectedTrip:any;

  constructor(
    private tripService:TripService,
    private router:Router
  ) { }

  ngOnInit() {
    this.userId = localStorage.getItem("userId");
    this.getUser();
  }
  getUser() {
    this.tripService.getUser(this.userId).subscribe(user=>{
      this.user = user;
      this.tripsAttending = this.concatAttendingTrips();
      this.sortTrips(this.tripsAttending);
    });
  }

  acceptInvitation(trip){
    console.log("hey im entering here in trip", trip);
    this.tripService.acceptInvitation(this.user.id, trip.id).subscribe(user=>{
      this.user = user;
      this.tripsAttending = this.concatAttendingTrips();
      this.sortTrips(this.tripsAttending);
    });
  }
  // I need to push all the trips into a new array, so that i can easily sort
  // the array by date_from. I also add a new key to the trip object (used only 
  // on client side) so that i can easily identify what the users relationship with
  // this trip is (admin, guest, invitee). I also change the date_from from a
  // string to a date type, so that i can later sort by the date_from.
  concatAttendingTrips(){
    let user = this.user;
    let tripsAttending = [];
    for(var trip of user.tripsCreated){
      trip['role'] = 'admin';
      trip['date_from'] = new Date(trip['date_from']);
      tripsAttending.push(trip);
    }
    for(var trip of user.tripsAttending){
      trip['role'] = 'guest';
      tripsAttending.push(trip);
    }
    return tripsAttending;
  }
  // This function will sort an array of trips by their date_from
  sortTrips(trips){
    trips.sort(function(a,b){
      return a['date_from'] > b['date_from'];
    })
  }

  setCalendarToTrip(trip){
    this.selectedTrip=trip
  }

  scrollToTrip(trip){
    console.log("hey woah checkit out im in the scrollToTrip:", trip)
    document.querySelector('#trip'+trip['id']).scrollIntoView()
  }
}
