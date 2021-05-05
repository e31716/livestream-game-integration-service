import { Component, OnDestroy, OnInit } from '@angular/core';
import { AnchorLobbyInfoDetail } from '@core/model/live-chat-room';
import { LiveChatService } from '@feature/live-chat/service/live-chat.service';
import { tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app-state';
import { ConfigService } from '@core/config/config.service';
import { Subscription } from 'rxjs';
import { GameTypeEnum } from '@core/enum/gameType';
import { pokePanelAnimation } from '@core/animation/animation';

@Component({
  selector: 'app-anchor-info',
  templateUrl: './anchor-info.component.html',
  styleUrls: ['./anchor-info.component.scss', './anchor-info.dsg.component.scss'],
  animations: [
    pokePanelAnimation
  ]
})
export class AnchorInfoComponent implements OnInit, OnDestroy {

  public anchorInfo: AnchorLobbyInfoDetail;
  public anchorAvatarUrl: string;
  public canLike: boolean;
  public anchorName: string;
  public followCount: number;
  public starValue: number;
  public themeCode: GameTypeEnum;
  public isShowPoke = false;
  private showAnchorInfoPanel: boolean;
  private pokeTimer: any;
  private anchorLobbyInfoSubscription: Subscription;
  private showAnchorInfoPanelSubscription: Subscription;

  constructor(
    private liveChatService: LiveChatService,
    private configService: ConfigService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.getThemeCode();
    this.getAnchorLobbyInfo();
    this.getIsShowAnchorInfoPanel();
    this.subscribePokePanel();
  }

  ngOnDestroy(): void {
    this.anchorLobbyInfoSubscription.unsubscribe();
    this.showAnchorInfoPanelSubscription.unsubscribe();
  }

  public likeAnchor() {
    this.liveChatService.likeAnchor();
  }
  public unlikeAnchor() {
    this.liveChatService.unlikeAnchor();
  }

  protected toggleCanLikeStatus() {
    this.canLike = !this.canLike;
  }
  public toggleAnchorInfoPopup() {
    if (this.showAnchorInfoPanel) { return; }
    setTimeout(() => {
      this.liveChatService.showAnchorInfoPanelUpdate(true);
    }, 100);
  }

  private getThemeCode() {
    this.store.pipe(
      select(state => state.liveChatFeature.themeCode),
      tap((themeCode) => {
        this.themeCode = themeCode;
      })
    ).subscribe();
  }

  private getIsShowAnchorInfoPanel() {
    this.showAnchorInfoPanelSubscription = this.store.pipe(
      select(state => state.liveChatFeature.isShowAnchorInfoPanel),
      tap((isShowAnchorInfoPanel) => {
        this.showAnchorInfoPanel = isShowAnchorInfoPanel;
      }
      )).subscribe();
  }

  private getAnchorLobbyInfo() {
    this.anchorLobbyInfoSubscription = this.store.pipe(
      select(state => state.liveChatRoomFeature.anchorLobbyInfo),
      tap((msg) => {
        const anchorInfo = msg;
        this.anchorName = anchorInfo.NickName;
        this.anchorAvatarUrl = this.anchorName === '-' ? 'assets/img/anchor-avatar.png' :
          `${this.configService.CDN_URL}${anchorInfo.Name}_m.jpg`;
        this.followCount = anchorInfo.FollowCount;
        this.starValue = anchorInfo.StarValue;
        this.canLike = anchorInfo.CanLike;
      })
    ).subscribe();
  }

  private subscribePokePanel() {
    this.store.pipe(
      select(state => state.liveChatFeature.isShowPokePanel),
      tap((msg) => {
        this.isShowPoke = msg;

        if (msg) {
          this.pokeTimer = setTimeout(() => {
            this.liveChatService.showPokePanelUpdate(false);
          }, 120000);
        } else {
          clearTimeout(this.pokeTimer)
        }
      })
    ).subscribe();
  }
}
