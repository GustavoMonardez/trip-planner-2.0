import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TripService {
  apiUrl = "http://localhost:8080/api/";
  constructor(private _http:HttpClient) { }

  registerUser(user:{}){
    return this._http.post(this.apiUrl+"users",user);
  }
  loginUser(user:{}){
    return this._http.post(this.apiUrl+"loginuser",user);
  }
  createTrip(trip:{}, userId:string){
    var tripPost = {
      "trip":trip,
      "hostId":userId
    }
    return this._http.post(this.apiUrl+"trips",tripPost);
  }
  getUser(userId:string){
    return this._http.get(this.apiUrl+"users/"+userId);
  }

}
