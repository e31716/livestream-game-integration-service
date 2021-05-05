import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent implements OnInit {
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
    this.focusInput();
  }
  public addTag(tag) {
    if (this.newChatMessage.indexOf(`@${tag},`) !== -1) {
      return;
    }

    this.newChatMessage = this.newChatMessage + ` @${tag},`;
    this.focusInput();
  }
  public addEmoji(event) {
    this.newChatMessage = `${this.newChatMessage}${event.emoji.native}`;
    this.focusInput();
  }
  private clearInput() {
    this.newChatMessage = '';
  }
  private focusInput() {
    this.inputAreaElement.nativeElement.focus();
  }
}
