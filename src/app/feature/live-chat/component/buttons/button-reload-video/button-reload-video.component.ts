import { Component, OnInit } from '@angular/core';
import { LiveChatService } from '@feature/live-chat/service/live-chat.service';

@Component({
  selector: 'app-button-reload-video',
  templateUrl: './button-reload-video.component.html',
  styleUrls: ['./button-reload-video.component.scss']
})
export class ButtonReloadVideoComponent implements OnInit {

  constructor(private liveChatService: LiveChatService) { }

  ngOnInit(): void {
  }

  /** 送出重載直播影片指示 */
  public reloadVideo() {
    this.liveChatService.toggleReloadVideoUpdate();
  }
}
