import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messageboard',
  templateUrl: './messageboard.component.html',
  styleUrls: ['./messageboard.component.css']
})
export class MessageboardComponent implements OnInit, AfterViewChecked {
  userId:number;
  @Input() trip: any; 
  @ViewChild("scrollMe") private myScrollContainer: ElementRef;

  constructor(private messageService:MessageService) { }

  ngOnInit() {
    this.userId = localStorage['userId']
    this.scrollToBottom();
  }

  ngAfterViewChecked(){
    this.scrollToBottom();
  }

  addMessage(message){
    this.messageService.addMessage(this.trip.id, this.userId, message).subscribe(data=>{
      console.log(data)
      this.trip.messages.push(data);
    });
  }

  scrollToBottom(){
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;   
  }

}
