import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GiftDetail, GiftListSlideStatus } from '@core/model/live-chat-room';
import { Store, select } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/app-state';
import { showGiftPanelUpdate } from '@feature/live-chat/store/live-chat.actions';
import { LiveChatService } from '@feature/live-chat/service/live-chat.service';

@Component({
  selector: 'app-gift-area',
  templateUrl: './gift-area.component.html',
  styleUrls: ['./gift-area.component.scss']
})
export class GiftAreaComponent implements OnInit, AfterViewInit {

  @ViewChild('giftItem') giftItemElement: ElementRef;

  public giftListTotal: GiftDetail[];
  public listStatus: GiftListSlideStatus;
  public selectedGift: GiftDetail | null;
  public progressRadius: number;
  public progressPercent: number;
  public progressTitle: string;

  constructor(
    private store: Store<AppState>,
    private liveChatService: LiveChatService,
  ) { }

  ngOnInit(): void {
    this.selectedGift = null;

    this.store.pipe(
      select(state => state.liveChatFeature),
      tap((state) => {
        this.giftListTotal = state.giftsList;
      })
    ).subscribe();
  }


  ngAfterViewInit(): void {
    this.progressRadius = this.giftItemElement.nativeElement.clientWidth / 4;
  }


  chooseGift(gift: GiftDetail) {

    if (!!gift.IsFree && this.progressPercent !== 100) {
      return;
    }

    this.selectedGift = gift;
  }
  sendGift() {
    if (!!this.selectedGift.IsFree) {

    } else {
      const id = this.selectedGift.Id;
      const value = this.selectedGift.Value;
      this.liveChatService.sendGift(id, value);
    }

    this.clearSelect();
    this.closeGiftPanel();
  }

  clearSelect() {
    this.listStatus = 'left';
    this.selectedGift = null;
  }

  checkObjEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  closeGiftPanel() {
    this.store.dispatch(showGiftPanelUpdate({
      showGiftPanel: false
    }));
  }

}
