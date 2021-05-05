import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { GiftDetail } from '@core/model/live-chat-room';
import { horizontalSlide } from '@core/animation/animation';
import { Store, select } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/app-state';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gift-panel-m',
  templateUrl: './gift-panel-m.component.html',
  styleUrls: ['./gift-panel-m.component.scss'],
  animations: [
    horizontalSlide
  ]
})
export class GiftPanelMComponent implements OnInit, OnDestroy {
  @Output() emitGift = new EventEmitter<GiftDetail>();
  public giftListTotal: GiftDetail[];
  public selectedGift: GiftDetail | null;
  private giftListSubscription: Subscription;
  constructor(
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.selectedGift = null;

    this.giftListSubscription = this.store.pipe(
      select(state => state.liveChatFeature.giftsList),
      tap((giftsList) => {
        this.giftListTotal = giftsList;
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.giftListSubscription.unsubscribe();
  }

  public chooseGift(gift: GiftDetail) {
    this.selectedGift = gift;
  }

  public sendGift() {
    this.emitGift.emit(this.selectedGift);
    this.clearSelect();
  }

  public clearSelect() {
    this.selectedGift = null;
  }

  public checkObjEqual(obj1, obj2): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }
}
