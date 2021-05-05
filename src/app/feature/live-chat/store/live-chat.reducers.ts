import { createReducer, on } from '@ngrx/store';
import {
    giftsListUpdate,
    videosListUpdate,
    anchorLobbyInfoUpdate,
    playerNameUpdate,
    chatRoomDisplayStatusToggle,
    emojiPickerDisplayStatusToggle,
    currentVideoUpdate,
    currentVolumeUpdate,
    refreshVideoUpdate,
    onResize,
    currentChatListUpdate,
    currentLikeListUpdate,
    vvipNoticeListUpdate,
    openMsgBottomSheetUpdate,
    giftNoticeListUpdate,
    showGiftPanelUpdate,
    showSocialSharePanelUpdate,
    freeGiftCoodDownSecUpdate,
    supportSendGiftFeatureUpdate,
    isFullScreenUpdate,
    showLotteryScreenUpdate,
    allowOpenLotteryGameUpdate,
    giftComboCountUpdate,
    timeSpeakerUpdate,
    limitedTimeTaskListUpdate,
    weaponSentSuccessListUpdate,
    gameTypeUpdate,
    gameLayerTopUpdate,
    showAloneChatPanelUpdate,
    isShowTopMenuPopupUpdate,
    isShowAnchorInfoPanelUpdate,
    buildinGameDisplayUpdate,
    hasPopupShowUpdate,
    isShowMegaphonePopupUpdate,
    playerIdUpdate,
    openMegaphoneBottomSheetUpdate,
    limitedTimeActivitiesListUpdate,
    themeCodeUpdate,
    isShowPokePanelUpdate
} from './live-chat.actions';
import {
    GiftDetail,
    VideoDetail,
    AnchorLobbyInfoDetail,
    ChatMessage,
    PlayerLogged,
    GivePlayerWeaponResp
} from '@core/model/live-chat-room';
import { PlayerSendGiftResp, PlayerLikeResp, PlayerGiftCombo, TimeSpeaker, LimitedTimeTask, LimitedTimeActivities } from '@core/model/fish-live';
import { GameTypeEnum } from '@core/enum/gameType';


export const giftsListReducer = createReducer<GiftDetail[]>(
    // default value
    [],
    on(giftsListUpdate, (state, action) => {
        return [
            // fakeFreeGift,
            ...action.giftsList
        ];
    }),
);

export const videosListReducer = createReducer<VideoDetail[]>(
    // default value
    [],
    on(videosListUpdate, (state, action) => action.videosList),
);

export const currentVideoReducer = createReducer<number>(
    // default value
    0,
    on(currentVideoUpdate, (state, action) => action.currentVideo),
);

export const refreshVideoReducer = createReducer<number>(
    // default value
    0,
    on(refreshVideoUpdate, (state, action) => state + 1),
);

export const currentVolumeReducer = createReducer<number>(
    // default value
    0,
    on(currentVolumeUpdate, (state, action) => action.currentVolume),
);

export const anchorLobbyInfoReducer = createReducer<AnchorLobbyInfoDetail>(
    // default value
    {
        Name: '-',
        NickName: '-',
        LikeCount: 0,
        FollowCount: 1,
        StarValue: 0,
        CanLike: true
    },
    on(anchorLobbyInfoUpdate, (state, action) => action.anchorLobbyInfo),
);

export const playerNameReducer = createReducer<string>(
    // default value
    '-',
    on(playerNameUpdate, (state, action) => action.playerName),
);

export const playerIdReducer = createReducer<string>(
    // default value
    '',
    on(playerIdUpdate, (state, action) => action.playerId),
);

export const chatRoomDisplayStatusReducer = createReducer<boolean>(
    // default value
    false,
    on(chatRoomDisplayStatusToggle, (state, action) => action.isHideChatRoom),
);

export const emojiPickerReducer = createReducer<boolean>(
    // default value
    false,
    on(emojiPickerDisplayStatusToggle, (state, action) => action.isShowEmojiPicker),
);

export const onResizeReducer = createReducer<number>(
    // default value
    0,
    on(onResize, (state, action) => state + 1),
);

export const currentChatListReducer = createReducer<ChatMessage[] | PlayerSendGiftResp[]>(
    // default value
    [],
    on(currentChatListUpdate, (state, action) => action.currentChatList),
);

export const currentLikeListReducer = createReducer<PlayerLikeResp[]>(
    // default value
    [],
    on(currentLikeListUpdate, (state, action) => action.currentLikeList),
);

export const vvipNoitceListReducer = createReducer<PlayerLogged[]>(
    // default value
    [],
    on(vvipNoticeListUpdate, (state, action) => action.vvipNoticeList),
);

export const openMsgBottomSheetReducer = createReducer<number>(
    0,
    on(openMsgBottomSheetUpdate, (state, action) => state + 1)
);

export const giftNoticeListReducer = createReducer<PlayerSendGiftResp[]>(
    // default value
    [],
    on(giftNoticeListUpdate, (state, action) => action.giftNotice)
);

export const showGiftPanelReducer = createReducer<boolean>(
    // default value
    false,
    on(showGiftPanelUpdate, (state, action) => action.showGiftPanel)
);

export const showSocialSharePanelReducer = createReducer<boolean>(
    // default value
    false,
    on(showSocialSharePanelUpdate, (state, action) => action.showSocialSharePanel)
);

export const freeGiftCoodDownSecReducer = createReducer<number>(
    // default value
    300,
    on(freeGiftCoodDownSecUpdate, (state, action) => action.freeGiftCoodDownSec)
);

export const supportSendGiftFeatureReducer = createReducer<boolean>(
    // default value
    true,
    on(supportSendGiftFeatureUpdate, (state, action) => action.supportSendGiftFeature),
);

export const isFullScreenFeatureReducer = createReducer<boolean>(
    // default value
    false,
    on(isFullScreenUpdate, (state, action) => action.isFullScreen),
);

export const allowOpenLotteryGameReducer = createReducer<boolean>(
    // default value
    false,
    on(allowOpenLotteryGameUpdate, (state, action) => action.allowOpenLotteryGame),
);

export const showLotteryScreenReducer = createReducer<boolean>(
    // default value
    false,
    on(showLotteryScreenUpdate, (state, action) => action.showLotteryScreen),
);

export const giftComboCountReducer = createReducer<PlayerGiftCombo[]>(
    // default value
    [],
    on(giftComboCountUpdate, (state, action) => action.giftComboCount),
);

export const timeSpeakerReducer = createReducer<TimeSpeaker>(
    // default value
    {
        CurrentTimeStamp: 0,
        ContinuouslyOnlineSec: 0
    },
    on(timeSpeakerUpdate, (state, action) => {
        const oldSec = state.ContinuouslyOnlineSec;
        return {
            ...action.timeSpeaker,
            ContinuouslyOnlineSec: oldSec + 1
        }
    }),
);

export const limitedTimeTaskListReducer = createReducer<LimitedTimeTask[]>(
    // default value
    [],
    on(limitedTimeTaskListUpdate, (state, action) => action.limitedTimeTaskList),
);

export const weaponSentSuccessListReducer = createReducer<GivePlayerWeaponResp[]>(
    // default value
    [],
    on(weaponSentSuccessListUpdate, (state, action) => action.weaponSentSuccessList),
);

export const gameTypeReducer = createReducer<string>(
    // default value
    '',
    on(gameTypeUpdate, (state, action) => action.gameType),
);

export const themeCodeUpdateReducer = createReducer<GameTypeEnum>(
    // default value
    GameTypeEnum.DEFAULT,
    on(themeCodeUpdate, (state, action) => action.themeCode),
);

export const gameLayerTopReducer = createReducer<boolean>(
    // default value
    true,
    on(gameLayerTopUpdate, (state, action) => action.gameLayerTop),
);

export const showAloneChatPanelReducer = createReducer<boolean>(
    // default value
    false,
    on(showAloneChatPanelUpdate, (state, action) => action.showAloneChatPanel),
);

export const isShowTopMenuPopupReducer = createReducer<boolean>(
    // default value
    false,
    on(isShowTopMenuPopupUpdate, (state, action) => action.isShowTopMenuPopup),
);

export const isShowAnchorInfoPanelReducer = createReducer<boolean>(
    // default value
    false,
    on(isShowAnchorInfoPanelUpdate, (state, action) => action.isShowAnchorInfoPanel),
);

export const buildinGameDisplayReducer = createReducer<boolean>(
    // default value
    false,
    on(buildinGameDisplayUpdate, (state, action) => action.buildinGameDisplay),
);

export const hasPopupShowUpdateReducer = createReducer<boolean>(
    // default value
    false,
    on(hasPopupShowUpdate, (state, action) => action.hasPopupShow),
);

export const isShowMegaphonePopupReducer = createReducer<boolean>(
    // default value
    false,
    on(isShowMegaphonePopupUpdate, (state, action) => action.isShowMegaphonePopup),
);

export const openMegaphoneBottomSheetReducer = createReducer<number>(
    0,
    on(openMegaphoneBottomSheetUpdate, (state, action) => state + 1)
);

export const limitedTimeActivitiesListReducer = createReducer<LimitedTimeActivities[]>(
    // default value
    [],
    on(limitedTimeActivitiesListUpdate, (state, action) => action.limitedTimeActivitiesList),
);

export const isShowPokePanelReducer = createReducer<boolean>(
    // default value
    false,
    on(isShowPokePanelUpdate, (state, action) => action.isShowPokePanel),
);