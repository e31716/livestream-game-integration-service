import { VideoDetail, GiftDetail, AnchorLobbyInfoDetail, ChatMessage, PlayerLogged, GivePlayerWeaponResp } from '@core/model/live-chat-room';
import { PlayerSendGiftResp, PlayerLikeResp, PlayerGiftCombo, TimeSpeaker, LimitedTimeTask, LimitedTimeActivities } from '@core/model/fish-live';
import { GameTypeEnum } from '@core/enum/gameType';

export interface LiveChatState {
  readonly videosList: VideoDetail[];
  readonly currentVideo: number;
  readonly refreshVideo: number;
  readonly currentVolume: number;
  readonly giftsList: GiftDetail[];
  readonly anchorLobbyInfo: AnchorLobbyInfoDetail;
  readonly playerName: string;
  readonly playerId: string;
  readonly isHideChatRoom: boolean;
  readonly isShowEmojiPicker: boolean;
  readonly onResize: number;
  readonly currentChatList: ChatMessage[] | PlayerSendGiftResp[];
  readonly currentLikeList: PlayerLikeResp[];
  readonly vvipNoticeList: PlayerLogged[];
  readonly signalNumber: number;
  readonly giftNoticeList: PlayerSendGiftResp[];
  readonly showGiftPanel: boolean;
  readonly showSocialSharePanel: boolean;
  readonly freeGiftCoodDownSec: number;
  readonly supportSendGiftFeature: boolean;
  readonly isFullScreen: boolean;
  readonly allowOpenLotteryGame: boolean;
  readonly showLotteryScreen: boolean;
  readonly giftComboCount: PlayerGiftCombo[];
  readonly timeSpeaker: TimeSpeaker;
  readonly limitedTimeTaskList: LimitedTimeTask[];
  readonly weaponSentSuccessList: GivePlayerWeaponResp[];
  readonly gameType: GameTypeEnum;
  readonly themeCode: GameTypeEnum;
  readonly gameLayerTop: boolean;
  readonly showAloneChatPanel: boolean;
  readonly isShowTopMenuPopup: boolean;
  readonly isShowAnchorInfoPanel: boolean;
  readonly buildinGameDisplay: boolean;
  readonly hasPopupShow: boolean;
  readonly isShowMegaphonePopup: boolean;
  readonly megaphoneSignalNumber: number;
  readonly limitedTimeActivitiesList: LimitedTimeActivities[];
  readonly isShowPokePanel: boolean;
}
