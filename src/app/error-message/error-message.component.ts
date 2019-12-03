import { Component, Input, OnInit, Output } from "@angular/core";
import { EventEmitter } from "events";

@Component({
  selector: "app-error-message",
  template: `
    <div *ngIf="messages?.length >= 0">
      <ul>
        <li *ngFor="let item of messages">
          <span class="msg-span">{{ item }}</span>
        </li>
      </ul>
    </div>
  `,
  styles: [
    `
      ul {
        list-style-type: none;
      }
      .msg-span {
        left: 10px;
        color: red;
        display: inline-block;
        font-weight: bold;
        line-height: 15px;
        margin: 10px 0 0;
      }
    `
  ]
})
export class ErrorMessageComponent implements OnInit {
  messageList: string[];

  @Input()
  get messages() {
    return this.messageList;
  }

  @Output() messageChange = new EventEmitter();
  set messages(val) {
    this.messageList = val;
    this.messageChange.emit(this.messageList[0]);
  }
  constructor() {}

  ngOnInit() {}
}
