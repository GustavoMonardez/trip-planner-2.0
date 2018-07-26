import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TripService } from '../trip.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
  trip:any;
  errorMessage:string;
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private tripService:TripService
  ) { }

  ngOnInit() {
    if(localStorage['userId'] == null){
      this.router.navigate(['/login'])
    }else{
      this.route.params.subscribe(params => this.getTrip(params['id']));
    }
  }

  getTrip(id:number){
    this.tripService.findTripById(id).subscribe(trip=>{
      this.trip = trip;
      if(this.trip == null){
        this.router.navigate(['/dashboard'])
      }else if(!this.checkIfAdmin()){
        this.router.navigate(['/dashboard'])
      }
    });
  }

  checkIfAdmin(){
    let admins = this.trip.admins;
    for(var i = 0; i < admins.length; i++){
      if(admins[i]['id'] == localStorage['userId']){
        return true;
      }
    }
    return false;
  }

  inviteUser(user){
    this.errorMessage = null;
    this.tripService.inviteUser(user.id, this.trip.id).subscribe(data=>{
      console.log(data)
      if(data['invitees'].length == this.trip['invitees'].length){
        console.log("hey nothing changed here")
        this.errorMessage = `${user.firstName} ${user.lastName} is already invited!`;
      }else{
        this.trip = data;
      }
    });
  }
  uninviteUser(user){
    this.tripService.uninviteUser(user.id, this.trip.id).subscribe(data=>{
      this.trip = data;
    })
  }

  makeTripAdmin(user){
    if(confirm(`Make ${user.firstName} ${user.lastName} an admin of this trip?`)){
      this.tripService.makeTripAdmin(user.id, this.trip.id).subscribe(data=>{
        this.trip = data;
      })
    }
  }
}
