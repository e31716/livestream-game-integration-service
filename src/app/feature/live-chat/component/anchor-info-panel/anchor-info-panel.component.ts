import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ConfigService } from '@core/config/config.service';
import { AnchorLobbyInfoDetail } from '@core/model/live-chat-room';
import { LiveChatService } from '@feature/live-chat/service/live-chat.service';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/app-state';


@Component({
  selector: 'app-anchor-info-panel',
  templateUrl: './anchor-info-panel.component.html',
  styleUrls: ['./anchor-info-panel.component.scss', './anchor-info-panel.dsg.component.scss']
})
export class AnchorInfoPanelComponent implements OnInit, OnDestroy {

  public anchorInfo: AnchorLobbyInfoDetail;
  public anchorAvatarUrl: string;
  public canLike: boolean;
  public anchorName: string;
  public followCount: number;
  public starValue: number;
  private anchorLobbyInfoSubscription: Subscription;
  public themeCode: string;

  constructor(
    private liveChatService: LiveChatService,
    private configService: ConfigService,
    private store: Store<AppState>,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getAnchorLobbyInfo();
    this.getThemeCode();
  }

  ngOnDestroy(): void {
    this.anchorLobbyInfoSubscription.unsubscribe();
  }

  public likeAnchor() {
    this.liveChatService.likeAnchor();
  }
  public unlikeAnchor() {
    this.liveChatService.unlikeAnchor();
  }

  public closePopup() {
    this.liveChatService.showAnchorInfoPanelUpdate(false);
  }

  private getAnchorLobbyInfo() {
    this.anchorLobbyInfoSubscription = this.store.pipe(
      select(state => state.liveChatFeature.anchorLobbyInfo),
      tap((msg) => {
        const anchorInfo = msg;
        this.anchorName = anchorInfo.NickName;
        this.anchorAvatarUrl = this.anchorName === '-' ? 'assets/img/anchor-avatar.png' :
          `${this.configService.CDN_URL}${anchorInfo.Name}_m.jpg`;
        this.followCount = anchorInfo.FollowCount;
        this.starValue = anchorInfo.StarValue;
        this.canLike = anchorInfo.CanLike;
        this.changeDetectorRef.markForCheck();
      })
    ).subscribe();
  }

  private getThemeCode() {
    this.store.pipe(
      select(state => state.liveChatFeature.themeCode),
      tap((themeCode) => {
        this.themeCode = themeCode;
      })
    ).subscribe();
  }

}
