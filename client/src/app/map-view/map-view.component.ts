import { Component, OnInit, OnChanges, SimpleChanges, ViewChild, Input } from '@angular/core';
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
     bounds.extend(marker.position);
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
    this.directionsDisplay.setMap(null);
    this.directionsDisplay.setPanel(null);
    this.showMap();
  }

}
