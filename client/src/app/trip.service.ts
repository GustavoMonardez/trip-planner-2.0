import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TripService {
  apiUrl = "http://localhost:8080/api/";
  constructor(private _http:HttpClient) { }
  
  getApi(lat, lng) {
    return this._http.get('/googlemapapi');
  }
  /********************USERS********************/
  registerUser(user:{}){
    return this._http.post(this.apiUrl+"users",user);
  }
  loginUser(user:{}){
    return this._http.post(this.apiUrl+"loginuser",user);
  }
  /********************TRIPS********************/
  createTrip(trip:{}, userId:string){
    var tripPost = {
      "trip":trip,
      "hostId":userId
    }
    return this._http.post(this.apiUrl+"trips",tripPost);
  }
  findTripById(trip_id){
    return this._http.get(this.apiUrl+"trips/"+trip_id);
  }
  /********************ACTIVITIES********************/
  findAllActivities(){
    return this._http.get(this.apiUrl+"activities");
  }
  createActivity(activity:{},trip_id){
    return this._http.post(this.apiUrl+"activities/"+trip_id+"/edit",activity);
  }
  addActivityToAgenda(activity_id,agenda_id){
    ///agendas/{agenda_id}/edit
    return this._http.post(this.apiUrl+"agendas/"+agenda_id+"/edit",activity_id);
  }
  deleteActivity(activity_id){
    //"/activities/{activity_id}/delete"
    console.log("activity id(service ts): "+activity_id);
    return this._http.delete(this.apiUrl+"activities/"+activity_id+"/delete");
  }
  /********************AGENDA********************/
  createAgenda(agenda:{},trip_id){
    return this._http.post(this.apiUrl+"agendas/"+trip_id+"/create",agenda);
  }
  findAgendaById(agenda_id){
    return this._http.get(this.apiUrl+"agendas/"+agenda_id);
  }
  getUser(userId:string){
    return this._http.get(this.apiUrl+"users/"+userId);
  }

  inviteUser(userId, tripId){
    var inviteUserPost = {
      "userId":userId,
      "tripId":tripId
    }
    return this._http.post(this.apiUrl+"/trips/invite",inviteUserPost);
  }

  uninviteUser(userId, tripId){
    var inviteUserPost = {
      "userId":userId,
      "tripId":tripId
    }
    return this._http.post(this.apiUrl+"/trips/uninvite",inviteUserPost);
  }

  acceptInvitation(userId, tripId){
    var inviteUserPost = {
      "userId":userId,
      "tripId":tripId
    }
    return this._http.post(this.apiUrl + "/trips/acceptinvitation",inviteUserPost);
  }

  makeTripAdmin(userId,tripId){
    var inviteUserPost={
      "userId":userId,
      "tripId":tripId
    };
    return this._http.post(this.apiUrl+"/trips/maketripadmin",inviteUserPost);
  }

  //code for user liking activities
  likeActivity(userId, activityId){
    var likeActivityPost = {
      "userId":userId,
      "activityId":activityId
    }
    return this._http.post(this.apiUrl+"/activities/like", likeActivityPost);
  }
}
