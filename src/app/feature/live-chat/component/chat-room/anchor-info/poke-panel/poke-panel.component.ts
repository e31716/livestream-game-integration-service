import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app-state';
import { GameTypeEnum } from '@core/enum/gameType';
import { Subscription } from 'rxjs';
import { ConfigService } from '@core/config/config.service';
import { LiveChatService } from '@feature/live-chat/service/live-chat.service';

@Component({
  selector: 'app-poke-panel',
  templateUrl: './poke-panel.component.html',
  styleUrls: ['./poke-panel.component.scss']
})
export class PokePanelComponent implements OnInit {

  public anchorAvatarUrl: string;
  public anchorName: string;
  public themeCode: GameTypeEnum;
  private showAnchorInfoPanel: boolean;
  private anchorLobbyInfoSubscription: Subscription;

  constructor(
    private liveChatService: LiveChatService,
    private configService: ConfigService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.getAnchorLobbyInfo();
    this.getThemeCode();
  }

  public toggleAnchorInfoPopup() {
    if (this.showAnchorInfoPanel) { return; }
    setTimeout(() => {
      this.liveChatService.showAnchorInfoPanelUpdate(true);
    }, 100);
  }

  public sendPokeUserMessage() {
    this.liveChatService.sendPokeUserMessage();
  }

  private getThemeCode() {
    this.store.pipe(
      select(state => state.liveChatFeature.themeCode),
      tap((themeCode) => {
        this.themeCode = themeCode;
      })
    ).subscribe();
  }

  private getAnchorLobbyInfo() {
    this.anchorLobbyInfoSubscription = this.store.pipe(
      select(state => state.liveChatRoomFeature.anchorLobbyInfo),
      tap((msg) => {
        const anchorInfo = msg;
        this.anchorName = anchorInfo.NickName;
        this.anchorAvatarUrl = this.anchorName === '-' ? 'assets/img/anchor-avatar.png' :
          `${this.configService.CDN_URL}${anchorInfo.Name}_m.jpg`;
      })
    ).subscribe();
  }

}
