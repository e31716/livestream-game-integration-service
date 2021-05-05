import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChatMessage } from '@core/model/live-chat-room';

@Component({
  selector: 'app-poke-user-msg-box',
  templateUrl: './poke-user-msg-box.component.html',
  styleUrls: ['./poke-user-msg-box.component.scss']
})
export class PokeUserMsgBoxComponent implements OnInit {

  @Output() sendTagUserFromBox = new EventEmitter<string>();
  @Input() item: ChatMessage;
  constructor(

  ) { }

  ngOnInit(): void {
  }

  /** 標記用戶 */
  public boxTagUser(userName) {
    this.sendTagUserFromBox.emit(userName);
  }

}
