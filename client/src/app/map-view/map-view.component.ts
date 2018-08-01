import { Component, OnInit, OnChanges, ViewChild, Input,SimpleChanges } from '@angular/core';

import { TripService } from '../trip.service';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit, OnChanges {
  // making a map
  map: google.maps.Map;
  @ViewChild('gmap') gmapElement: any;
  // calculating routes
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  startLocation: any;
  endLocation: any;
  travelMode = "DRIVING";
  show_route = false;
  // get activities from current agenda
  activities: any;
  @Input() myAgenda: any;

  ngOnChanges(changes: SimpleChanges) {
    this.activities = this.myAgenda.activities;
    this.startLocation = this.activities[0];
    this.endLocation = this.activities[0];
    this.showMap();
  }

  constructor(private tripService: TripService) { }

  ngOnInit() {
    this.showMap();
  }

  showMap() {
    let labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let labelIndex = 0;
    this.map = new google.maps.Map(this.gmapElement.nativeElement, {
      mapTypeId: google.maps.MapTypeId.ROADMAP
     })
     let bounds = new google.maps.LatLngBounds();
     let infowindow = new google.maps.InfoWindow();
     for(let a of this.activities) {
       this.placeMarker(a, infowindow, bounds, labels, labelIndex);
       labelIndex++;
     }
     this.map.fitBounds(bounds);
  }

  placeMarker(loc, infowindow, bounds, labels, labelIndex) {
     var latLng = new google.maps.LatLng( loc.lat, loc.lng);
     var marker = new google.maps.Marker({
       position : latLng,
       map      : this.map,
       label: labels[labelIndex % labels.length],
       animation: google.maps.Animation.DROP
     });
     google.maps.event.addListener(marker, 'click', function(){
       infowindow.close(); // Close previously opened infowindow
       infowindow.setContent( "<div id='infowindow'>"+ loc.location +"</div>");
       infowindow.open(this.map, marker);
     });
     bounds.extend(marker['position']);
  }

  calcRoute(directionsDisplay) {
    var start = new google.maps.LatLng( this.startLocation.lat, this.startLocation.lng);
    var end = new google.maps.LatLng( this.endLocation.lat, this.endLocation.lng);
    var tm = this.travelMode;
    var request = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode[tm]
    };
    this.directionsService.route(request, function(result, status) {
      // if (status == 'OK') {
        directionsDisplay.setDirections(result);
      // }
    });
  }

  showRoute() {
    this.show_route = true;
    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setPanel(document.getElementById('directionsPanel'));
    this.calcRoute(this.directionsDisplay);
  }
  clearRoute() {
    this.show_route = false;
    // clear route on map and directions panel
    this.directionsDisplay.setMap(null);
    this.directionsDisplay.setPanel(null);
    // clear connected routes on panel
    var summaryPanel = document.getElementById('directionsPanel');
    summaryPanel.innerHTML = "";
    this.showMap();
  }
  showConnectedRoutes() {
    this.show_route = true;
    this.directionsDisplay.setMap(this.map);
    let l = this.activities.length;
    console.log("activity:")
    console.log()
    let start = new google.maps.LatLng( this.activities[0].lat, this.activities[0].lng);
    let end = new google.maps.LatLng( this.activities[l-1].lat, this.activities[l-1].lng);
    let waypts = [];
    for(let i = 1; i < l-1; i++) {
      waypts.push({
        location: new google.maps.LatLng( this.activities[i].lat, this.activities[i].lng),
        stopover: true
      });
      console.log(waypts);
    }
    var tm = google.maps.TravelMode[this.travelMode];
    let directionsDisplay = this.directionsDisplay;   // due to scoing problem inside a callback, we need to store it in a local variable to avoid using "this"
    this.directionsService.route({
      origin: start,
      destination: end,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: tm
    }, function(response, status) {
      // if (status === 'OK') {
        directionsDisplay.setDirections(response);
        var route = response.routes[0];
        var summaryPanel = document.getElementById('directionsPanel');
        summaryPanel.innerHTML = '';
        // For each route, display summary information.
        for (var i = 0; i < route.legs.length; i++) {
          var routeSegment = i + 1;
          summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
              '</b><br>';
          summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
          summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
          summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
        }
      // } else {
      //   window.alert('Directions request failed due to ' + status);
      // }
    })
  }

}
