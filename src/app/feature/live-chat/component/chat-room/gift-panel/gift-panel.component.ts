import { Component, OnInit } from '@angular/core';
import { GiftDetail, GiftListSlideStatus } from '@core/model/live-chat-room';
import { horizontalSlide } from '@core/animation/animation';
import { Store, select } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/app-state';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { GiftBottomSheetComponent } from '../../gift-bottom-sheet/gift-bottom-sheet.component';
import { LiveChatService } from '@feature/live-chat/service/live-chat.service';

@Component({
  selector: 'app-gift-panel',
  templateUrl: './gift-panel.component.html',
  styleUrls: ['./gift-panel.component.scss'],
  animations: [
    horizontalSlide
  ]
})
export class GiftPanelComponent implements OnInit {
  // @Output() emitGift = new EventEmitter<GiftDetail>();
  public giftListTotal: GiftDetail[];
  // public giftListLeft: GiftDetail[];
  // public giftListRight: GiftDetail[] | null;
  public listStatus: GiftListSlideStatus;
  public selectedGift: GiftDetail | null;

  constructor(
    private store: Store<AppState>,
    private bottomSheetRef: MatBottomSheetRef<GiftBottomSheetComponent>,
    private liveChatService: LiveChatService,
  ) { }

  ngOnInit(): void {
    this.selectedGift = null;

    this.store.pipe(
      select(state => state.liveChatFeature.giftsList),
      tap((giftsList) => {
        this.giftListTotal = giftsList;
      })
    ).subscribe();
  }

  chooseGift(gift: GiftDetail) {
    this.selectedGift = gift;
  }
  sendGift() {
    const id = this.selectedGift.Id;
    const value = this.selectedGift.Value;
    this.liveChatService.sendGift(id, value);
    this.clearSelect();
    this.closeBottomSheet();
  }

  clearSelect() {
    this.listStatus = 'left';
    this.selectedGift = null;
  }

  checkObjEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  public closeBottomSheet() {
    this.bottomSheetRef.dismiss();
  }
}
