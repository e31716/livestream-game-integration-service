import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LiveChatComponent } from './live-chat.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { SharedModule } from '@shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBottomSheetRef, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';
import {
  giftsListReducer,
  videosListReducer,
  anchorLobbyInfoReducer,
  playerNameReducer,
  chatRoomDisplayStatusReducer,
  emojiPickerReducer,
  currentVolumeReducer,
  currentVideoReducer,
  refreshVideoReducer,
  currentChatListReducer,
  currentLikeListReducer,
  vvipNoitceListReducer,
  openMsgBottomSheetReducer,
  giftNoticeListReducer,
  showGiftPanelReducer,
  showSocialSharePanelReducer,
  freeGiftCoodDownSecReducer,
  supportSendGiftFeatureReducer,
  isFullScreenFeatureReducer,
  showLotteryScreenReducer,
  allowOpenLotteryGameReducer,
  giftComboCountReducer,
  timeSpeakerReducer,
  limitedTimeTaskListReducer,
  weaponSentSuccessListReducer,
  gameTypeReducer,
  gameLayerTopReducer,
  showAloneChatPanelReducer,
  isShowTopMenuPopupReducer,
  isShowAnchorInfoPanelReducer,
  buildinGameDisplayReducer,
  hasPopupShowUpdateReducer,
  isShowMegaphonePopupReducer,
  playerIdReducer,
  openMegaphoneBottomSheetReducer,
  limitedTimeActivitiesListReducer,
  themeCodeUpdateReducer,
  isShowPokePanelReducer,
} from './store/live-chat.reducers';
import { LiveStreamComponent } from './component/live-stream/live-stream.component';
import { LiveStreamIphoneComponent } from './component/live-stream-iphone/live-stream-iphone.component';
import { VolumePopupComponent } from './component/volume-popup/volume-popup.component';
import { SwitchUrlPopupComponent } from './component/switch-url-popup/switch-url-popup.component';
import { BottomSheetComponent } from './component/bottom-sheet/bottom-sheet.component';
import { GiftBottomSheetComponent } from './component/gift-bottom-sheet/gift-bottom-sheet.component';
import { BottomPanelComponent } from './component/bottom-panel/bottom-panel.component';
import { RightPanelComponent } from './component/right-panel/right-panel.component';
import { ChatRoomComponent } from './component/chat-room/chat-room.component';
import { AnchorInfoComponent } from './component/chat-room/anchor-info/anchor-info.component';
import { NoticeComponent } from './component/chat-room/notice/notice.component';
import { GiftPanelComponent } from './component/chat-room/gift-panel/gift-panel.component';
import { DialogDisplayComponent } from './component/chat-room/dialog-display/dialog-display.component';
import { ChatInputComponent } from './component/chat-room/chat-input/chat-input.component';
import { GiftPanelMComponent } from './component/chat-room/gift-panel-m/gift-panel-m.component';
import { ChatInputMComponent } from './component/chat-room/chat-input-m/chat-input-m.component';
import { SpecialNoticeComponent } from './component/chat-room/special-notice/special-notice.component';
import { HidePanelPopupComponent } from './component/hide-panel-popup/hide-panel-popup.component';
import { LiveChatService } from './service/live-chat.service';
import { VvipNoitceComponent } from './component/chat-room/vvip-noitce/vvip-noitce.component';
import { GiftAnimateViewComponent } from './component/chat-room/gift-animate-view/gift-animate-view.component';
import { FloatEffectViewComponent } from './component/chat-room/float-effect-view/float-effect-view.component';
import { SocialSharePanelComponent } from './component/social-share-panel/social-share-panel.component';
import { QuickReplyComponent } from './component/chat-room/quick-reply/quick-reply.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { PlayerMsgBoxComponent } from './component/chat-room/dialog-display/player-msg-box/player-msg-box.component';
import { AnchorMsgBoxComponent } from './component/chat-room/dialog-display/anchor-msg-box/anchor-msg-box.component';
import { GiftMsgBoxComponent } from './component/chat-room/dialog-display/gift-msg-box/gift-msg-box.component';
import { NoticeMsgBoxComponent } from './component/chat-room/dialog-display/notice-msg-box/notice-msg-box.component';
import { CountdownModule } from 'ngx-countdown';
import { LotteryGameEntranceComponent } from './component/chat-room/lottery-game-entrance/lottery-game-entrance.component';
import { GiftComboViewComponent } from './component/chat-room/gift-combo-view/gift-combo-view.component';
import { DessertMsgBoxComponent } from './component/chat-room/dialog-display/dessert-msg-box/dessert-msg-box.component';
import { SlideUpPanelComponent } from './component/slide-up-panel/slide-up-panel.component';
import { GiftAreaComponent } from './component/slide-up-panel/gift-area/gift-area.component';
import { DessertAreaComponent } from './component/slide-up-panel/dessert-area/dessert-area.component';
import { WeaponNoticeComponent } from './component/chat-room/weapon-notice/weapon-notice.component';
import { NoticeContainerComponent } from './component/chat-room/notice-container/notice-container.component';
import { GameDisplayModule } from '@feature/game-display/game-display.module';
import { GameCustomService } from './service/game-custom.service';
import { AloneChatPanelComponent } from './component/alone-chat-panel/alone-chat-panel.component';
import { TopPanelComponent } from './component/top-panel/top-panel.component';
import { ButtonGiftComponent } from './component/buttons/button-gift/button-gift.component';
import { BottomPanelDsgComponent } from './component/bottom-panel-dsg/bottom-panel-dsg.component';
import { ButtonBackLobbyComponent } from './component/buttons/button-back-lobby/button-back-lobby.component';
import { TopLeftPenalComponent } from './component/chat-room/top-left-penal/top-left-penal.component';
import { MenuPopupComponent } from './component/menu-popup/menu-popup.component';
import { ButtonHidePanelComponent } from './component/buttons/button-hide-panel/button-hide-panel.component';
import { ButtonVolumeControlComponent } from './component/buttons/button-volume-control/button-volume-control.component';
import { ButtonReloadVideoComponent } from './component/buttons/button-reload-video/button-reload-video.component';
import { ButtonBasicRoundComponent } from './component/buttons/button-basic-round/button-basic-round.component';
import { ButtonColorRoundComponent } from './component/buttons/button-color-round/button-color-round.component';
import { AnchorInfoPanelComponent } from './component/anchor-info-panel/anchor-info-panel.component';
import { PopupStatusService } from './service/popup-status.service';
import { MegaphonePopupComponent } from './component/megaphone-popup/megaphone-popup.component';
import { MegaphoneMsgBoxComponent } from './component/chat-room/dialog-display/megaphone-msg-box/megaphone-msg-box.component';
import { MegaphoneBottomSheetComponent } from './component/megaphone-bottom-sheet/megaphone-bottom-sheet.component';
import { AutoReplyMsgService } from './service/auto-reply-msg.service';
import { PokePanelComponent } from './component/chat-room/anchor-info/poke-panel/poke-panel.component';
import { PokeUserMsgBoxComponent } from './component/chat-room/dialog-display/poke-user-msg-box/poke-user-msg-box.component';
@NgModule({
  declarations: [
    LiveChatComponent,
    ChatRoomComponent,
    LiveStreamComponent,
    LiveStreamIphoneComponent,
    AnchorInfoComponent,
    NoticeComponent,
    GiftPanelComponent,
    DialogDisplayComponent,
    VolumePopupComponent,
    SwitchUrlPopupComponent,
    ChatInputComponent,
    BottomSheetComponent,
    GiftPanelMComponent,
    ChatInputMComponent,
    GiftBottomSheetComponent,
    SpecialNoticeComponent,
    BottomPanelComponent,
    RightPanelComponent,
    HidePanelPopupComponent,
    VvipNoitceComponent,
    GiftAnimateViewComponent,
    FloatEffectViewComponent,
    SocialSharePanelComponent,
    QuickReplyComponent,
    PlayerMsgBoxComponent,
    AnchorMsgBoxComponent,
    GiftMsgBoxComponent,
    NoticeMsgBoxComponent,
    LotteryGameEntranceComponent,
    GiftComboViewComponent,
    DessertMsgBoxComponent,
    SlideUpPanelComponent,
    GiftAreaComponent,
    DessertAreaComponent,
    WeaponNoticeComponent,
    NoticeContainerComponent,
    AloneChatPanelComponent,
    TopPanelComponent,
    ButtonGiftComponent,
    BottomPanelDsgComponent,
    ButtonBackLobbyComponent,
    TopLeftPenalComponent,
    MenuPopupComponent,
    ButtonHidePanelComponent,
    ButtonVolumeControlComponent,
    ButtonReloadVideoComponent,
    ButtonBasicRoundComponent,
    ButtonColorRoundComponent,
    AnchorInfoPanelComponent,
    MegaphonePopupComponent,
    MegaphoneMsgBoxComponent,
    MegaphoneBottomSheetComponent,
    PokePanelComponent,
    PokeUserMsgBoxComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatBottomSheetModule,
    PickerModule,
    MatTooltipModule,
    MatDialogModule,
    NgCircleProgressModule.forRoot({
      backgroundOpacity: 0.5,
      backgroundColor: '#000000',
      backgroundPadding: 0,
      radius: 60,
      space: -10,
      outerStrokeGradient: true,
      outerStrokeWidth: 10,
      outerStrokeColor: '#ff0000',
      outerStrokeGradientStopColor: '#ff0092',
      innerStrokeColor: '#ffaaaa',
      innerStrokeWidth: 10,
      animation: false,
      animateTitle: false,
      animationDuration: 0,
      showTitle: true,
      titleFontSize: '12',
      titleColor: '#ffffff',
      showSubtitle: false,
      showUnits: false,
      showBackground: true,
      startFromZero: false,
      lazy: false
    }),
    CountdownModule,
    GameDisplayModule,
    StoreModule.forFeature('liveChatFeature', {
      // property name 建議跟 State 一致
      giftsList: giftsListReducer,
      videosList: videosListReducer,
      currentVideo: currentVideoReducer,
      refreshVideo: refreshVideoReducer,
      currentVolume: currentVolumeReducer,
      anchorLobbyInfo: anchorLobbyInfoReducer,
      playerName: playerNameReducer,
      playerId: playerIdReducer,
      isHideChatRoom: chatRoomDisplayStatusReducer,
      isShowEmojiPicker: emojiPickerReducer,
      currentChatList: currentChatListReducer,
      currentLikeList: currentLikeListReducer,
      vvipNoticeList: vvipNoitceListReducer,
      signalNumber: openMsgBottomSheetReducer,
      giftNoticeList: giftNoticeListReducer,
      showGiftPanel: showGiftPanelReducer,
      showSocialSharePanel: showSocialSharePanelReducer,
      freeGiftCoodDownSec: freeGiftCoodDownSecReducer,
      supportSendGiftFeature: supportSendGiftFeatureReducer,
      isFullScreen: isFullScreenFeatureReducer,
      showLotteryScreen: showLotteryScreenReducer,
      allowOpenLotteryGame: allowOpenLotteryGameReducer,
      giftComboCount: giftComboCountReducer,
      timeSpeaker: timeSpeakerReducer,
      limitedTimeTaskList: limitedTimeTaskListReducer,
      weaponSentSuccessList: weaponSentSuccessListReducer,
      gameType: gameTypeReducer,
      themeCode: themeCodeUpdateReducer,
      gameLayerTop: gameLayerTopReducer,
      showAloneChatPanel: showAloneChatPanelReducer,
      isShowTopMenuPopup: isShowTopMenuPopupReducer,
      isShowAnchorInfoPanel: isShowAnchorInfoPanelReducer,
      buildinGameDisplay: buildinGameDisplayReducer,
      hasPopupShow: hasPopupShowUpdateReducer,
      isShowMegaphonePopup: isShowMegaphonePopupReducer,
      megaphoneSignalNumber: openMegaphoneBottomSheetReducer,
      limitedTimeActivitiesList: limitedTimeActivitiesListReducer,
      isShowPokePanel: isShowPokePanelReducer,
    })
  ],
  exports: [
    LiveChatComponent,
  ],
  providers: [
    LiveChatService,
    GameCustomService,
    PopupStatusService,
    AutoReplyMsgService,
    { provide: MatBottomSheetRef, useValue: {} }
  ]
})
export class LiveChatModule { }
