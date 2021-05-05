import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-chat-input-m',
  templateUrl: './chat-input-m.component.html',
  styleUrls: ['./chat-input-m.component.scss']
})
export class ChatInputMComponent implements OnInit {
  @ViewChild('inputArea') inputAreaElement: ElementRef;
  @Output() emitEmojiPicker = new EventEmitter<void>();
  @Output() emitChatMessage = new EventEmitter<string>();

  public newChatMessage: string;

  constructor() { }

  ngOnInit(): void {
    this.newChatMessage = '';
  }

  public showEmojiPicker() {
    this.emitEmojiPicker.emit();
  }

  public sendMessage() {
    // Prevent empty
    if (this.newChatMessage === '') {
      return;
    }

    this.emitChatMessage.emit(this.newChatMessage);
    this.clearInput();
  }

  public addTag(tag) {
    if (this.newChatMessage.indexOf(`@${tag},`) !== -1) {
      return;
    }

    this.newChatMessage = this.newChatMessage + ` @${tag},`;
  }

  public addEmoji(event) {
    this.newChatMessage = `${this.newChatMessage}${event.emoji.native}`;
  }
  private clearInput() {
    this.newChatMessage = '';
  }
  private focusInput() {
    this.inputAreaElement.nativeElement.focus();
  }
}
