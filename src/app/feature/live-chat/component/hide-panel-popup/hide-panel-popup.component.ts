import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app-state';
import {
  chatRoomDisplayStatusToggle,
  isFullScreenUpdate,
  refreshVideoUpdate
} from '@feature/live-chat/store/live-chat.actions';
import { tap } from 'rxjs/operators';
import { ConfigService } from '@core/config/config.service';
import { UtilityService } from '@core/service/utility.service';
import { Subscription } from 'rxjs';
import { LiveChatService } from '@feature/live-chat/service/live-chat.service';

@Component({
  selector: 'app-hide-panel-popup',
  templateUrl: './hide-panel-popup.component.html',
  styleUrls: ['./hide-panel-popup.component.scss']
})
export class HidePanelPopupComponent implements OnInit, OnDestroy {
  @Output() toggleHidePanel = new EventEmitter<string>();
  public showFullScreenButton: boolean;
  public isHideChatRoom: boolean;
  public isFullScreen: boolean;
  /** 已監聽的狀態 */
  private isHideChatRoomSubscription: Subscription;
  private isFullScreenSubscription: Subscription;


  constructor(
    private configService: ConfigService,
    private utilityService: UtilityService,
    private liveChatService: LiveChatService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.getIsHideChatRoom();
    this.getIsFullScreen();
    this.showFullScreenButton = this.configService.isFullScreenAvailable;
  }

  ngOnDestroy(): void {
    this.isHideChatRoomSubscription.unsubscribe();
    this.isFullScreenSubscription.unsubscribe();
  }

  /** 隱藏主播 */
  public dispatchHideAnchor() {
    this.liveChatService.hideAnchorUpdate(true);
    // Tell parent component to close hide panel popup
    this.emitHidePanel();
  }

  /** 隱藏控制面版 */
  public dispatchHideChatRoomDisplay() {
    this.store.dispatch(chatRoomDisplayStatusToggle({
      isHideChatRoom: !this.isHideChatRoom
    }));
    // Tell parent component to close hide panel popup
    this.emitHidePanel();
  }

  /** 切換全屏 */
  public fullScreenSwitch() {
    this.utilityService.fullScreenSwitch(!this.isFullScreen, () => {
      this.store.dispatch(isFullScreenUpdate({
        isFullScreen: !this.isFullScreen
      }));
      this.store.dispatch(refreshVideoUpdate());
    });
    // Tell parent component to close hide panel popup
    this.emitHidePanel();
  }

  private emitHidePanel() {
    this.toggleHidePanel.emit();
  }

  /** 取得HideChatRoom 從 store */
  private getIsHideChatRoom() {
    this.isHideChatRoomSubscription = this.store.pipe(select(state => state.liveChatFeature.isHideChatRoom), tap((isHideChatRoom) => {
      this.isHideChatRoom = isHideChatRoom;
    })).subscribe();
  }

  /** 取得isFullScreen 從 store */
  private getIsFullScreen() {
    this.isFullScreenSubscription = this.store.pipe(select(state => state.liveChatFeature.isFullScreen), tap((isFullScreen) => {
      this.isFullScreen = isFullScreen;
    })).subscribe();
  }
}
