import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-error-message',
  template: `<div id="divMessage" *ngIf="messages?.length>=0">
                <span *ngFor="let item of messages">{{item}}<br /></span>
            </div>`,
  styles: [`#divMessage{ color:red !important; font-weight: bold !important; }
          #divMessage span{ color:red !important; font-weight: bold !important; }`]
})

export class ErrorMessageComponent implements OnInit {

  messageList:string[];
  
  @Input()
  get messages(){
    return this.messageList;
  }

  @Output()  messageChange:EventEmitter=new EventEmitter();
  set messages(val){
    this.messageList=val;
    this.messageChange.emit(this.messageList[0]);
  }
  constructor() { }

  ngOnInit() {
  }
}