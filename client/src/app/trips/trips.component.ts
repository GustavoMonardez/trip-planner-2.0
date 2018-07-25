import { Component, OnInit } from '@angular/core';
import { TripService } from '../trip.service';
import { ActivatedRoute,Params } from '@angular/router';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
  trip_id:any;
  currentTrip={};
  newActivity={};
  newAgenda={};
  droppedSuggestions:any;
  droppedProposed:any;
  suggestions = [
    {location:"Suggestion 1",description:"Description for sug 1"},
    {location:"Suggestion 2",description:"Description for sug 2"},
    {location:"Suggestion 3",description:"Description for sug 3"}
  ];
  constructor(
    private tripService:TripService,
    private route:ActivatedRoute
  ){}
  ngOnInit() {
    this.route.params.subscribe((params:Params)=>{
      console.log(params['id']);
      this.trip_id=params['id'];
      this.tripService.findTripById(params['id']).subscribe(data=>{
        if(data['title'] != null){
          this.currentTrip = data;
          //console.log("fsajfjslkdfkljsldf "+this.currentTrip['agendas'][0].day);
          this.droppedProposed = this.currentTrip['agendas'][0]['activities'];
          console.log("prop has "+this.currentTrip['agendas'][0]['activities'].length);
          if(this.currentTrip['agendas'].length == 0){
            this.newAgenda = {
              trip:this.currentTrip,
              day:1,
              date:Date.now()
            }
            this.tripService.createAgenda(this.newAgenda).subscribe(data=>{
              if(data['day'] != null) console.log("successfully created agenda");
              else console.log("error creating agenda");
            });
          }else{

          }
        }else{
          console.log("there were errors while fetching trip");
        }
      });
    });
    this.tripService.findAllActivities().subscribe(data=>{
      this.droppedSuggestions = data;
    });
  }
  onSuggestionDrop(e: any) {
    console.log("e: "+e.dragData.location);
    this.newActivity={
      description:e.dragData.description,
      location:e.dragData.location
    };
    this.tripService.createActivity(this.newActivity).subscribe(data=>{
        if(data['location'] != null){
          this.droppedSuggestions.push(data);
        } else{
          console.log("There are errors here")
        }
    });
    console.log("after: "+this.droppedSuggestions);
  }
  onProposedDrop(e: any) {  
    this.newActivity={
      description:e.dragData.description,
      location:e.dragData.location
    };  
    this.tripService.addActivityToAgenda(e.dragData.id,1).subscribe(data=>{
        if(data['location'] != null){
          console.log("successfully added activity to agenda");
          this.droppedProposed.push(data);
        }else{
          console.log("errors adding act to agenda");
        }
    });
    
  }
}
