import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { TripService } from '../trip.service';
import { } from '@types/googlemaps';


@Component({
  selector: 'app-dir-api-testing',
  templateUrl: './dir-api-testing.component.html',
  styleUrls: ['./dir-api-testing.component.css']
})
export class DirApiTestingComponent implements OnInit {
  addrKeys: string[];
  addr: object;
  place: any;
  map: google.maps.Map;
  googleService: any;
  nearbySearchList: any;

  @ViewChild('gmap') gmapElement: any;


  constructor(private zone: NgZone, private tripService: TripService) { }

  ngOnInit() {
   /*  this.map = new google.maps.Map(this.gmapElement.nativeElement, {
      center: {lat: -33.8688, lng: 151.2195},
      zoom: 13,
      mapTypeId: 'roadmap'
    }) */

    // this.getNearbySearches();
  }

  //
  apiCall(placeObj) {
    console.log("we are here in api Call function!!!")
    this.place = placeObj;
    this.getNearbySearches();
  }

  getNearbySearches() {
    this.googleService = new google.maps.places.PlacesService(this.map);
    // hardcoded
    var location = new google.maps.LatLng(this.place.geometry.location.lat(), this.place.geometry.location.lng());
    let request = {
      location: location,
      radius: '300',
      type: ['restaurant']
    };

    this.googleService.nearbySearch(request, (results, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        this.nearbySearchList = results;
        console.log(this.nearbySearchList);
      }
    })
  }

}
