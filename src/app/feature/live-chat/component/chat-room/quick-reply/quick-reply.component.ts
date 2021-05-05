import { Component, OnInit } from '@angular/core';
import { LiveChatService } from '@feature/live-chat/service/live-chat.service';

@Component({
  selector: 'app-quick-reply',
  templateUrl: './quick-reply.component.html',
  styleUrls: ['./quick-reply.component.scss']
})
export class QuickReplyComponent implements OnInit {
  public quickReplyList: string[];

  constructor(private liveChatService: LiveChatService) { }

  ngOnInit(): void {
    this.getQuickReplyList();
  }
  public sendMessage(msg: string) {
    this.liveChatService.sendMessage(msg);
  }
  private getQuickReplyList() {
    this.liveChatService.getQuickReplyList().subscribe(res => {
      console.log(res);
      this.quickReplyList = res;
    });
  }
}
