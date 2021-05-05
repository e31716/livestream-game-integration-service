import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ConfigService } from '@core/config/config.service';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app-state';
import { inOutAnimation, verticalInOutAnimation } from '@core/animation/animation';
import { tap } from 'rxjs/operators';
import { showGiftPanelUpdate, showSocialSharePanelUpdate } from './store/live-chat.actions';
import { LiveChatService } from './service/live-chat.service';
import { GameCustomService } from './service/game-custom.service';
import { GameTypeEnum } from '@core/enum/gameType';
import { GameLiveLayout } from '@core/enum/gameLiveLayout';
import { LotteryObjectResp } from '@core/model/live-chat-room';

@Component({
  selector: 'app-live-chat',
  templateUrl: './live-chat.component.html',
  styleUrls: ['./live-chat.component.scss'],
  animations: [
    verticalInOutAnimation,
    inOutAnimation,
  ],
})

export class LiveChatComponent implements OnInit, AfterViewInit {
  /** to control child components' visibility */
  @Input() gameType: GameTypeEnum;
  @Input() themeCode: GameTypeEnum = GameTypeEnum.DEFAULT;
  /** is embedded game display */
  @Input() buildinGameDisplay = false;
  /** Layout Type */
  @Input() gameLiveLayout: GameLiveLayout;
  @ViewChild('liveChat') liveChat: ElementRef;

  public hideAnchor: boolean;
  public isIphone: boolean;
  public isMobile: boolean;
  public showGiftPanel: boolean;
  public showSocialSharePanel: boolean;
  public isShowTopMenuPopup: boolean;
  public gameLayerTop: boolean;
  public isHideChatRoom: boolean;
  public showAloneChatPanel: boolean;
  public gameTypeEnum: any;
  public showAnchorInfoPanel: boolean;
  public showMegaphonePopup: boolean;
  public showLotteryGame: boolean;
  public scratchCardConfig = {
    theme: '',
    awards: [],
    chatRoomWidth: 0,
  };

  constructor(
    private configService: ConfigService,
    private liveChatService: LiveChatService,
    private gameCustomService: GameCustomService,
    private store: Store<AppState>,
    private renderer: Renderer2) { }

  ngOnInit(): void {
    // enum convert to object
    this.gameTypeEnum = Object.assign(GameTypeEnum, {});
    this.isIphone = this.configService.deviceInfo.device === 'iPhone' ||
      this.configService.deviceInfo.device === 'iPad';
    this.isMobile = this.configService.isMobile || this.configService.isTablet;
    this.getHideAnchor();
    this.getShowGiftPanelFromStore();
    this.getShowSoicalSharePanel();
    this.getShowAloneChatPanel();
    this.getIsShowTopMenuPopup();
    this.getIsShowAnchorInfoPanel();
    this.getIsShowMegaphonePopup();
    this.getLotteryScreenFormStore();
    this.getLotterySubjectContent();

    this.storeGameType(this.gameType);
    this.storeThemeCode(this.themeCode);
    this.storeBuildinGameDisplay(this.buildinGameDisplay);

    this.store.pipe(
      select(state => state.liveChatFeature),
      tap((liveChatFeature) => {
        this.gameLayerTop = liveChatFeature.gameLayerTop;
        this.isHideChatRoom = liveChatFeature.isHideChatRoom;
      })
    ).subscribe();
  }

  ngAfterViewInit() {
    this.setCompHeight();
    this.getChatRoomWidth();
  }

  public closeGiftPanel($event) {
    if ($event && this.showGiftPanel) {
      this.store.dispatch(showGiftPanelUpdate({
        showGiftPanel: false,
      }));
    }
  }

  public closeSocialSharePanel($event) {
    if ($event && this.showSocialSharePanel) {
      this.store.dispatch(showSocialSharePanelUpdate({
        showSocialSharePanel: false,
      }));
    }
  }

  public closeAloneChatPanel($event) {
    if ($event && this.showAloneChatPanel) {
      this.liveChatService.showAloneChatPanelUpdate(false);
    }
  }

  public closeAnchorInfoPanel($event) {
    if ($event && this.showAnchorInfoPanel) {
      this.liveChatService.showAnchorInfoPanelUpdate(false);
    }
  }

  public storeGameType(gameType) {
    this.liveChatService.storeGameType(gameType);
  }

  public storeThemeCode(themeCode) {
    this.liveChatService.storeThemeCode(themeCode);
  }

  public storeBuildinGameDisplay(setting) {
    this.liveChatService.buildinGameDisplayUpdate(setting);
  }

  public closeMegaphonePopup($event) {
    if ($event && this.showMegaphonePopup) {
      this.liveChatService.showMegaphonePopupUpdate(false);
    }
  }

  private getShowGiftPanelFromStore() {
    this.store.pipe(
      select(state => state.liveChatFeature.showGiftPanel),
      tap((isShowGiftPanel) => {
        this.showGiftPanel = isShowGiftPanel;
      })
    ).subscribe();
  }

  private getShowSoicalSharePanel() {
    this.store.pipe(
      select(state => state.liveChatFeature.showSocialSharePanel),
      tap((isShowSocialSharePanel) => {
        this.showSocialSharePanel = isShowSocialSharePanel;
      })
    ).subscribe();
  }

  private getShowAloneChatPanel() {
    this.store.pipe(
      select(state => state.liveChatFeature.showAloneChatPanel),
      tap((showAloneChatPanel) => {
        this.showAloneChatPanel = showAloneChatPanel;
      })
    ).subscribe();
  }

  private getIsShowTopMenuPopup() {
    this.store.pipe(
      select(state => state.liveChatFeature.isShowTopMenuPopup),
      tap((isShowTopMenuPopup) => {
        this.isShowTopMenuPopup = isShowTopMenuPopup;
      }
      )).subscribe();
  }

  private getHideAnchor() {
    this.store.pipe(select(state => state.shareFeature.hideAnchor), tap((hideAnchor) => {
      this.hideAnchor = hideAnchor;
    })).subscribe();
  }

  private getIsShowAnchorInfoPanel() {
    this.store.pipe(
      select(state => state.liveChatFeature.isShowAnchorInfoPanel),
      tap((isShowAnchorInfoPanel) => {
        this.showAnchorInfoPanel = isShowAnchorInfoPanel;
      }
      )).subscribe();
  }

  private setCompHeight() {
    if (this.gameLiveLayout === GameLiveLayout.DLMP && this.isMobile) {
      this.renderer.setStyle(this.liveChat.nativeElement, 'height', `${window.innerHeight}px`);
    }
  }
  private getLotteryScreenFormStore() {
    this.store.pipe(
      select(state => state.liveChatFeature.showLotteryScreen),
      tap((msg) => {
        if (msg === true) {
          this.getChatRoomWidth();
        }
        this.showLotteryGame = msg;
      })
    ).subscribe();
  }

  private getIsShowMegaphonePopup() {
    this.store.pipe(
      select(state => state.liveChatFeature.isShowMegaphonePopup),
      tap((isShowMegaphonePopup) => {
        this.showMegaphonePopup = isShowMegaphonePopup;
      }
      )).subscribe();
  }

  private getLotterySubjectContent() {
    this.liveChatService.getLotterySubject().subscribe((resp: LotteryObjectResp) => {
      this.scratchCardConfig.theme = resp.Theme;
      this.scratchCardConfig.awards = resp.Awards;
    });
  }

  private getChatRoomWidth() {
    this.scratchCardConfig.chatRoomWidth = this.liveChat.nativeElement.clientWidth;
  }
}
