import { Component, OnInit, OnDestroy } from '@angular/core';
import { VideoDetail } from '@core/model/live-chat-room';
import { select, Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/app-state';
import {
  chatRoomDisplayStatusToggle,
  currentVideoUpdate,
  showGiftPanelUpdate,
  showSocialSharePanelUpdate
} from '../../store/live-chat.actions';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { ConfigService } from '@core/config/config.service';
import { LiveChatService } from '@feature/live-chat/service/live-chat.service';


@Component({
  selector: 'app-bottom-panel-dsg',
  templateUrl: './bottom-panel-dsg.component.html',
  styleUrls: ['./bottom-panel-dsg.component.scss'],
  animations: [],
})
export class BottomPanelDsgComponent implements OnInit {
  isHideChatRoom$ = this.store.pipe(
    select(state => state.liveChatFeature.isHideChatRoom),
    tap((isHideChatRoom) => {
      this.isHideChatRoomCurrent = isHideChatRoom;
    })

  );

  currentVideo$ = this.store.pipe(
    select(state => state.liveChatFeature.currentVideo),
    tap((currentVideo) => {
      this.currentVideo = currentVideo;
    })
  );

  public isMobile: boolean;
  public videoSrcList: VideoDetail[];
  public isShowSwitchUrlPopup: boolean;
  public badge = false;
  public isHideChatRoom: boolean;
  private isHideChatRoomCurrent: boolean;
  private currentVideo: number;

  constructor(
    private bottomSheet: MatBottomSheet,
    private configService: ConfigService,
    private store: Store<AppState>,
    private liveChatService: LiveChatService,
  ) { }

  ngOnInit(): void {
    this.isMobile = this.configService.isMobile;

    this.store.pipe(
      select(state => state.liveChatFeature.videosList),
      tap((videosList) => {
        this.videoSrcList = videosList;
      })
    ).subscribe();
    this.subscribeLimitTimeTask();
    this.getIsHideChatRoom();
  }



  public toggleSocialSharePopup() {
    this.openSocialSharePanel();
  }

  public toggleGiftPopup() {
    this.openGiftPanel();
  }

  public toggleSwitchUrlPopup() {
    this.isShowSwitchUrlPopup = !this.isShowSwitchUrlPopup;
  }

  public switchUrl($event) {
    this.store.dispatch(currentVideoUpdate({
      currentVideo: $event,
    }));
    this.toggleSwitchUrlPopup();
  }

  public hideChatRoom() {
    this.store.dispatch(chatRoomDisplayStatusToggle({
      isHideChatRoom: !this.isHideChatRoomCurrent,
    }));
  }

  private getIsHideChatRoom() {
    this.store.pipe(
      select(state => state.liveChatFeature.isHideChatRoom),
      tap((isHideChatRoom) => {
        this.isHideChatRoom = isHideChatRoom;
      })
    ).subscribe();
  }


  private openGiftPanel(): void {
    setTimeout(() => {
      this.store.dispatch(showGiftPanelUpdate({
        showGiftPanel: true,
      }));
    }, 100);
  }

  private openSocialSharePanel() {
    setTimeout(() => {
      this.store.dispatch(showSocialSharePanelUpdate({
        showSocialSharePanel: true,
      }));
    }, 100);
  }

  /**
   * For Mobile function
   */

  public openChatAndGiftBottomSheet(): void {
    const config: MatBottomSheetConfig = {
      panelClass: 'custom-bottom-sheet',
      autoFocus: false,
    };

    this.liveChatService.updateMsgBottomSheetSignalNumber();
    this.bottomSheet.open(BottomSheetComponent, config);
  }

  private subscribeLimitTimeTask() {
    this.store.pipe(
      select(state => state.liveChatFeature.limitedTimeTaskList),
      tap((msg) => {
        if (msg === []) { return; }
        let unActiveNumber = 0;

        msg.forEach((task) => {
          if (task.CanActive) {
            this.badge = true;
          } else {
            unActiveNumber++;
          }
        });
        if (unActiveNumber === msg.length) {
          this.badge = false;
        }
      })
    ).subscribe();
  }
}


