import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  apiUrl = "http://localhost:8080/api/";

  constructor(private _http: HttpClient) { }

  addMessage(tripId,userId,message){
    console.log("here i am")
    var messagePost = {
      "tripId" : tripId,
      "userId" : userId,
      "message" : message,
    }
    return this._http.post(this.apiUrl + "messages", messagePost);
  }
}
