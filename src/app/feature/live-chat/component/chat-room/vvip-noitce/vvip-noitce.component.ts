import { Component, OnDestroy, OnInit } from '@angular/core';
import { springInOutAnimation } from '@core/animation/animation';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app-state';
import { tap } from 'rxjs/operators';
import { PlayerLogged } from '@core/model/live-chat-room';
import { Subscription } from 'rxjs';
import { GameTypeEnum } from '@core/enum/gameType';
@Component({
  selector: 'app-vvip-noitce',
  templateUrl: './vvip-noitce.component.html',
  styleUrls: ['./vvip-noitce.component.scss', './vvip-noitce.dsg.component.scss'],
  animations: [
    springInOutAnimation,
  ],
})
export class VvipNoitceComponent implements OnInit, OnDestroy {
  vvipNoticeList: PlayerLogged[];
  public themeCode: GameTypeEnum;
  private vvipNoticeListSubscription: Subscription;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.getThemeCode();
    this.getVvipNoticeList();
  }

  ngOnDestroy(): void {
    this.vvipNoticeListSubscription.unsubscribe();
  }

  private getVvipNoticeList() {
    this.vvipNoticeListSubscription = this.store.pipe(
      select(state => state.liveChatFeature.vvipNoticeList),
      tap((vvipNoticeList) => {
        this.vvipNoticeList = vvipNoticeList;
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
}
