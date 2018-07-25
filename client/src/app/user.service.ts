import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = "http://localhost:8080/api/";

  constructor(private _http:HttpClient) { }
  searchUsers(term: string){
    term = term.trim();
    if(!term){
      return of([]);
    }
    if(term.includes(" ")){
      var termarr = term.split(" ")
      return this._http.get(this.apiUrl + "/finduser/search?term="+termarr[0]+"&last="+termarr[1])
    }
    return this._http.get(this.apiUrl+"/finduser/search?term="+term)
  }
}
