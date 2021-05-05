import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LiveChatService } from '@feature/live-chat/service/live-chat.service';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app-state';
import { tap } from 'rxjs/operators';
import { emojiPickerDisplayStatusToggle } from '../../store/live-chat.actions';
import { LotteryObjectResp } from '@core/model/live-chat-room';
import { inOutAnimation } from '@core/animation/animation';
import { Subscription } from 'rxjs';
import { PopupStatusService } from '@feature/live-chat/service/popup-status.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss', './chat-room.dsg.component.scss'],
  animations: [
    inOutAnimation,
  ]
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  @ViewChild(ChatInputComponent) chatInputComponent: ChatInputComponent;
  public canActiveLotteryGame = false;
  public themeCode: string;
  public isHideChatRoom: boolean;
  public isShowEmojiPicker: boolean;
  public isShowAloneChatPanel: boolean;
  public buildinGameDisplay: boolean;
  public gameLayerTop: boolean;
  public hasPopupShow: boolean;

  private isHideChatRoomSubscription: Subscription;
  private isShowEmojiPickerSubscription: Subscription;
  private lotterySubjectSubscrition: Subscription;
  private themeCodeSubscription: Subscription;
  private showAloneChatPanelSubscription: Subscription;
  private gameLayerTopSubscription: Subscription;
  private buildinGameDisplaySubscription: Subscription;
  private popupShowStatusSubscription: Subscription;

  constructor(
    private liveChatService: LiveChatService,
    private bottomSheet: MatBottomSheet,
    private popupStatusService: PopupStatusService,
    private store: Store<AppState>,) { }

  ngOnInit(): void {
    this.getIsHideChatRoom();
    this.getIsShowEmojiPicker();
    this.getLotterySubjectContent();
    this.getThemeCode();
    this.getShowAloneChatPanel();
    this.getGameLayerTop();
    this.getBuildinGameDisplay();
    this.getPopupShowStatusFormStore();
  }

  ngOnDestroy(): void {
    this.isHideChatRoomSubscription.unsubscribe();
    this.isShowEmojiPickerSubscription.unsubscribe();
    this.lotterySubjectSubscrition.unsubscribe();
    this.themeCodeSubscription.unsubscribe();
    this.showAloneChatPanelSubscription.unsubscribe();
    this.gameLayerTopSubscription.unsubscribe();
    this.buildinGameDisplaySubscription.unsubscribe();
    this.popupShowStatusSubscription.unsubscribe();
  }

  public toggleEmojiPicker(close?: boolean) {
    this.store.dispatch(emojiPickerDisplayStatusToggle({
      isShowEmojiPicker: close === false ? close : !this.isShowEmojiPicker
    }));
  }

  public addEmoji(event) {

    const msg = `${event.emoji.sheet[0]},${event.emoji.sheet[1]}`;
    this.liveChatService.sendEmojiMessage(msg);
    this.toggleEmojiPicker();
  }

  public addTag(event) {
    this.chatInputComponent.addTag(event);
  }

  public sendMessage($event) {
    const msg = $event;

    this.liveChatService.sendMessage(msg);
  }

  public openBottomSheet(): void {
    const config: MatBottomSheetConfig = {
      panelClass: 'custom-bottom-sheet',
      autoFocus: false
    };
    this.bottomSheet.open(BottomSheetComponent, config);
  }

  public emojiBgImgParser() {
    return (set, sheetSize) => `assets/img/emoji/${sheetSize}.png`;
  }

  private getPopupShowStatusFormStore() {
    this.popupShowStatusSubscription = this.store.pipe(
      select(state => state.liveChatFeature.hasPopupShow),
      tap((hasPopupShow) => {
        this.hasPopupShow = hasPopupShow;
      })
    ).subscribe();
  }

  private getLotterySubjectContent() {
    this.lotterySubjectSubscrition = this.liveChatService.getLotterySubject().subscribe((resp: LotteryObjectResp) => {
      this.canActiveLotteryGame = resp.Active;
    });
  }

  private getThemeCode() {
    this.themeCodeSubscription = this.store.pipe(
      select(state => state.liveChatFeature.themeCode),
      tap((themeCode) => {
        this.themeCode = themeCode;
      })
    ).subscribe();
  }

  private getIsHideChatRoom() {
    this.isHideChatRoomSubscription = this.store.pipe(
      select(state => state.liveChatFeature.isHideChatRoom),
      tap((isHideChatRoom) => {
        this.isHideChatRoom = isHideChatRoom;
      })
    ).subscribe();
  }

  private getIsShowEmojiPicker() {
    this.isShowEmojiPickerSubscription = this.store.pipe(
      select(state => state.liveChatFeature.isShowEmojiPicker),
      tap((isShowEmojiPicker) => {
        this.isShowEmojiPicker = isShowEmojiPicker;
      })
    ).subscribe();
  }

  private getShowAloneChatPanel() {
    this.showAloneChatPanelSubscription = this.store.pipe(
      select(state => state.liveChatFeature.showAloneChatPanel),
      tap((isShow) => {
        this.isShowAloneChatPanel = isShow;
      })).subscribe();
  }

  private getGameLayerTop() {
    this.gameLayerTopSubscription = this.store.pipe(
      select(state => state.liveChatFeature.gameLayerTop),
      tap((gameLayerTop) => {
        this.gameLayerTop = gameLayerTop;
      })
    ).subscribe();
  }

  private getBuildinGameDisplay() {
    this.buildinGameDisplaySubscription = this.store.pipe(
      select(state => state.liveChatFeature.buildinGameDisplay),
      tap((buildinGameDisplay) => {
        this.buildinGameDisplay = buildinGameDisplay;
      })
    ).subscribe();
  }
}
