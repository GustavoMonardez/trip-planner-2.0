import { Component, OnInit } from '@angular/core';
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
  users$:{};
  private searchTerms = new Subject<string>();

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.users$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term:string)=>this.userService.searchUsers(term)),
    );
  }
  search(term){
    this.searchTerms.next(term);
  }
}
