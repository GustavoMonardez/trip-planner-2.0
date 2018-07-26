import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {
  @Input() currenttrip: any;

  @Output() inviteUserEmitter = new EventEmitter();

  users$:{};
  private searchTerms = new Subject<string>();

  constructor(private userService: UserService) { }

  ngOnInit() {
    console.log("hey i'm in the user-search! and this is the trip that i am getting from the parent: ", this.currenttrip);
    this.users$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term:string)=>this.userService.searchUsers(term)),
    );
  }
  search(term){
    this.searchTerms.next(term);
  }

  dostuff(user){
    if(this.currenttrip){
      this.emitUserToInviteComponent(user);
    }else{
      console.log("im gonna go look at the user profile")
    }
  }

  emitUserToInviteComponent(user){
    this.inviteUserEmitter.emit(user);
  }
}
