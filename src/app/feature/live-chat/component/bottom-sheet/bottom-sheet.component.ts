import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LiveChatService } from '@feature/live-chat/service/live-chat.service';

import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AppState } from 'src/app/app-state';
import { Store, select } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { ChatInputMComponent } from '../chat-room/chat-input-m/chat-input-m.component';
import { Subscription } from 'rxjs';
import { GameTypeEnum } from '@core/enum/gameType';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss'],
})
export class BottomSheetComponent implements OnInit, OnDestroy {

  @ViewChild(ChatInputMComponent) chatInputMComponent: ChatInputMComponent;
  public themeCode: GameTypeEnum;
  public hideChatRoom: boolean;
  public showEmojiPicker: boolean;
  // area list
  public areaList = [{ area: 'gift-area', name: '送礼物', badge: false }, { area: 'dessert-area', name: '活跃奖励', badge: false }]; // 預設值
  public isActive = this.areaList[0].area;
  private onResizeSubscription: Subscription;
  private supportSendGiftSubscription: Subscription;
  private limitTimeTaskSubscription: Subscription;
  private getThemeCode: Subscription;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
    private liveChatService: LiveChatService,
    private store: Store<AppState>,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getOnResize();
    this.getSupportSendGiftFeature();
    this.subscribeLimitTimeTask();
    this.subscribeGetThemeCode();
  }

  ngOnDestroy(): void {
    this.onResizeSubscription.unsubscribe();
    this.supportSendGiftSubscription.unsubscribe();
    this.limitTimeTaskSubscription.unsubscribe();
    this.getThemeCode.unsubscribe();
  }

  changeTab(tab) {
    this.isActive = tab;
  }

  public closeBottomSheet() {
    this.bottomSheetRef.dismiss();
  }

  public toggleEmojiPicker(close?: boolean) {
    this.showEmojiPicker = close === false ? close : !this.showEmojiPicker;
  }

  public addEmoji(event) {
    const msg = `${event.emoji.sheet[0]},${event.emoji.sheet[1]}`;
    this.liveChatService.sendEmojiMessage(msg);

    this.toggleEmojiPicker();
  }

  public addTag(event) {
    this.chatInputMComponent.addTag(event);
  }

  public sendMessage($event) {
    const msg = $event;

    this.liveChatService.sendMessage(msg);
  }

  public sendGift($event) {
    const id = $event.Id;
    const value = $event.Value;

    this.liveChatService.sendGift(id, value);
  }

  public emojiBgImgParser() {
    return (set, sheetSize) => `assets/img/emoji/${sheetSize}.png`;
  }

  private resizeHandle() {
    if (this.bottomSheetRef.instance === undefined) {
      return;
    }

    if (window.innerHeight > window.innerWidth) {
      this.closeBottomSheet();
    }
  }

  private getOnResize() {
    this.onResizeSubscription = this.store.pipe(
      select(state => state.liveChatFeature.onResize),
      tap((onResize) => {
        if (onResize === 0) { return; }
        this.resizeHandle();
      })
    ).subscribe();
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
      })).subscribe();
  }

  private subscribeGetThemeCode() {
    this.getThemeCode = this.store.pipe(
      select(state => state.liveChatFeature.themeCode),
      tap((themeCode) => {
        this.themeCode = themeCode;
      })
    ).subscribe();
  }

  private badgeUpdate(show: boolean) {
    this.areaList.forEach((area) => {
      if (area.area === 'dessert-area') {
        area.badge = show;
      }
    });
    this.changeDetectorRef.markForCheck();
  }
}

