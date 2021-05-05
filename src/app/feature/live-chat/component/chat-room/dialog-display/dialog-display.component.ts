import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  Input,
  AfterViewInit,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { slideEnterAnimation, inOutAnimation } from '@core/animation/animation';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app-state';
import { tap, switchMap, scan, takeWhile } from 'rxjs/operators';
import { ChatMessage } from '@core/model/live-chat-room';
import { PlayerSendGiftResp } from '@core/model/fish-live';
import { Subject, interval, Subscription } from 'rxjs';
import { GameTypeEnum } from '@core/enum/gameType';
import { ActivityFeatureCode } from '@core/enum/response';

@Component({
  selector: 'app-dialog-display',
  templateUrl: './dialog-display.component.html',
  styleUrls: ['./dialog-display.component.scss', './dialog-display.dsg.component.scss'],
  animations: [
    slideEnterAnimation,
    inOutAnimation,
  ]
})
export class DialogDisplayComponent implements OnInit, AfterViewInit, OnDestroy {
  /** 可捲動容器 */
  @ViewChild('dialogDisplay') dialogDisplayElement: ElementRef;
  @Output() sendTagUser = new EventEmitter<string>();
  /** 是否要讓禮物訊息折行顯示 */
  @Input() giftMessageNewlineInMobile: boolean;

  public themeCode: GameTypeEnum;
  /** 顯示滾動至底部按鈕 */
  public showScrollBtn = false;
  /** 聊天訊息清單 */
  public chatMessageList: ChatMessage[] | PlayerSendGiftResp[];
  /** 是否自動下拉 */
  private isAutoScrollToBottom: boolean;
  private scrollToSorce$: Subject<number> = new Subject<number>();
  /** 向下滾動,每0.x秒要滾動的距離 */
  private perMillisecondOffsetY = 10;
  private signalNumberSubscription: Subscription;
  private currentChatListSubscription: Subscription;
  private scrollToSorceSubscription: Subscription;
  constructor(
    private store: Store<AppState>,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.isAutoScrollToBottom = true;
    this.giftMessageNewlineInMobile = !!this.giftMessageNewlineInMobile;
    this.getThemeCode();
  }
  ngAfterViewInit(): void {
    this.getChatMessageList();
    this.listenScrollSubject();
    this.getSignalNumber();
  }

  ngOnDestroy(): void {
    this.signalNumberSubscription.unsubscribe();
    this.currentChatListSubscription.unsubscribe();
    this.scrollToSorceSubscription.unsubscribe();
  }

  /** for ngFor trackBy */
  public trackByFn(index, item) {
    return index; // or item.name
  }
  /**
   * 標記用戶
   */
  public tagUser(userName) {
    this.sendTagUser.emit(userName);
  }
  /** Scroll 後取消或開啟自動捲動功能 */
  public onScroll(event) {

    // 若保持在底部就自動 scroll
    if (this.isScrollToBototm()) {
      this.isAutoScrollToBottom = true;
      this.showScrollBtn = false;
    } else {
      this.isAutoScrollToBottom = false;
    }
  }
  /** 手動觸發,滾動至底部 */
  public clickScrollToBottom() {
    // 底部的位置
    const offset = this.dialogDisplayElement.nativeElement.scrollHeight - this.dialogDisplayElement.nativeElement.offsetHeight;
    // 計算每15毫秒要滾動多少距離
    this.perMillisecondOffsetY = Math.round((offset - this.dialogDisplayElement.nativeElement.scrollTop) / 15);
    // 發送滾動事件
    this.scrollToSorce$.next(offset);
  }

  /** 訊息類型屬於哪種(ex:玩家,主播,禮物..等) */
  public msgCategory(type: string, item: any): boolean {
    // 戳戳樂訊息
    if (item.MessageId === ActivityFeatureCode.POKE_USER) {
      return type === 'pokeUser';
    }

    // 大聲公訊息
    if (item.MessageId === ActivityFeatureCode.MEGAPHONE) {
      return type === 'megaphone';
    }

    // 點心訊息
    if (item.MessageId === ActivityFeatureCode.DESSERT) {
      return type === 'dessert';
    }

    // 如果是登入訊息
    if (item.MessageId === ActivityFeatureCode.PLAYER_LOGIN) {
      return type === 'notice';
    }

    if (item.GiftId !== undefined) {
      return type === 'gift';
    }

    if (item.IsAnchor === true) {
      return type === 'anchor';
    }

    if (item.IsAnchor === false) {
      return type === 'player';
    }
  }

  /**
   * scroll to bottom when mew msg comes
   */
  private scrollToBototm() {
    if (!this.isAutoScrollToBottom) { return; }
    setTimeout(() => {
      this.dialogDisplayElement.nativeElement.scrollTop =
        (this.dialogDisplayElement.nativeElement.scrollHeight - this.dialogDisplayElement.nativeElement.offsetHeight);
    }, 100);

  }
  /**
   * 判斷內容是否已到最底部
   * @description 只要顯示區卷至距離底部小於 20px 就算底部
   */
  private isScrollToBototm() {
    return this.dialogDisplayElement.nativeElement.scrollHeight
      - (this.dialogDisplayElement.nativeElement.scrollTop + this.dialogDisplayElement.nativeElement.offsetHeight)
      < 20;
  }
  /** 顯示滾動至底部按鈕 */
  private showScrollToBottomBtn() {
    if (this.isScrollToBototm()) {
      this.showScrollBtn = false;
    } else {
      this.showScrollBtn = true;
    }
  }
  /** 監聽滾動,做滾動動畫 */
  private listenScrollSubject() {
    this.scrollToSorceSubscription = this.scrollToSorce$.pipe(switchMap(targetYPos =>
      interval(15).pipe(
        scan((acc, curr) => acc + this.perMillisecondOffsetY, this.dialogDisplayElement.nativeElement.scrollTop),
        takeWhile(val => val < targetYPos + this.perMillisecondOffsetY)),
    )).subscribe(position => this.dialogDisplayElement.nativeElement.scrollTo(0, position));
  }

  /** 取得聊天內容資料 */
  private getChatMessageList() {
    // View 準備好才執行監聽, 不然會出現 nativeElement undefined
    this.currentChatListSubscription = this.store.pipe(
      select(state => state.liveChatFeature.currentChatList),
      tap((msg) => {
        this.chatMessageList = msg;
        this.scrollToBototm();
        this.showScrollToBottomBtn();
        this.changeDetectorRef.markForCheck();
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

  private getSignalNumber() {
    this.signalNumberSubscription = this.store.pipe(
      select(state => state.liveChatFeature.signalNumber),
      tap((msg) => {
        // 收到開啟bottomSheet的訊號,=>滾動到底部
        this.clickScrollToBottom();
      })
    ).subscribe();
  }
}
