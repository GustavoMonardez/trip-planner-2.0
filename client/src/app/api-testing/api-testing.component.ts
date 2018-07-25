import { Component, OnInit, ElementRef, NgZone, ViewChild, NgModule } from '@angular/core';
import { TripService } from '../trip.service';
import { AgmMap, MapsAPILoader, MouseEvent} from '@agm/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { } from 'googlemaps';

// Google API method #2: https://medium.com/@balramchavan/integrating-google-maps-in-angular-5-ca5f68009f29


@Component({
  selector: 'app-api-testing',
  templateUrl: './api-testing.component.html',
  styleUrls: ['./api-testing.component.css']
})
export class ApiTestingComponent implements OnInit {
  @ViewChild(AgmMap)
  agmMap: AgmMap

  latitude: number;
  longitude: number;
  searchControl: FormControl;
  zoom: number;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }

  ngOnInit() {
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
      this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

}
