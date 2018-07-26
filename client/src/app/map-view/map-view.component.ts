import { Component, OnInit, OnChanges, ViewChild, Input } from '@angular/core';
import { TripService } from '../trip.service';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit, OnChanges {
  map: google.maps.Map;
  @ViewChild('gmap') gmapElement: any;
  activities: any;
  @Input() myAgenda: any;

  ngOnChanges(changes: SimpleChanges) {
    console.log("agenda from map view: ")
    console.log(this.myAgenda)
    this.activities = this.myAgenda.activities;
    this.showMap();
  }

  constructor(private tripService: TripService) { }

  ngOnInit() {
    this.showMap();
  }

  showMap() {
    this.map = new google.maps.Map(this.gmapElement.nativeElement, {
      mapTypeId: google.maps.MapTypeId.ROADMAP
     })
     let bounds = new google.maps.LatLngBounds();
     let infowindow = new google.maps.InfoWindow();
     for(let a of this.activities) {
       this.placeMarker(a, infowindow, bounds);
     }
     this.map.fitBounds(bounds);
  }

  placeMarker(loc, infowindow, bounds) {
     var latLng = new google.maps.LatLng( loc.lat, loc.lng);
     var marker = new google.maps.Marker({
       position : latLng,
       map      : this.map,
       animation: google.maps.Animation.DROP
     });
     google.maps.event.addListener(marker, 'click', function(){
       infowindow.close(); // Close previously opened infowindow
       infowindow.setContent( "<div id='infowindow'>"+ loc.location +"</div>");
       infowindow.open(this.map, marker);
     });
     bounds.extend(marker.position);
  }

}
