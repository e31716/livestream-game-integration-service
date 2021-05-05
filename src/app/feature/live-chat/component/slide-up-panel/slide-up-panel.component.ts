import { Component, OnDestroy, OnInit } from '@angular/core';
import { LimitedTimeTask } from '@core/model/fish-live';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/app-state';

@Component({
  selector: 'app-slide-up-panel',
  templateUrl: './slide-up-panel.component.html',
  styleUrls: ['./slide-up-panel.component.scss']
})
export class SlideUpPanelComponent implements OnInit, OnDestroy {

  public areaList = [{ area: 'gift-area', name: '送礼物', badge: false }, { area: 'dessert-area', name: '活跃奖励', badge: false }]; // 預設值
  public isActive = this.areaList[0].area;
  private supportSendGiftSubscription: Subscription;
  private limitTimeTaskSubscription: Subscription;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.getSupportSendGiftFeature();
    this.subscribeLimitTimeTask();
  }

  ngOnDestroy(): void {
    this.supportSendGiftSubscription.unsubscribe();
    this.limitTimeTaskSubscription.unsubscribe();
  }

  public changeTab(tab) {
    this.isActive = tab;
  }

  private getSupportSendGiftFeature() {
    this.supportSendGiftSubscription = this.store.pipe(
      select(state => state.liveChatFeature.supportSendGiftFeature),
      tap((value) => {
        if (value) {
          this.areaList = [{ area: 'gift-area', name: '送礼物', badge: false }, { area: 'dessert-area', name: '活跃奖励', badge: false }];
          this.isActive = this.areaList[0].area;
        } else {
          this.areaList = [{ area: 'dessert-area', name: '活跃奖励', badge: false }];
          this.isActive = this.areaList[0].area;
        }
      })
    ).subscribe();
  }

  private subscribeLimitTimeTask() {
    this.limitTimeTaskSubscription = this.store.pipe(
      select(state => state.liveChatFeature.limitedTimeTaskList),
      tap((msg) => {
        if (msg === []) { return; }

        let isActiveNumber = 0;

        msg.forEach((task) => {
          if (task.CanActive) {
            isActiveNumber++;
          }
        })

        if (isActiveNumber === 0) {
          this.badgeUpdate(false);
        } else if (isActiveNumber >= 1) {
          this.badgeUpdate(true);
        }
      })
    ).subscribe();
  }

  private badgeUpdate(show: boolean) {
    this.areaList.forEach((area) => {
      if (area.area === 'dessert-area') {
        area.badge = show;
      }
    });
  }
}
