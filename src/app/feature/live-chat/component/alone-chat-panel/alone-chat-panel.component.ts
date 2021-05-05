import { Component, OnInit, ViewChild } from '@angular/core';
import { LiveChatService } from '@feature/live-chat/service/live-chat.service';
import { ChatInputMComponent } from '../chat-room/chat-input-m/chat-input-m.component';

@Component({
  selector: 'app-alone-chat-panel',
  templateUrl: './alone-chat-panel.component.html',
  styleUrls: ['./alone-chat-panel.component.scss']
})
export class AloneChatPanelComponent implements OnInit {

  @ViewChild(ChatInputMComponent) chatInputMComponent: ChatInputMComponent;

  public showEmojiPicker: boolean;

  constructor(private liveChatService: LiveChatService,) { }

  ngOnInit(): void {
  }


  public toggleEmojiPicker(close?: boolean) {
    this.showEmojiPicker = close === false ? close : !this.showEmojiPicker;

  }

  public sendMessage($event) {
    const msg = $event;

    this.liveChatService.sendMessage(msg);
  }

  public addTag(event) {
    this.chatInputMComponent.addTag(event);
  }

  public closeChatPanel() {
    this.liveChatService.showAloneChatPanelUpdate(false);
  }

  public snedEmoji(event) {

    const msg = `${event.emoji.sheet[0]},${event.emoji.sheet[1]}`;
    this.liveChatService.sendEmojiMessage(msg);

    this.toggleEmojiPicker(false);
  }
  public emojiBgImgParser() {
    return (set, sheetSize) => `assets/img/emoji/${sheetSize}.png`;
  }
}
