import { Component, OnDestroy, OnInit } from '@angular/core';
import { springInOutAnimation } from '@core/animation/animation';
import { AppState } from 'src/app/app-state';
import { Store, select } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { PlayerLikeResp } from '@core/model/fish-live';
import { Subscription } from 'rxjs';
import { GameTypeEnum } from '@core/enum/gameType';
@Component({
  selector: 'app-special-notice',
  templateUrl: './special-notice.component.html',
  styleUrls: ['./special-notice.component.scss', './special-notice.dsg.component.scss'],
  animations: [
    springInOutAnimation,
  ],
})
export class SpecialNoticeComponent implements OnInit, OnDestroy {

  public anchorName: string;
  public currentLikeList: PlayerLikeResp[];
  public themeCode: GameTypeEnum;
  private anchorLobbyInfoSubscription: Subscription;
  private currentLikeListSubscription: Subscription;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.getThemeCode();
    this.getCurrentLikeList();
    this.getAnchorLobbyInfo();
  }

  ngOnDestroy(): void {
    this.anchorLobbyInfoSubscription.unsubscribe();
    this.currentLikeListSubscription.unsubscribe();
  }

  private getAnchorLobbyInfo() {
    this.anchorLobbyInfoSubscription = this.store.pipe(
      select(state => state.liveChatFeature.anchorLobbyInfo),
      tap((anchorLobbyInfo) => {
        this.anchorName = anchorLobbyInfo.NickName;
      })
    ).subscribe();
  }

  private getCurrentLikeList() {
    this.currentLikeListSubscription = this.store.pipe(select(state => state.liveChatFeature.currentLikeList), tap((currentLikeList) => {
      this.currentLikeList = currentLikeList;
    })).subscribe();
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
