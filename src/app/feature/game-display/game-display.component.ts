import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfigService } from '@core/config/config.service';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app-state';
import { tap } from 'rxjs/internal/operators/tap';
import { gameUrlUpdate } from './store/game-display.actions';
import { BalanceInfo } from '@core/model/fish-live';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-game-display',
  templateUrl: './game-display.component.html',
  styleUrls: ['./game-display.component.scss']
})
export class GameDisplayComponent implements OnInit, AfterViewInit {

  @ViewChild('iframe') iframe: ElementRef;

  public gameUrl: string;

  constructor(
    private configService: ConfigService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.gameUrl = this.configService.initGameInfo.GameUrl;
    // this.store.dispatch(gameUrlUpdate({ gameUrl: this.configService.initGameInfo.GameUrl }));
  }

  ngAfterViewInit() {
    this.getBalanceInfoFromStore();
  }

  private getBalanceInfoFromStore() {
    this.store.pipe(
      select(state => state.gameDisplayFeature.balanceInfo),
      filter((val, index) => val.BalanceSeq !== -1),
      tap((balanceInfo) => {
        this.seedBalanceUpdateToDsgGame(balanceInfo);
      })
    ).subscribe();
  }

  private seedBalanceUpdateToDsgGame(balanceInfo: BalanceInfo) {
    const url = new URL(this.configService.initGameInfo.GameUrl);
    const gameOrigin = `${url.protocol}//${url.host}`;
    const iframe = this.iframe.nativeElement.contentDocument || this.iframe.nativeElement.contentWindow;
    // postMessage arguments: data to send, target origin
    // {"type":"anchor_balance_update","message":{"balance":399999,"balanceSeq":11111}}
    const postData = {
      type: 'anchor_balance_update',
      message: {
        balance: balanceInfo.Balance,
        balanceSeq: balanceInfo.BalanceSeq,
      }
    };
    console.log(JSON.stringify(postData), `targetOrigin: ${gameOrigin}`);
    iframe.postMessage(postData, gameOrigin);
  }
}
