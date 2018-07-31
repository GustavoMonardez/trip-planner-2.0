import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { TripService } from '../trip.service';
import { ActivatedRoute,Params } from '@angular/router';
import { } from '@types/googlemaps';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


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
  popup=false;
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

  nearbySearchList = [];  // keep Esther's version

  userId:number;
  @ViewChild('gmap') gmapElement: any;
  map_view = false;

  constructor(
    private tripService:TripService,
    private route:ActivatedRoute,
    private cdr:ChangeDetectorRef,
    private sanitizer:DomSanitizer
  ){}
  ngOnInit() {
    //get user
    this.userId = localStorage['userId'];
    //get current trip info
    this.route.params.subscribe((params:Params)=>{
      this.trip_id=params['id'];
      this.tripService.findTripById(params['id']).subscribe(data=>{
        //make sure it exists
        if(data['title'] != null){
          this.currentTrip = data;
          //set activities
          this.droppedSuggestions = this.currentTrip['proposedActivities'];
          //set agendas
          for(let i=0; i < this.currentTrip['agendas'].length; ++i){
            //each agenda may contain a list of activities that we
            //are adding to agendas(array of arrays)
            this.agendas.push(this.currentTrip['agendas'][i]);
          }
          //set current agenda to day one (this might need to be changed)
          this.currentAgenda = this.agendas[0];
        }else{
          console.log("there were errors while fetching trip");
        }
      });
    });
    // google map
    var mapOptions =
    this.map = new google.maps.Map(this.gmapElement.nativeElement, {
      center: {lat: -33.8688, lng: 151.2195},
      zoom: 13
    });
  }
  onSuggestionDrop(e: any) {
    console.log("triggered");
    //data from google is not an activity yet, so we need to create one
    this.newActivity={
      description: e.dragData.types[0],
      imgRef: typeof e.dragData.photos != 'undefined'
                  ? e.dragData.photos[0].getUrl({'maxWidth': 400, 'maxHeight': 200})
                  : "https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjl05vOtb3cAhWI0J8KHRgqAP8QjRx6BAgBEAU&url=http%3A%2F%2Fphysic.minimalistics.co%2Fbackground-ocean%2F&psig=AOvVaw0QWe4gT6kREbF4ke5w0JuC&ust=1532716903512453",
      lat: e.dragData.geometry.location.lat(),
      lng: e.dragData.geometry.location.lng(),
      location: e.dragData.name
    };
    console.log("added suggestion to activity")
    console.log(this.newActivity['imgRef'])
    console.log(this.newActivity)
    /*******An activity should be associated with a trip?******/
    this.tripService.createActivity(this.newActivity,this.trip_id).subscribe(data=>{
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
          //add activity to current agenda day
          this.currentAgenda['activities'].push(data);
           //remove from list of proposed activities
           this.droppedSuggestions.splice(this.droppedSuggestions.indexOf(e.dragData),1);
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
    if(this.suggestion_type == "specific_location") {
      this.getSpecificLocation();
    } else {
      this.getNearbySearches();
    }
  }
  search() {
    if(this.suggestion_type == "specific_location") {
      this.getSpecificLocation();
    } else {
      this.getNearbySearches();
    }
  }
  getSpecificLocation() {
    // console.log(this.place);
    this.nearbySearchList = [this.place];
    this.cdr.detectChanges();
    console.log(this.nearbySearchList)
  }
  getNearbySearches() {
    this.googleService = new google.maps.places.PlacesService(this.map);
    var location = new google.maps.LatLng(this.place.geometry.location.lat(), this.place.geometry.location.lng());
    let request = {
      location: location,
      radius: '1000',
      type: [this.suggestion_type]
    };

    this.googleService.nearbySearch(request, (results, status) => {
      this.suggestions = [];
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        this.nearbySearchList = results;
        console.log(this.nearbySearchList);
        this.cdr.detectChanges();
      }
    })

  }
  goMapView() {
    console.log("i'm in goMapView")
    if(!this.map_view) {
      this.map_view = true;
    } else {
      this.map_view = false;
    }
  }
  createNewDay(){
    console.log("I'd be creating day "+this.currentTrip['agendas'].length);
    let agenda = {
        day:this.currentTrip['agendas'].length+1,
        trip_id:this.trip_id,
        activities:[]
    }
    this.tripService.createAgenda(agenda,this.trip_id).subscribe(data=>{
      if(data['day'] != null){
        console.log("successfully added one day to trip");
        this.currentTrip['agendas'].push(data);
        this.agendas.push(data);
      }else{
        console.log("error adding new day");
      }
    })
  }
  onDropDelete(e:any){
    this.tripService.deleteActivity(e.dragData.id).subscribe(data=>{
      //activities can be deleted from 2 sections: the agenda(day) and the proposed sections
      //we'll remove the activity and update accordingly
      if(this.currentAgenda['activities'].indexOf(e.dragData) != -1){
        this.currentAgenda['activities'].splice(this.currentAgenda['activities'].indexOf(e.dragData),1);
      }else{
        this.droppedSuggestions.splice(this.droppedSuggestions.indexOf(e.dragData),1);
      }
      console.log(e);
    })

  }

  getBackground(img_ref) {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${img_ref})`);
  }
  //code for user liking activities
  likeActivity(activity){
    this.tripService.likeActivity(this.userId, activity.id).subscribe(data=>{
      for(var i = 0;i < this.droppedSuggestions.length;i++){
        if(this.droppedSuggestions[i]['id'] == data['id']){
          this.droppedSuggestions[i]['likedBy'] = data['likedBy']
        }
      }
    });
  }

  hasUserLiked(activity){
    for(var i = 0; i < activity.likedBy.length; i++){
      if(activity.likedBy[i]['id'] == this.userId){
        return true;
      }
    }
    return false;
  }
  //end code for users liking activities

  show(){
    this.popup = (this.popup == true) ? false : true;
  }

}
