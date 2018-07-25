import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { TripService } from '../trip.service';
import { ActivatedRoute,Params } from '@angular/router';
import { } from '@types/googlemaps';

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

  //code to keep
  agendas=[];
  currentAgenda={};
  //end code to keep

  suggestions = [];
  suggestion_type = "restaurant";
  // google suggestion
  place: any;
  map: google.maps.Map;
  googleService: any;
  nearbySearchList: any;
  @ViewChild('gmap') gmapElement: any;

  constructor(
    private tripService:TripService,
    private route:ActivatedRoute,
    private cdr:ChangeDetectorRef
  ){}
  ngOnInit() {
    //get current trip info
    this.route.params.subscribe((params:Params)=>{
      this.trip_id=params['id'];
      this.tripService.findTripById(params['id']).subscribe(data=>{
        //make sure it exists
        if(data['title'] != null){
          this.currentTrip = data;      
          //set activities
          //set agendas   
          for(let i=0; i < this.currentTrip['agendas'].length; ++i){
            //each agenda may contain a list of activities that we
            //are adding to agendas(array of arrays)
            this.agendas.push(this.currentTrip['agendas'][i]);
          }
          //set current agenda to day one (this might need to be changed)
          this.currentAgenda = this.agendas[0];
          //this should be implemented when we create a new trip
        /*   if(this.currentTrip['agendas'].length == 0){
            this.newAgenda = {
              trip:this.currentTrip,
              day:1,
              date:Date.now()
            }
            this.tripService.createAgenda(this.newAgenda).subscribe(data=>{
              if(data['day'] != null) {
                 //this needs refactoring
                this.droppedProposed = this.currentTrip['agendas'][0]['activities'];
                console.log("successfully created agenda");
              }
              else console.log("error creating agenda");
            });
          }else{
             //this needs refactoring
             //this.droppedProposed = [];
             //this.droppedProposed = this.currentTrip['agendas'][0]['activities'];
          } */
        }else{
          console.log("there were errors while fetching trip");
        }
      });
    });
    //this needs to be changed: it is finding ALL activities suggestions
    //on the proposed section when we only need activities proposed only 
    //for this particular trip
    this.tripService.findAllActivities().subscribe(data=>{
      this.droppedSuggestions = data;
    });
    // google map
    var mapOptions = 
    this.map = new google.maps.Map(this.gmapElement.nativeElement, {
      center: {lat: -33.8688, lng: 151.2195},
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
  }
  onSuggestionDrop(e: any) {
    console.log("triggered");
    //data from google is not an activity yet, so we need to create one
    this.newActivity={
      description:e.dragData.description,
      location:e.dragData.location
    };
    /*******An activity should be associated with a trip?******/
    this.tripService.createActivity(this.newActivity).subscribe(data=>{
        //if succesfully created activity, added to our lists
        if(data['location'] != null){
          this.droppedSuggestions.push(data);
        } else{
          console.log("There are errors here")
        }
    });
  }

  //handles activities being dropped/moved into the agenda section
  onActivityDrop(e: any) {  
    //pass both ids(agenda and activity) and update on the many side
    this.tripService.addActivityToAgenda(e.dragData.id,this.currentAgenda['id']).subscribe(data=>{
        if(data['location'] != null){
          console.log("successfully added activity to agenda");
          //this.droppedProposed.push(data);
          this.currentAgenda['activities'].push(data);
        }else{
          console.log("errors adding act to agenda");
        }
    });
  }
  selectDay(day){
    console.log("clicked: "+day);
    this.currentAgenda = this.agendas[day-1];
  }

  // google searchbox
  apiCall(placeObj) {
    this.place = placeObj;
    this.getNearbySearches();
  }

  getNearbySearches() {
    this.googleService = new google.maps.places.PlacesService(this.map);
    var location = new google.maps.LatLng(this.place.geometry.location.lat(), this.place.geometry.location.lng());
    let request = {
      location: location,
      radius: '300',
      type: [this.suggestion_type]
    };
    this.googleService.nearbySearch(request, (results, status) => {
      this.suggestions = [];
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        this.nearbySearchList = results;
        console.log(this.nearbySearchList);
        // add to suggestions
        for (var i = 0; i < results.length; i++) {
          var place = results[i];
          this.suggestions.push({location: place.name, description: "insert description here"});
        }
        this.cdr.detectChanges();
      }
    })

  }

}
