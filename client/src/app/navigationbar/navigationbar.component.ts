import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navigationbar',
  templateUrl: './navigationbar.component.html',
  styleUrls: ['./navigationbar.component.css']
})
export class NavigationbarComponent implements OnInit {
  curUrl:string;
  tripId:number;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
  ) { }

  ngOnInit() {
    console.log("loaded navigation component");
    if(!this.isOnReg()){
      if(localStorage['userId'] == null){
        this.router.navigate(['/login'])
      }
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }

  isOnInvitePage(){
    var re = new RegExp('/trips/plan/[0-9]+/invite')
    if(this.router.url.match(re)){
      this.setTripId();
      return true;
    }
    return false;
  }

  setTripId(){
    this.route.params.subscribe(params=>{
      this.tripId = params['id']
    })
  }
  isOnTripPage(){
    var re = new RegExp('/trips/plan/[0-9]+$')
    if(this.router.url.match(re)){
      this.setTripId();
      return true;
    }
    return false;
  }
  isOnRegOrLogin(){
    var reg = new RegExp('/registration');
    var log = new RegExp('/login');
    if(this.router.url.match(reg) || this.router.url.match(log)) return true;
    return false;
  }
  isOnReg(){
    var reg = new RegExp('/registration');
    if(this.router.url.match(reg)) return true;
    return false;
  }
}
