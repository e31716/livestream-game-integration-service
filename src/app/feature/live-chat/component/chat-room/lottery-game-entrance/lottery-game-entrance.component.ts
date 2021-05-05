import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { APP_CONFIG, IAppConfig } from '@core/config/app.config';
import { ConfigService } from '@core/config/config.service';
import { GameTypeEnum } from '@core/enum/gameType';
import { LimitedTimeActivities, LimitedTimeTask } from '@core/model/fish-live';
import { LiveChatService } from '@feature/live-chat/service/live-chat.service';
import { select, Store } from '@ngrx/store';
import { CommonDialogComponent } from '@shared/components/common-dialog/common-dialog.component';
import * as dayjs from 'dayjs';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { tap } from 'rxjs/internal/operators/tap';
import { Subscription } from 'rxjs/internal/Subscription';
import { AppState } from 'src/app/app-state';

@Component({
  selector: 'app-lottery-game-entrance',
  templateUrl: './lottery-game-entrance.component.html',
  styleUrls: ['./lottery-game-entrance.component.scss'],
})
export class LotteryGameEntranceComponent implements OnInit, OnDestroy {
  // 注意
  // 由於抽獎任務是最先寫的(當初沒任務管理的邏輯)
  // 所以寫法會比較不同於 點心 和 大聲公
  // 抽獎這邊的邏輯是配合自動倒數套件 ,我們只會改變抽獎任務中的“結束時間”,至於什麼時候可以觸發任務,是倒數套件倒數到0秒來決定,或者送禮直接被改變 allowOpenLotteryGame

  // 倒數設定
  public countdownConfig = { leftTime: 900, format: 'mm:ss' };
  public allowOpenLotteryGame = false; // 可以開啟抽獎遊戲視窗
  public matTooltipString = '点击说明'; // 提示文字
  public themeCode: GameTypeEnum;
  private isMobile = false;
  private showLotteryGame: boolean; // 抽獎小遊戲視窗是否已開啟
  private isSupportSendGiftFeature: boolean;// 是否有支援送禮
  // 限時任務Subscription
  private limitTimeActivitiesSubscription: Subscription;
  // 支援送禮Subscription
  private supportSendGiftSubscription: Subscription;

  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private liveChatService: LiveChatService,
    private store: Store<AppState>,
    public dialog: MatDialog,
    private configService: ConfigService) { }

  ngOnInit(): void {
    this.getThemeCode();
    this.getSupportSendGiftFeature();
    this.subscribeLimitTimeActivities();
    this.getAllowOpenLotteryGameFormStore();
    this.getLotteryScreenFormStore();
    this.isMobile = this.configService.isMobile;
  }
  ngOnDestroy(): void {
    //避免重複訂閱
    this.limitTimeActivitiesSubscription.unsubscribe();
    this.supportSendGiftSubscription.unsubscribe();
  }
  /** 處理時間到期 */
  public handleCounterEvent(e: CountdownEvent) {
    if (e.action === 'done') {
      this.liveChatService.allowOpenLotteryGameUpdate(true);
    }
  }
  /** 開啟抽獎遊戲視窗 or 開啟說明視窗 */
  public openLotteryGameView() {
    // 如果遊戲已經是開啟狀態,就不做事(例如玩家開啟一個刮刮卡後,掛網15min 都沒走,又可以玩一次)
    if (this.showLotteryGame) { return; }
    if (this.allowOpenLotteryGame !== true) {

      // 可以送禮的條件下,加入下列文字
      let canSendGiftCondition = '';
      if (this.isSupportSendGiftFeature) {
        canSendGiftCondition = ',或者送礼一次';
      }

      // 一般電腦版說明
      let dialogContent = `于活动期间内，在直播间观看满15分钟${canSendGiftCondition},即可获得与主播的亲密互动哦！成功开启刮刮卡后,鼠标移入即可刮开互动福利～`;
      if (this.isMobile) {
        // 手機版說明
        dialogContent = `于活动期间内，在直播间观看满15分钟${canSendGiftCondition},即可获得与主播的亲密互动哦！成功开启刮刮卡后,将会自动刮开互动福利～`;
      }

      // 共用dialog 開啟說明視窗
      this.dialog.open(CommonDialogComponent, {
        width: this.appConfig.popup.width,
        data: {
          title: '说明',
          content: dialogContent,
          needCancelBtn: false
        },
        panelClass: 'common-dialog-custom-modalbox',
      });
      return;
    }
    // 顯示玩遊戲的視窗
    this.liveChatService.showLotteryScreenUpdate(true);
    setTimeout(() => {
      // 0.3秒後遊戲入口關閉
      this.liveChatService.allowOpenLotteryGameUpdate(false);
      // 然後更新抽獎活動的時間 (0代表抽獎任務) (重新倒數15分鐘)
      this.liveChatService.updateActivitiesStatus(0, false, true);
    }, 300);
  }

  /** 取得是否允許點擊抽獎入口 */
  private getAllowOpenLotteryGameFormStore() {
    this.store.pipe(
      select(state => state.liveChatFeature.allowOpenLotteryGame),
      tap((allow) => {
        this.allowOpenLotteryGame = allow;
        if (allow) {
          this.matTooltipString = '点击开启';
        } else {
          this.matTooltipString = '点击说明';
        }
      })
    ).subscribe();
  }

  /** 取得是否可以開啟抽獎視窗 */
  private getLotteryScreenFormStore() {
    this.store.pipe(
      select(state => state.liveChatFeature.showLotteryScreen),
      tap((msg) => {
        this.showLotteryGame = msg;
      })
    ).subscribe();
  }

  /** 取得遊戲代號 */
  private getThemeCode() {
    this.store.pipe(
      select(state => state.liveChatFeature.themeCode),
      tap((themeCode) => {
        this.themeCode = themeCode;
      })
    ).subscribe();
  }

  /** 訂閱限時任務清單 */
  private subscribeLimitTimeActivities() {
    this.limitTimeActivitiesSubscription = this.store.pipe(
      select(state => state.liveChatFeature.limitedTimeActivitiesList),
      tap((msg) => {
        // 處理第0個任務(抽獎任務)
        this.lotteryActivitiesHandle(msg[0]);
      })
    ).subscribe();
  }

  /** 抽獎任務處理 */
  private lotteryActivitiesHandle(task: LimitedTimeActivities) {
    // 現在時間
    const currentTimeStamp = dayjs(new Date()).unix();
    // 還需要多少時間
    const diffTime = task.EndTime - currentTimeStamp;
    this.countdownConfig.leftTime = diffTime > 0 ? diffTime : 0;
    // 因為這邊是使用倒數套件,所以倒數完畢後,入口會自動打開
  }

  /** 取得是否支援送禮 */
  private getSupportSendGiftFeature() {
    this.supportSendGiftSubscription = this.store.pipe(
      select(state => state.liveChatFeature.supportSendGiftFeature),
      tap((value) => {
        this.isSupportSendGiftFeature = value;
      })
    ).subscribe();
  }
}
