import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/app-state';
import { hasPopupShowUpdate } from '../store/live-chat.actions';

@Injectable()
export class PopupStatusService {
  // Thie service is responsible for making sure that clicking on the blank area will close all other pupup or menu 

  showAloneChatPanel: boolean;
  showGiftPanel: boolean;
  isShowTopMenuPopup: boolean;
  isShowAnchorInfoPanel: boolean;
  showLotteryScreen: boolean;

  constructor(private store: Store<AppState>,) {
    this.getShowAloneChatPanel();
    this.getShowGiftPanel();
    this.getIsShowTopMenuPopup();
    this.getIsShowAnchorInfoPanel();
    this.getShowLotteryScreen();
  }

  private getShowAloneChatPanel() {
    this.store.pipe((
      select(state => state.liveChatFeature.showAloneChatPanel)),
      tap((showAloneChatPanel) => {
        this.showAloneChatPanel = showAloneChatPanel;
        this.detectPopupStatus();
      })
    ).subscribe();
  }

  private getShowGiftPanel() {
    this.store.pipe((
      select(state => state.liveChatFeature.showGiftPanel)),
      tap((showGiftPanel) => {
        this.showGiftPanel = showGiftPanel;
        this.detectPopupStatus();
      })
    ).subscribe();
  }

  private getIsShowTopMenuPopup() {
    this.store.pipe((
      select(state => state.liveChatFeature.isShowTopMenuPopup)),
      tap((isShowTopMenuPopup) => {
        this.isShowTopMenuPopup = isShowTopMenuPopup;
        this.detectPopupStatus();
      })
    ).subscribe();
  }

  private getIsShowAnchorInfoPanel() {
    this.store.pipe((
      select(state => state.liveChatFeature.isShowAnchorInfoPanel)),
      tap((isShowAnchorInfoPanel) => {
        this.isShowAnchorInfoPanel = isShowAnchorInfoPanel;
        this.detectPopupStatus();
      })
    ).subscribe();
  }

  private getShowLotteryScreen() {
    this.store.pipe((
      select(state => state.liveChatFeature.showLotteryScreen)),
      tap((showLotteryScreen) => {
        this.showLotteryScreen = showLotteryScreen;
        this.detectPopupStatus();
      })
    ).subscribe();
  }

  private detectPopupStatus() {
    const hasPopupShow =
      this.showAloneChatPanel ||
      this.showGiftPanel ||
      this.isShowTopMenuPopup ||
      this.isShowAnchorInfoPanel ||
      this.showLotteryScreen;
    this.updatePopupShowStatus(hasPopupShow);
  }

  private updatePopupShowStatus(status: boolean) {
    this.store.dispatch(hasPopupShowUpdate({
      hasPopupShow: status
    }));
  }
}
