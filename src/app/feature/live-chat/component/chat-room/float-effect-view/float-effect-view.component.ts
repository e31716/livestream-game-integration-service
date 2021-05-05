import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app-state';
import { PlayerSendGiftResp } from '@core/model/fish-live';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-float-effect-view',
  templateUrl: './float-effect-view.component.html',
  styleUrls: ['./float-effect-view.component.scss']
})
export class FloatEffectViewComponent implements OnInit, OnDestroy {

  public floatItemsContainer = [];
  private maxItemAmount = 25;
  private removeDataTimer: any;
  private giftNoticeListSubscription: Subscription;

  constructor(private store: Store<AppState>) { }


  ngOnInit(): void {
    this.getGiftNoticeList();
  }

  ngOnDestroy(): void {
    this.giftNoticeListSubscription.unsubscribe();
  }
  /** for ngFor trackBy */
  public trackByFn(index, item) {
    return index; // or item.name
  }

  private showFloatItemLogic() {
    for (let i = 0; i < this.maxItemAmount; i++) {
      setTimeout(() => {
        this.floatItemsContainer.push(1);
        if (this.removeDataTimer !== undefined) {
          this.resetRemoveTimer();
        }
        if (i === this.maxItemAmount - 1) {
          this.removeDataLogic();
        }
      }, 300 * i);
    }
  }

  private removeDataLogic() {
    this.removeDataTimer = setInterval(() => {
      console.log('清空漂浮愛心的list');
      this.floatItemsContainer = [];
      this.resetRemoveTimer();
    }, 6000);
  }

  private resetRemoveTimer() {
    clearInterval(this.removeDataTimer);
    this.removeDataTimer = undefined;
  }

  private getGiftNoticeList() {
    this.giftNoticeListSubscription = this.store.pipe(
      select(state => state.liveChatFeature.giftNoticeList),
    ).subscribe((giftNoticeList: PlayerSendGiftResp[]) => {
      if (giftNoticeList.length !== 0) {
        this.showFloatItemLogic();
      }
    });
  }
}
