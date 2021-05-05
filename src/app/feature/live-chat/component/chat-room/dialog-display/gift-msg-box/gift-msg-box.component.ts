import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { GameTypeEnum } from '@core/enum/gameType';
import { PlayerSendGiftResp } from '@core/model/fish-live';
import { select, Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/app-state';
@Component({
  selector: 'app-gift-msg-box',
  templateUrl: './gift-msg-box.component.html',
  styleUrls: ['./gift-msg-box.component.scss', './gift-msg-box.dsg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GiftMsgBoxComponent implements OnInit {

  @Input() item: PlayerSendGiftResp;
  public themeCode: GameTypeEnum;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.getThemeCode();
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
