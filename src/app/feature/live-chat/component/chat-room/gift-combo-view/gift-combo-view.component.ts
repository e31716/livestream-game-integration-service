import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app-state';
import { PlayerGiftCombo, PlayerSendGiftResp } from '@core/model/fish-live';
import { tap } from 'rxjs/operators';
import { smallGiftInOutAnimation, springInOutAnimation } from '@core/animation/animation';
import { Subscription } from 'rxjs';
import { GameTypeEnum } from '@core/enum/gameType';
@Component({
  selector: 'app-gift-combo-view',
  templateUrl: './gift-combo-view.component.html',
  styleUrls: ['./gift-combo-view.component.scss', './gift-combo-view.dsg.component.scss'],
  animations: [
    springInOutAnimation,
    smallGiftInOutAnimation,
  ],
})
export class GiftComboViewComponent implements OnInit, OnDestroy {

  public giftNoticeList: PlayerSendGiftResp[];
  public giftComboCount: PlayerGiftCombo[];
  public themeCode: GameTypeEnum;
  private giftComboRelatedSubscription: Subscription;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.getThemeCode();
    this.getGiftComboRelated();
  }

  ngOnDestroy(): void {
    this.giftComboRelatedSubscription.unsubscribe();
  }

  private getGiftComboRelated() {
    this.store.pipe(
      select(state => state.liveChatFeature),
      tap((liveChatFeature) => {
        this.giftNoticeList = liveChatFeature.giftNoticeList;
        this.giftComboCount = liveChatFeature.giftComboCount;
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
