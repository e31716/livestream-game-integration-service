import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/app-state';
import * as dayjs from 'dayjs';
import { LimitedTimeTask, TimeSpeaker } from '@core/model/fish-live';
import { LiveChatService } from '@feature/live-chat/service/live-chat.service';
import { showGiftPanelUpdate } from '@feature/live-chat/store/live-chat.actions';
import { Subscription } from 'rxjs';
import { ConfigService } from '@core/config/config.service';
import { MatBottomSheet, MatBottomSheetConfig, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '@feature/live-chat-room/component/bottom-sheet/bottom-sheet.component';
import { MegaphoneBottomSheetComponent } from '../../megaphone-bottom-sheet/megaphone-bottom-sheet.component';
import { GameTypeEnum } from '@core/enum/gameType';


@Component({
  selector: 'app-dessert-area',
  templateUrl: './dessert-area.component.html',
  styleUrls: ['./dessert-area.component.scss']
})
export class DessertAreaComponent implements OnInit, OnDestroy {
  public themeCode: GameTypeEnum;
  public playerOnlineTimePercent = 0;
  public dessertTask = {
    endTime: 0,
    remainTime: 0,
    cdTime: 0,
    isActive: false,
    taskTitle: ''
  };
  public megaphoneTask = {
    endTime: 0,
    remainTime: 0,
    cdTime: 0,
    isActive: false,
    taskTitle: ''
  };
  public isMobile: boolean;
  public dessertDescription = '';
  public megaphoneDescription = '';
  private showMegaphonePopup: boolean;
  private timeSpeakerSubscription: Subscription;
  private limitTimeTaskSubscription: Subscription;
  private showMegaphonePopupSubscription: Subscription;
  private supportSendGiftSubscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private liveChatService: LiveChatService,
    private changeDetectorRef: ChangeDetectorRef,
    private configService: ConfigService,
    private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
    private megaphoneBottomSheet: MatBottomSheet,
  ) { }

  ngOnInit(): void {
    this.isMobile = this.configService.isMobile;
    this.getSupportSendGiftFeature();
    this.subscribeLimitTimeTask();
    this.subscribeTimeSpeaker();
    this.getThemeCode();
    this.getIsShowMegaphonePopup();
  }

  ngOnDestroy(): void {
    this.timeSpeakerSubscription.unsubscribe();
    this.limitTimeTaskSubscription.unsubscribe();
    this.showMegaphonePopupSubscription.unsubscribe();
    this.supportSendGiftSubscription.unsubscribe();
  }

  closeGiftPanel() {
    this.store.dispatch(showGiftPanelUpdate({
      showGiftPanel: false
    }));
  }

  public sendDessertMsg() {
    this.liveChatService.updateTaskActive(0, false, true);
    this.liveChatService.sendDessertBenefitMsg();
    this.changeDetectorRef.markForCheck();
    this.closeGiftPanel();
  }

  public calcDessertPercent(): number {
    const percent = ((this.dessertTask.cdTime - this.dessertTask.remainTime) / this.dessertTask.cdTime) * 100;
    return percent;
  }

  public calcMegaPhonePercent(): number {
    const percent = ((this.megaphoneTask.cdTime - this.megaphoneTask.remainTime) / this.megaphoneTask.cdTime) * 100;
    return percent;
  }

  public toggleMegaphonePopup() {
    if (this.showMegaphonePopup) { return; }
    setTimeout(() => {
      this.liveChatService.showMegaphonePopupUpdate(true);
    }, 100);
    this.closeGiftPanel();
  }

  public openMegaphoneBottomSheet(): void {
    if (this.themeCode === 'default') {
      this.bottomSheetRef.dismiss();

      const config: MatBottomSheetConfig = {
        panelClass: 'megaphone-bottom-sheet',
        autoFocus: false
      };

      this.liveChatService.updateMegaphoneBottomSheetSignalNumber();
      this.megaphoneBottomSheet.open(MegaphoneBottomSheetComponent, config);
    } else {
      this.toggleMegaphonePopup();
    }
  }

  private subscribeLimitTimeTask() {
    this.limitTimeTaskSubscription = this.store.pipe(
      select(state => state.liveChatFeature.limitedTimeTaskList),
      tap((msg) => {
        this.dessertTeskHandle(msg[0]);
        this.megaphoneHandle(msg[1]);

        this.changeDetectorRef.markForCheck();
      })
    ).subscribe();
  }

  private subscribeTimeSpeaker() {
    this.timeSpeakerSubscription = this.store.pipe(
      select(state => state.liveChatFeature.timeSpeaker),
      tap((msg) => {
        if (msg.CurrentTimeStamp === 0) { return; }
        const playerOnlineTime = msg.ContinuouslyOnlineSec;
        if (playerOnlineTime > 3600) {
          this.playerOnlineTimePercent = 100;
        } else {
          this.playerOnlineTimePercent = (playerOnlineTime / 3600) * 100;
        }
        this.dessertRemainTimeUpdate(msg);
        this.megaphoneRemainTimeUpdate(msg);

        this.changeDetectorRef.markForCheck();
      })
    ).subscribe();
  }

  private dessertTeskHandle(task: LimitedTimeTask) {
    const currentTimeStamp = dayjs(new Date()).unix();
    const diffTime = task.EndTime - currentTimeStamp;
    this.dessertTask = {
      endTime: task.EndTime,
      remainTime: diffTime > 0 ? diffTime : 0,
      cdTime: task.TaskCDTime,
      isActive: task.CanActive,
      taskTitle: ''
    };
  }

  private megaphoneHandle(task: LimitedTimeTask) {
    const currentTimeStamp = dayjs(new Date()).unix();
    const diffTime = task.EndTime - currentTimeStamp;
    this.megaphoneTask = {
      endTime: task.EndTime,
      remainTime: diffTime > 0 ? diffTime : 0,
      cdTime: task.TaskCDTime,
      isActive: task.CanActive,
      taskTitle: ''
    };
  }

  private dessertRemainTimeUpdate(msg: TimeSpeaker) {
    const timeDiff = this.dessertTask.endTime - msg.CurrentTimeStamp;
    this.dessertTask.remainTime = timeDiff > 0 ? timeDiff : 0;
  }

  private megaphoneRemainTimeUpdate(msg: TimeSpeaker) {
    const timeDiff = this.megaphoneTask.endTime - msg.CurrentTimeStamp;
    this.megaphoneTask.remainTime = timeDiff > 0 ? timeDiff : 0;
  }

  private getThemeCode() {
    this.store.pipe(
      select(state => state.liveChatFeature.themeCode),
      tap((themeCode) => {
        this.themeCode = themeCode;
      })
    ).subscribe();
  }

  private getIsShowMegaphonePopup() {
    this.showMegaphonePopupSubscription = this.store.pipe(
      select(state => state.liveChatFeature.isShowMegaphonePopup),
      tap((isShowMegaphonePopup) => {
        this.showMegaphonePopup = isShowMegaphonePopup;
      }
      )).subscribe();
  }

  private getSupportSendGiftFeature() {
    this.supportSendGiftSubscription = this.store.pipe(
      select(state => state.liveChatFeature.supportSendGiftFeature),
      tap((value) => {
        if (value) {
          this.megaphoneDescription = '观看直播30分钟或花费50元送礼即可获得一支全服大喇叭';
        } else {
          this.megaphoneDescription = '观看直播30分钟即可获得一支全服大喇叭';
        }
      })
    ).subscribe();
  }
}
