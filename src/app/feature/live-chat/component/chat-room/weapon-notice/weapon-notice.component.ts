import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app-state';
import { Store, select } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { springInOutAnimation } from '@core/animation/animation';
import { GameTypeEnum } from '@core/enum/gameType';

@Component({
  selector: 'app-weapon-notice',
  templateUrl: './weapon-notice.component.html',
  styleUrls: ['./weapon-notice.component.scss', './weapon-notice.dsg.component.scss'],
  animations: [
    springInOutAnimation,
  ],
})
export class WeaponNoticeComponent implements OnInit {

  public anchorName: string;
  public themeCode: GameTypeEnum;

  weaponSentSuccessList$ = this.store.pipe(
    select(state => state.liveChatFeature.weaponSentSuccessList),
    tap((weaponSentSuccessList) => {
      console.log('weaponSentSuccessList: ', weaponSentSuccessList);
    })
  );

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
