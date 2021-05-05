import { Component, OnInit, Inject } from '@angular/core';
import { ConfigService } from '@core/config/config.service';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app-state';
import { refreshVideoUpdate, chatRoomDisplayStatusToggle } from '@feature/live-chat/store/live-chat.actions';
import { DOCUMENT } from '@angular/common';
import { tap } from 'rxjs/operators';
import { LiveChatService } from '@feature/live-chat/service/live-chat.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss']
})
export class RightPanelComponent implements OnInit {

  public isFullScreen: boolean;
  public showFullScreenButton: boolean;
  public isShowHidePanelPopup: boolean;
  private element;
  private isHideChatRoomCurrent: boolean;

  constructor(
    private configService: ConfigService,
    @Inject(DOCUMENT) private document: any,
    private store: Store<AppState>,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.element = document.documentElement;
    this.showFullScreenButton = this.configService.isFullScreenAvailable;
    this.isFullScreen = false;
  }
  /** hide panel popup toggle */
  public receiveHidePanel($event) {
    this.toggleHidePanelPopup();
  }
  public toggleHidePanelPopup() {
    this.isShowHidePanelPopup = !this.isShowHidePanelPopup;
  }
  // －全螢幕功能－
  public fullScreenSwitch() {
    if (this.isFullScreen) {
      this.closeFullscreen();
    } else {
      this.openFullscreen();
    }
    this.isFullScreen = !this.isFullScreen;
    setTimeout(() => {
      this.reloadVideo();
    }, 2000);
  }

  private openFullscreen() {
    if (this.element.requestFullscreen) {
      this.element.requestFullscreen();
    } else if (this.element.mozRequestFullScreen) {
      /* Firefox */
      this.element.mozRequestFullScreen();
    } else if (this.element.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.element.webkitRequestFullscreen();
    } else if (this.element.msRequestFullscreen) {
      /* IE/Edge */
      this.element.msRequestFullscreen();
    }
  }
  private closeFullscreen() {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }

  private reloadVideo() {
    this.store.dispatch(refreshVideoUpdate());
  }

  public hideChatRoom() {
    this.store.dispatch(chatRoomDisplayStatusToggle({
      isHideChatRoom: !this.isHideChatRoomCurrent
    }));
  }
}
