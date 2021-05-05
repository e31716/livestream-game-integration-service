import { Component, OnInit, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/app-state';
@Component({
  selector: 'app-vip-rank',
  templateUrl: './vip-rank.component.html',
  styleUrls: ['./vip-rank.component.scss', './vip-rank.dsg.component.scss']
})
export class VipRankComponent implements OnInit {
  @Input() Rank = 0;
  public gameType: string;

  vipRankColor = [
    'linear-gradient(to right, #686868 32%, #b1aeae 100%)',
    'linear-gradient(to right, #07a15d 32%, #4ecfa6 100%)',
    'linear-gradient(to right, #0396ff 32%, #96d3ff 100%)',
    'linear-gradient(to right, #4a92a6 32%, #30cfd0 100%)',
    'linear-gradient(to right, #6590cb 32%, #b4cbf6 100%)',
    'linear-gradient(to right, #f74747 32%, #f68f8f 100%)',
    'linear-gradient(to right, #2bb9be 32%, #18f576 100%)',
    'linear-gradient(to right, #736efe 32%, #5efce8 100%)',
    'linear-gradient(to right, #7683d9 32%, #d8a0fe 100%)',
    'linear-gradient(to right, #78178e 32%, #d942fa 100%)',
    'linear-gradient(to right, #623aa2 32%, #f97794 100%)',
    'linear-gradient(to right, #db8ade 32%, #f6bf9f 100%)',
    'linear-gradient(to right, #ff7a95 32%, #ffb696 100%)',
    'linear-gradient(to right, #f5576c 32%, #f093fb 100%)',
    'linear-gradient(to right, #bb4e75 32%, #ff9d6c 100%)',
    'linear-gradient(to right, #f37987 52%, #75fbf0 100%)',
    'linear-gradient(to right, #b490ca 32%, #5ee7df 100%)',
    'linear-gradient(to right, #ffd015 32%, #8be8f9 100%)',
    'linear-gradient(to right, #fa813f 32%, #ffe159 100%)',
    'linear-gradient(to right, #f75867 32%, #ffa043 100%)',
  ];
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.getGameType();
  }

  /** 取得遊戲代號 */
  private getGameType() {
    this.store.pipe(
      select(state => state.liveChatFeature.gameType),
      tap((gameType) => {
        this.gameType = gameType;
      })
    ).subscribe();
  }
}
