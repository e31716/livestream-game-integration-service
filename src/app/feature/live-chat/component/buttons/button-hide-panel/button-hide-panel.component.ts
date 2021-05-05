import { Component, OnDestroy, OnInit } from '@angular/core';
import { LiveChatService } from '@feature/live-chat/service/live-chat.service';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs/internal/Subscription';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/app-state';

@Component({
  selector: 'app-button-hide-panel',
  templateUrl: './button-hide-panel.component.html',
  styleUrls: ['./button-hide-panel.component.scss']
})
export class ButtonHidePanelComponent implements OnInit, OnDestroy {

  constructor(private store: Store<AppState>, private liveChatService: LiveChatService) { }

  /** 是否隱藏聊天室介面 */
  public isHideChatRoom: boolean;

  /** 已監聽的內容 */
  private isHideChatRoomSubscription: Subscription;

  ngOnInit(): void {
    this.getIsHideChatRoom();
  }

  ngOnDestroy(): void {
    this.isHideChatRoomSubscription.unsubscribe();
  }

  /** 觸發隱藏面板 */
  public toggleHidePanel() {
    this.liveChatService.toggleHidePanelUpdate(!this.isHideChatRoom);
  }

  /** 取得是否隱藏聊天室介面 從 store */
  private getIsHideChatRoom() {
    this.isHideChatRoomSubscription = this.store.pipe(
      select(state => state.liveChatFeature.isHideChatRoom),
      tap((isHideChatRoom) => {
        this.isHideChatRoom = isHideChatRoom;
      })
    ).subscribe();
  }
}
