import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameTypeEnum } from '@core/enum/gameType';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/app-state';

@Component({
  selector: 'app-top-left-penal',
  templateUrl: './top-left-penal.component.html',
  styleUrls: [
    './top-left-penal.component.scss',
    './top-left-penal.dsg.component.scss',
  ]
})
export class TopLeftPenalComponent implements OnInit, OnDestroy {

  public themeCode: GameTypeEnum;
  private themeCodeSubscription: Subscription;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.getGameType();
  }

  ngOnDestroy(): void {
    this.themeCodeSubscription.unsubscribe();
  }

  private getGameType() {
    this.themeCodeSubscription = this.store.pipe(
      select(state => state.liveChatFeature.themeCode),
      tap((themeCode) => {
        this.themeCode = themeCode;
      })
    ).subscribe();
  }

}
