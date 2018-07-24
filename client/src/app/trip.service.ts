import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TripService {
  apiUrl = "http://localhost:8080/";
  curUser:{};
  constructor(private _http:HttpClient) { }

  registerUser(user:{}){
    return this._http.post(this.apiUrl+"users",user);
  }
  loginUser(user:{}){
    return this._http.post(this.apiUrl+"loginuser",user);
  }
  storeUser(user:{}){
    this.curUser = user;
  }
}
