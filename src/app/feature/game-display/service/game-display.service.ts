import { Injectable } from '@angular/core';
import { BalanceInfo } from '@core/model/fish-live';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-state';
import { balanceInfoUpdate } from '../store/game-display.actions';

@Injectable({
  providedIn: 'root'
})
export class GameDisplayService {

  constructor(private store: Store<AppState>) { }

  /** update */
  public updateBalance(balanceInfo: BalanceInfo) {
    this.store.dispatch(balanceInfoUpdate({ balanceInfo }));
  }
}
