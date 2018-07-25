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
    // google map
    this.map = new google.maps.Map(this.gmapElement.nativeElement, {
      center: {lat: -33.8688, lng: 151.2195},
      zoom: 13,
      mapTypeId: 'roadmap'
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
