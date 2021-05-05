import { createAction, props } from '@ngrx/store';
import {
    GiftDetail,
    VideoDetail,
    AnchorLobbyInfoDetail,
    ChatMessage,
    PlayerLogged,
    GivePlayerWeaponResp
} from '@core/model/live-chat-room';
import {
    PlayerSendGiftResp,
    PlayerLikeResp,
    PlayerGiftCombo,
    TimeSpeaker,
    LimitedTimeTask,
    LimitedTimeActivities
} from '@core/model/fish-live';
import { GameTypeEnum } from '@core/enum/gameType';

export const giftsListUpdate = createAction(
    '[Live Chat Room] Update Gifts List',
    props<{ giftsList: GiftDetail[] }>()
);

export const videosListUpdate = createAction(
    '[Live Chat Room] Update Videos List',
    props<{ videosList: VideoDetail[] }>()
);

export const currentVideoUpdate = createAction(
    '[Live Chat Room] Update Current Video',
    props<{ currentVideo: number }>()
);

export const refreshVideoUpdate = createAction(
    '[Live Chat Room] Refresh Video'
);

export const currentVolumeUpdate = createAction(
    '[Live Chat Room] Update Current Volume',
    props<{ currentVolume: number }>()
);

export const anchorLobbyInfoUpdate = createAction(
    '[Live Chat Room] Update AnchorLobbyInfo',
    props<{ anchorLobbyInfo: AnchorLobbyInfoDetail }>()
);

export const playerNameUpdate = createAction(
    '[Live Chat Room] Update Player Name',
    props<{ playerName: string }>()
);

export const playerIdUpdate = createAction(
    '[Live Chat Room] Update Player ID',
    props<{ playerId: string }>()
);

export const chatRoomDisplayStatusToggle = createAction(
    '[Live Chat Room] Hide Chat Rooom',
    props<{ isHideChatRoom: boolean }>()
);

export const emojiPickerDisplayStatusToggle = createAction(
    '[Live Chat Room] Show Emoji Picker',
    props<{ isShowEmojiPicker: boolean }>()
);

export const onResize = createAction(
    '[Live Chat Room] Resize window'
);

export const currentChatListUpdate = createAction(
    '[Live Chat Room] Chat Message Update',
    props<{ currentChatList: ChatMessage[] | PlayerSendGiftResp[] }>()
);

export const currentLikeListUpdate = createAction(
    '[Live Chat Room] Like List Update',
    props<{ currentLikeList: PlayerLikeResp[] }>()
);

export const vvipNoticeListUpdate = createAction(
    '[Live Chat Room] VVipNotice List Update',
    props<{ vvipNoticeList: PlayerLogged[] }>()
);

export const openMsgBottomSheetUpdate = createAction(
    '[Live Chat Room] Open Msg BottomSheet Update',
    props<{ signal: number }>()
);

export const giftNoticeListUpdate = createAction(
    '[Live Chat Room] Gift Notice List Update',
    props<{ giftNotice: PlayerSendGiftResp[] }>()
);

export const showGiftPanelUpdate = createAction(
    '[Live Chat Room] Show Gift Panel',
    props<{ showGiftPanel: boolean }>()
);

export const showSocialSharePanelUpdate = createAction(
    '[Live Chat Room] Show Social Share Panel',
    props<{ showSocialSharePanel: boolean }>()
);

export const freeGiftCoodDownSecUpdate = createAction(
    '[Live Chat Room] Show Social Share Panel',
    props<{ freeGiftCoodDownSec: number }>()
);

export const supportSendGiftFeatureUpdate = createAction(
    '[Live Chat Room] Support SendGift Feature',
    props<{ supportSendGiftFeature: boolean }>()
);

export const isFullScreenUpdate = createAction(
    '[Live Chat Room] IsFullScreen Update',
    props<{ isFullScreen: boolean }>()
);

export const allowOpenLotteryGameUpdate = createAction(
    '[Live Chat Room] AllowOpenLottery Update',
    props<{ allowOpenLotteryGame: boolean }>()
);

export const showLotteryScreenUpdate = createAction(
    '[Live Chat Room] ShowLotteryScreen Update',
    props<{ showLotteryScreen: boolean }>()
);

export const giftComboCountUpdate = createAction(
    '[Live Chat Room] GiftComboCount Update',
    props<{ giftComboCount: PlayerGiftCombo[] }>()
);

export const timeSpeakerUpdate = createAction(
    '[Live Chat Room] TimeSpeaker Update',
    props<{ timeSpeaker: TimeSpeaker }>()
);

export const limitedTimeTaskListUpdate = createAction(
    '[Live Chat Room] LimitedTimeTask Update',
    props<{ limitedTimeTaskList: LimitedTimeTask[] }>()
);

export const weaponSentSuccessListUpdate = createAction(
    '[Live Chat Room] WeaponSentSuccessList Update',
    props<{ weaponSentSuccessList: GivePlayerWeaponResp[] }>()
);

export const gameTypeUpdate = createAction(
    '[Live Chat Room] GameType Update',
    props<{ gameType: string }>()
);

export const themeCodeUpdate = createAction(
    '[Live Chat Room] Theme Code Update',
    props<{ themeCode: GameTypeEnum }>()
);

export const gameLayerTopUpdate = createAction(
    '[Live Chat Room] GameLayerTop Update',
    props<{ gameLayerTop: boolean }>()
);

export const showAloneChatPanelUpdate = createAction(
    '[Live Chat Room] ShowAloneChatPanel Update',
    props<{ showAloneChatPanel: boolean }>()
);

export const isShowTopMenuPopupUpdate = createAction(
    '[Live Chat Room] IsShowTopMenuPopup Update',
    props<{ isShowTopMenuPopup: boolean }>()
);

export const isShowAnchorInfoPanelUpdate = createAction(
    '[Live Chat Room] IsShowAnchorInfoPanel Update',
    props<{ isShowAnchorInfoPanel: boolean }>()
);

export const buildinGameDisplayUpdate = createAction(
    '[Live Chat Room] BuildinGameDisplay Update',
    props<{ buildinGameDisplay: boolean }>()
);

export const hasPopupShowUpdate = createAction(
    '[Live Chat Room] HasPopupShow Update',
    props<{ hasPopupShow: boolean }>()
);

export const isShowMegaphonePopupUpdate = createAction(
    '[Live Chat Room] isShowMegaphonePopup Update',
    props<{ isShowMegaphonePopup: boolean }>()
);

export const openMegaphoneBottomSheetUpdate = createAction(
    '[Live Chat Room] Open Megaphone BottomSheet Update',
    props<{ signal: number }>()
);

export const limitedTimeActivitiesListUpdate = createAction(
    '[Live Chat Room] LimitedTimeActivitiesList Update',
    props<{ limitedTimeActivitiesList: LimitedTimeActivities[] }>()
);

export const isShowPokePanelUpdate = createAction(
    '[Live Chat Room] isShowPokePanel Update',
    props<{ isShowPokePanel: boolean }>()
);
