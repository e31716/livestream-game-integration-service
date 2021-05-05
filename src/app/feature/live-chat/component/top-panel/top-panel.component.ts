import { Component, OnInit } from '@angular/core';
import { ConfigService } from '@core/config/config.service';
import { GameTypeEnum } from '@core/enum/gameType';
import { LiveChatService } from '@feature/live-chat/service/live-chat.service';
import { select, Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/app-state';

@Component({
  selector: 'app-top-panel',
  templateUrl: './top-panel.component.html',
  styleUrls: ['./top-panel.component.scss', './top-panel.dsg.component.scss']
})
export class TopPanelComponent implements OnInit {

  public isMobile: boolean;
  public isShowTopMenuPopup: boolean;
  public themeCode: GameTypeEnum;
  private currentshowAloneChatPanelState: boolean;
  public isHideChatRoom: boolean;

  constructor(
    private liveChatService: LiveChatService,
    private configService: ConfigService,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.isMobile = this.configService.isMobile || this.configService.isTablet;
    this.getAloneChatPanelState();
    this.getIsShowTopMenuPopup();
    this.getThemeCode();
    this.getIsHideChatRoom();
  }


  public toggleMenuPopup() {
    if (this.isShowTopMenuPopup) { return; }
    setTimeout(() => {
      this.liveChatService.IsShowTopMenuPopupUpdate(!this.isShowTopMenuPopup);
    }, 100);
  }

  public openAloneChatPanel() {
    if (this.currentshowAloneChatPanelState) { return; }
    setTimeout(() => {
      this.liveChatService.showAloneChatPanelUpdate(true);
    }, 100);
  }

  public closeMenuPopup($event) {
    if ($event && this.isShowTopMenuPopup) {
      this.liveChatService.IsShowTopMenuPopupUpdate(false);
    }
  }

  private getAloneChatPanelState() {
    this.store.pipe(
      select(state => state.liveChatFeature.showAloneChatPanel),
      tap((showAloneChatPanel) => {
        this.currentshowAloneChatPanelState = showAloneChatPanel;
      }
      )).subscribe();
  }

  private getIsShowTopMenuPopup() {
    this.store.pipe(
      select(state => state.liveChatFeature.isShowTopMenuPopup),
      tap((isShowTopMenuPopup) => {
        this.isShowTopMenuPopup = isShowTopMenuPopup;
      }
      )).subscribe();
  }

  private getThemeCode() {
    this.store.pipe(
      select(state => state.liveChatFeature.themeCode),
      tap((themeCode) => {
        this.themeCode = themeCode;
      })
    ).subscribe();
  }

  private getIsHideChatRoom() {
    this.store.pipe(
      select(state => state.liveChatFeature.isHideChatRoom),
      tap((isHideChatRoom) => {
        this.isHideChatRoom = isHideChatRoom;
      })
    ).subscribe();
  }
}
