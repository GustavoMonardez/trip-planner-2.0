import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  CalendarEvent,
  CalendarViewPeriod,
  CalendarMonthViewBeforeRenderEvent,
  CalendarWeekViewBeforeRenderEvent,
  CalendarDayViewBeforeRenderEvent
} from 'angular-calendar';
import { TripService } from '../trip.service';
import { Observable, Subject } from 'rxjs';

const colors = {
  admin: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  guest: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  invited: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Input()
  set selectedTrip(selectedTrip:any){
    if(selectedTrip != null){
      console.log("hey im in the calendar component and this is the selectedTrip",selectedTrip);
      this.viewDate = selectedTrip['date_from']
      this.refresh.next();
    }
  }

  @Output() eventEmitter = new EventEmitter();
  user:any;
  view: string = 'month';
  
  viewDate: Date = new Date();

  events: CalendarEvent[];

  period: CalendarViewPeriod;

  refresh: Subject<any> = new Subject();

  constructor(
    private cdr: ChangeDetectorRef,
    private tripService: TripService
  ) { }

  ngOnInit() {
    this.events = [];
    this.tripService.getUser(localStorage['userId']).subscribe(user=>{
      this.user = user;
      console.log(this.user);
      this.events = this.addTrips()
      this.refresh.next();
    })
  }

  beforeViewRender(
    event:
      | CalendarMonthViewBeforeRenderEvent
      | CalendarWeekViewBeforeRenderEvent
      | CalendarDayViewBeforeRenderEvent
  ){
    this.period = event.period;
    this.cdr.detectChanges();
  }

  addTrips(){
    let events = [];
    let adminTrips = this.user.tripsCreated;
    let guestTrips = this.user.tripsAttending;
    let invitedTrips = this.user.tripsInvited;
    for(let trip of adminTrips){
      let tempTrip = {
        id:trip.id,
        title: trip.title,
        color:colors.admin,
        start:new Date(trip.date_from),
        end:new Date(trip.date_to)
      }
      events.push(tempTrip);
    }
    for(let trip of guestTrips){
      let tempTrip = {
        id:trip.id,
        title: trip.title,
        color:colors.guest,
        start:new Date(trip.date_from),
        end:new Date(trip.date_to)
      }
      events.push(tempTrip);
    }
    for(let trip of invitedTrips){
      let tempTrip = {
        id:trip.id,
        title: trip.title,
        color:colors.invited,
        start:new Date(trip.date_from),
        end:new Date(trip.date_to)
      }
      events.push(tempTrip);
    }
    return events;
  }
  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
    this.eventEmitter.emit(event);
  }
}
