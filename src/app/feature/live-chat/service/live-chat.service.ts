/**
 * 從 chat-room.service 複製出來的，專門給 live-chat.module 使用
 * 服務各自的 module store
 */
import { Inject, Injectable } from '@angular/core';
import { SignalrService } from '@core/service/signalr.service';
import { HttpClient } from '@angular/common/http';
import * as dayjs from 'dayjs';
import {
  GiftReq,
  ChatMessage,
  GiftDetail,
  ChatHistoryMessage,
  AnchorLobbyInfoDetail,
  AnchorLobbyInfoDetailOptional,
  PlayerLogged,
  LotteryObjectResp,
  GivePlayerWeaponResp,
  AdditionWeaponSccuessItem,
  ActivityMsgReq,
  ActivityMsgResp,
  DeleteMsgNotice
} from '@core/model/live-chat-room';
import { tap } from 'rxjs/operators';
import {
  PlayerSendGiftResp,
  PlayerLikeResp,
  PlayerLobbyConnectResp,
  AnchorConnectedResp,
  PlayerCanLikeResp,
  LobbyUrlResp,
  PlayerGiftCombo,
  LimitedTimeTask,
  LimitedTimeActivities,
} from '@core/model/fish-live';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app-state';
import {
  anchorLobbyInfoUpdate,
  currentChatListUpdate,
  currentLikeListUpdate,
  giftsListUpdate,
  videosListUpdate,
  playerNameUpdate,
  vvipNoticeListUpdate,
  openMsgBottomSheetUpdate,
  giftNoticeListUpdate,
  freeGiftCoodDownSecUpdate,
  supportSendGiftFeatureUpdate,
  showLotteryScreenUpdate,
  allowOpenLotteryGameUpdate,
  giftComboCountUpdate,
  timeSpeakerUpdate,
  limitedTimeTaskListUpdate,
  weaponSentSuccessListUpdate,
  currentVolumeUpdate,
  refreshVideoUpdate,
  gameTypeUpdate,
  showAloneChatPanelUpdate,
  showGiftPanelUpdate,
  chatRoomDisplayStatusToggle,
  currentVideoUpdate,
  isShowTopMenuPopupUpdate,
  isShowAnchorInfoPanelUpdate,
  buildinGameDisplayUpdate,
  isShowMegaphonePopupUpdate,
  playerIdUpdate,
  openMegaphoneBottomSheetUpdate,
  limitedTimeActivitiesListUpdate,
  themeCodeUpdate,
  isShowPokePanelUpdate
} from '@feature/live-chat/store/live-chat.actions';
import {
  ActivityFeatureCode,
  InterceptMsgEnum,
  LimitedTimeActivitiesName,
  LimitedTimeTaskName,
  ResponseCodes,
  ResponseMessages,
  SendGiftRespCode,
  SendGiftRespMessages
} from '@core/enum/response';
import { Observable, of } from 'rxjs';

import { ConfigService } from '@core/config/config.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogComponent } from '@shared/components/common-dialog/common-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { MockDataService } from '@core/mock/mock-data.service';
import { MockVideoParam } from '@core/model/share';
import { hideAnchorRequest } from '@shared/store/share.actions';
import { APP_CONFIG, IAppConfig } from '@core/config/app.config';
import { GameTypeEnum } from '@core/enum/gameType';
import { AutoReplyMsgService } from './auto-reply-msg.service';
import { MegaphoneSenderInfo, PokeUserFromAnchor } from '@core/model/activity-body';
import { GameDisplayService } from '@feature/game-display/service/game-display.service';

@Injectable()
export class LiveChatService {
  private maxChatListLimit = 500;
  private currentChatList: ChatMessage[] = [];
  private allGiftsList: GiftDetail[];
  private LikeListItemSurviveTime = 3500;
  private weaponSentSuccessItemSurviveTime = 5000;
  private vvipListItemSurviveTime = 2500;
  private giftNoticeSurviveTime = 2500;
  private currentLikeListTemp: PlayerLikeResp[] = [];
  private weaponSentSuccessListTemp: GivePlayerWeaponResp[] = [];
  private vvipNoticeListTemp: PlayerLogged[] = [];
  private giftNoticeListTemp: PlayerSendGiftResp[] = [];
  private giftComboTemp: PlayerGiftCombo[] = [];
  private anchorLobbyInfo: AnchorLobbyInfoDetail;
  private playerName: string;
  private playerId: string;
  private likeListupdateTimer: any;
  private weaponSentSuccessUpdateTimer: any;
  private vvipNoticeUpdateTimer: any;
  private giftNoticeUpdateTimer: any;
  private freeGiftCoolDownSec: number;
  private freeGiftCoolDownTimer: any;
  private comboGift: boolean = false;
  private sendDessertCount = 0;
  private interceptMsgList = [
    InterceptMsgEnum.benefitMsg,
    InterceptMsgEnum.dessertMsg,
    InterceptMsgEnum.continuousOnlineMsg,
    InterceptMsgEnum.userSendMegaphoneMsg,
    InterceptMsgEnum.anchorSendMegaphoneMsg,
  ];
  private LimitTimeTaskList: LimitedTimeTask[];
  private limitedTimeActivitiesList: LimitedTimeActivities[];
  private gameType: GameTypeEnum;

  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private signalrService: SignalrService,
    private store: Store<AppState>,
    private http: HttpClient,
    private configService: ConfigService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private mockDataService: MockDataService,
    private autoReplyMsgService: AutoReplyMsgService,
    private gameDisplayService: GameDisplayService,
  ) {
    this.subscribeLimitTimeActivities();
    this.getLimitTimeActivitiesList();
    this.subscribeLimitTimeTask();
    this.getLimitTimeTaskList();
    this.turnOnTimeSpeaker();
    this.subscribeTimeSpeaker();
    this.initSignalrConnectionLivestreamapi();
    this.initSignalrConnectionChat();

    this.store.pipe(
      select(state => state.liveChatFeature),
      tap((msg) => {
        this.allGiftsList = msg.giftsList;
        this.anchorLobbyInfo = msg.anchorLobbyInfo;
        this.playerName = msg.playerName;
        this.freeGiftCoolDownSec = msg.freeGiftCoodDownSec;
        this.gameType = msg.gameType;
        this.playerId = msg.playerId;
      })
    ).subscribe();
  }

  /**
   * ======================
   * Other public method
   * ======================
   */

  public updateInitData(msg: PlayerLobbyConnectResp) {
    this.store.dispatch(giftsListUpdate({ giftsList: msg.Gifts }));
    this.store.dispatch(anchorLobbyInfoUpdate({ anchorLobbyInfo: msg.AnchorLobbyInfo }));
    this.store.dispatch(playerNameUpdate({ playerName: msg.NickName }));
    this.store.dispatch(supportSendGiftFeatureUpdate({ supportSendGiftFeature: this.configService.initGameInfo.AllowSendGift }));
    this.store.dispatch(videosListUpdate({ videosList: msg.Videos }));
    this.store.dispatch(playerIdUpdate({ playerId: msg.Id }));
    this.useMockVideoUrl();
  }

  public updateAnchorInfoStore(obj: AnchorLobbyInfoDetailOptional) {
    this.store.dispatch(anchorLobbyInfoUpdate({
      anchorLobbyInfo: {
        ...this.anchorLobbyInfo,
        ...obj,
      }
    }));
  }

  public vvipNoticeHandle(msg: PlayerLogged) {
    this.vvipNoticeListTemp.push(msg);
    if (this.vvipNoticeUpdateTimer === undefined) {
      this.updateVVipNoticeToStoreLogic();
      this.vvipNoticeUpdateTimer = setInterval(() => {
        this.updateVVipNoticeToStoreLogic();
      }, 5000);
    }
  }

  public userNoticeHandle(msg: PlayerLogged) {
    const resultMsg = {
      MessageId: ActivityFeatureCode.PLAYER_LOGIN,
      NickName: msg.NickName,
      Id: '',
      Level: msg.Level + '',
      Body: '进入了房间！',
      IsAnchor: false,
      IsEmoji: false,
    } as ChatMessage;
    this.addChatItemInList(resultMsg);
  }

  public updateMsgBottomSheetSignalNumber() {
    this.store.dispatch(openMsgBottomSheetUpdate({ signal: 1 }));
  }

  public showLotteryScreenUpdate(isShow: boolean) {
    this.store.dispatch(showLotteryScreenUpdate({ showLotteryScreen: isShow }));
  }

  public allowOpenLotteryGameUpdate(allow: boolean) {
    this.store.dispatch(allowOpenLotteryGameUpdate({ allowOpenLotteryGame: allow }));
  }

  public showAloneChatPanelUpdate(isShow: boolean) {
    this.store.dispatch(showAloneChatPanelUpdate({ showAloneChatPanel: isShow }));
  }

  public showGiftPanelUpdate(isShow: boolean) {
    this.store.dispatch(showGiftPanelUpdate({ showGiftPanel: isShow }));
  }

  public showAnchorInfoPanelUpdate(isShow: boolean) {
    this.store.dispatch(isShowAnchorInfoPanelUpdate({ isShowAnchorInfoPanel: isShow }));
  }

  public toggleHidePanelUpdate(isHide: boolean) {
    this.store.dispatch(chatRoomDisplayStatusToggle({
      isHideChatRoom: isHide
    }));
  }

  public switchUrlUpdate(videoCode: number) {
    this.store.dispatch(currentVideoUpdate({
      currentVideo: videoCode
    }));
  }

  public toggleReloadVideoUpdate() {
    this.store.dispatch(refreshVideoUpdate());
  }

  public IsShowTopMenuPopupUpdate(isPopup: boolean) {
    this.store.dispatch(isShowTopMenuPopupUpdate({
      isShowTopMenuPopup: isPopup
    }));
  }

  public hideAnchorUpdate(isHide: boolean) {
    this.store.dispatch(hideAnchorRequest({ hideAnchor: isHide }));
  }

  public buildinGameDisplayUpdate(setting) {
    this.store.dispatch(buildinGameDisplayUpdate({
      buildinGameDisplay: setting
    }));
  }

  public showMegaphonePopupUpdate(isShow: boolean) {
    this.store.dispatch(isShowMegaphonePopupUpdate({ isShowMegaphonePopup: isShow }));
  }

  public updateMegaphoneBottomSheetSignalNumber() {
    this.store.dispatch(openMegaphoneBottomSheetUpdate({ signal: 1 }));
  }

  public showPokePanelUpdate(isShow: boolean) {
    this.store.dispatch(isShowPokePanelUpdate({ isShowPokePanel: isShow }));
  }

  public goBackLobbyHandle() {
    const apiURL = this.appConfig.endpoints.lobbyUrl;

    return this.http.get(apiURL);
  }

  public startFreeGiftCoolDown(needReset: boolean) {

    if (needReset) {
      this.freeGiftCoolDownUpdate(300);
    }

    this.freeGiftCoolDownTimer = setInterval(() => {
      if (this.freeGiftCoolDownSec > 0) {
        const newSec = this.freeGiftCoolDownSec - 1;
        this.freeGiftCoolDownUpdate(newSec);
      } else {
        clearInterval(this.freeGiftCoolDownTimer);
      }
    }, 1000);
  }

  public sendContinuouslyOnlineMsg(body: string) {
    this.sendActivityMessage(ActivityFeatureCode.CONTINUOUS_ONLINE, body, true);
  }

  public changeVoluem(volume) {
    this.store.dispatch(currentVolumeUpdate({
      currentVolume: volume
    }));
  }

  public reloadVideo() {
    this.store.dispatch(refreshVideoUpdate());
  }

  public storeGameType(type: GameTypeEnum) {
    this.store.dispatch(gameTypeUpdate({
      gameType: type,
    }));
  }

  public storeThemeCode(code: GameTypeEnum) {
    this.store.dispatch(themeCodeUpdate({
      themeCode: code,
    }));
  }

  /**
   * ======================
   * signalr: livestreamapi
   * ======================
   */
  public initSignalrConnectionLivestreamapi() {
    this.signalrService.connectHub('livestreamapi', () => {
      this.setPlayerLobbyConnectListener();
      this.setAnchorLobbyConnectedListener();
      this.setPlayerLoggedListener();
      this.setUserExpiredListener();
      this.setPlayerSendGiftListener();
      this.setLikeAnchorListener();
      this.setUnlikeAnchorListener();
      this.setGivePlayerWeaponReturnListener();
      setTimeout(() => { this.sendAnchorInfoToServer(); }, 100);
    }, () => {
      this.sendAnchorInfoToServer(); // Reconnect callback
    });
  }

  public sendGift(giftId, giftValue) {
    const reqObj = {
      GiftId: giftId,
      GiftValue: giftValue,
    } as GiftReq;

    this.signalrService.send(
      'livestreamapi',
      'PlayerSendGift',
      reqObj
    );
  }

  public likeAnchor() {
    this.signalrService.send(
      'livestreamapi',
      'PlayerLike', null);
  }

  public unlikeAnchor() {
    this.signalrService.send(
      'livestreamapi',
      'PlayerUnlike', null);
  }

  public sendPokeUserMessage() {
    const obj = {
      FromAnchor: false,
      Content: 'Poke Anchor Back'
    };
    const objString = JSON.stringify(obj);
    this.sendActivityMessage(ActivityFeatureCode.POKE_USER, objString, false);
  }

  private setPlayerLobbyConnectListener() {
    this.signalrService.addListener(
      'livestreamapi',
      'PlayerLobbyConnect',
      (msg: PlayerLobbyConnectResp) => {

        if (msg.Code === ResponseCodes.noAnchor) {
          alert(ResponseMessages.noAnchor);
          window.location.href = this.configService.initGameInfo.LobbyUrl;
          return;
        }
        if (msg.Code !== 0) { return; }

        this.updateInitData(msg);
        this.startFreeGiftCoolDown(false);
      });
  }

  private setPlayerLoggedListener() {
    this.signalrService.addListener(
      'livestreamapi',
      'PlayerLogged',
      (msg: PlayerLogged) => {
        this.updateAnchorInfoStore({
          FollowCount: msg.FollowCount
        });
        if (msg.IsTopWinner) {
          this.vvipNoticeHandle(msg);
        } else {
          this.userNoticeHandle(msg);
        }
      });
  }

  private setAnchorLobbyConnectedListener() {
    this.signalrService.addListener(
      'livestreamapi',
      'AnchorLobbyConnect',
      (msg: AnchorConnectedResp) => {
        if (msg.Code === 0) {
          this.getPlayerCanLikeAndHandleAnchorMsg(msg);
        }
      });
  }

  private getPlayerCanLikeAndHandleAnchorMsg(obj: AnchorConnectedResp) {
    const apiURL = this.appConfig.endpoints.playerCanLike;

    this.http.get(apiURL).pipe(
      tap((resp: PlayerCanLikeResp) => {
        this.updateAnchorInfoStore({
          CanLike: resp.CanLike,
          FollowCount: obj.FollowCount,
          LikeCount: obj.LikeCount,
          Name: obj.AnchorId,
          StarValue: obj.StarValue,      // Popularity
          NickName: obj.NickName,        // Anchor's Chinese Name
        });
      })).subscribe();
  }

  private sendAnchorInfoToServer() {
    this.signalrService.send(
      'livestreamapi',
      'PlayerLobbyConnect',
      { AnchorId: this.configService.initGameInfo.AnchorId }
    );
  }

  private setUserExpiredListener() {
    this.signalrService.addListener(
      'livestreamapi',
      'UserExpired', () => {
        alert(ResponseMessages.websocketExpired);
        this.goBackLobbyHandle()
          .subscribe((resp: LobbyUrlResp) => {
            const url = resp.LobbyUrl;
            window.location.href = url;
          });
      });
  }

  private setPlayerSendGiftListener() {
    this.signalrService.addListener(
      'livestreamapi',
      'PlayerSendGift',
      (msg: PlayerSendGiftResp) => {
        if (msg.Code === SendGiftRespCode.success) {

          this.checkOpenLotteryCondition(msg);
          this.checkOpenMegaphoneCondition(msg);

          const processedMsg = this.extendGiftInfo(msg);
          this.addChatItemInList(processedMsg);
          this.giftNoticeListTemp.push(msg);
          if (this.giftNoticeUpdateTimer === undefined) {
            this.updateGiftNoticeToStoreLogic();
            this.giftNoticeUpdateTimer = setInterval(() => {
              this.updateGiftNoticeToStoreLogic();
            }, 4000);
          }

          this.updateBalanceToPlalyer(msg);

          return;
        }

        if (msg.Code === SendGiftRespCode.noBalance) {
          this.dialog.open(CommonDialogComponent, {
            width: this.appConfig.popup.width,
            data: {
              title: '提醒',
              content: SendGiftRespMessages.noBalance,
              needCancelBtn: false
            },
            panelClass: 'common-dialog-custom-modalbox',
          });
          return;
        }

        if (msg.Code === SendGiftRespCode.generalFail) {
          this.dialog.open(CommonDialogComponent, {
            width: this.appConfig.popup.width,
            data: {
              title: '提醒',
              content: SendGiftRespMessages.generalFail,
              needCancelBtn: false
            },
            panelClass: 'common-dialog-custom-modalbox',
          });
          return;
        }
        if (msg.Code === SendGiftRespCode.playerCanNotSendGift) {
          this.dialog.open(CommonDialogComponent, {
            width: this.appConfig.popup.width,
            data: {
              title: '提醒',
              content: SendGiftRespMessages.playerCanNotSendGift,
              needCancelBtn: false
            },
            panelClass: 'common-dialog-custom-modalbox',
          });
          return;
        }
        if (msg.Code === SendGiftRespCode.noAnchorOnline) {
          this.dialog.open(CommonDialogComponent, {
            width: this.appConfig.popup.width,
            data: {
              title: '提醒',
              content: SendGiftRespMessages.noAnchorOnline,
              needCancelBtn: false
            },
            panelClass: 'common-dialog-custom-modalbox',
          });
          return;
        }
      });
  }

  private setLikeAnchorListener() {
    this.signalrService.addListener(
      'livestreamapi',
      'PlayerLike',
      (resp: PlayerLikeResp) => {

        if (resp.Code !== 0) {
          this.dialog.open(CommonDialogComponent, {
            width: this.appConfig.popup.width,
            data: {
              title: '提醒',
              content: '关注失败，请稍后再试',
              needCancelBtn: false
            },
            panelClass: 'common-dialog-custom-modalbox',
          });
          return;
        }

        if (resp.IsLike === false) { return; }

        if (resp.Id === this.playerId) {
          this.updateAnchorInfoStore({
            StarValue: resp.StarValue,
            LikeCount: resp.LikeCount,
            CanLike: false
          });
        }

        this.currentLikeListTemp.push(resp);
        if (this.likeListupdateTimer === undefined) {
          this.updateLikeToStoreLogic();
          this.likeListupdateTimer = setInterval(() => {
            this.updateLikeToStoreLogic();
          }, 5000);
        }
      });
  }

  private setUnlikeAnchorListener() {
    this.signalrService.addListener(
      'livestreamapi',
      'PlayerUnlike',
      (resp: PlayerLikeResp) => {

        if (resp.Code !== 0) {
          this.dialog.open(CommonDialogComponent, {
            width: this.appConfig.popup.width,
            data: {
              title: '提醒',
              content: '取消关注失败，请稍后再试',
              needCancelBtn: false
            },
            panelClass: 'common-dialog-custom-modalbox',
          });
          return;
        }

        if (resp.NickName === this.playerName) {
          this.updateAnchorInfoStore({
            StarValue: resp.StarValue,
            LikeCount: resp.LikeCount,
            CanLike: true
          });
        }
      });
  }

  private setGivePlayerWeaponReturnListener() {
    this.signalrService.addListener(
      'livestreamapi',
      'AnchorGivePlayerWeapon',
      (msg: GivePlayerWeaponResp) => {
        if (msg.Code !== 0) { return; }

        const proccessMsg = this.proccessWeaponProperty(msg);

        this.weaponSentSuccessListTemp.push(proccessMsg);
        if (this.weaponSentSuccessUpdateTimer === undefined) {
          this.updateWeaponSentSuccessToStoreLogic();
          this.weaponSentSuccessUpdateTimer = setInterval(() => {
            this.updateWeaponSentSuccessToStoreLogic();
          }, 6000);
        }
      });
  }

  /**
   * ======================
   * signalr: chat
   * ======================
   */
  /** Signalr connection */
  public initSignalrConnectionChat() {
    this.signalrService.connectHub('chat', () => {
      this.setChatHistoryListener();
      this.setChatMessageListener();
      this.setActivityMessageListener();
      this.setDeleteMsgListener();
    });
  }
  /** STOP Signalr connection */
  public stopSignalrConnection() {
    this.signalrService.stopHub('chat');
  }

  public sendMessage(msg) {
    const msgObj: Message = {
      Body: msg,
      IsEmoji: false
    };
    this.signalrService.send(
      'chat',
      'SendMessage',
      msgObj);
  }

  public sendEmojiMessage(msg) {
    const msgObj: Message = {
      Body: msg,
      IsEmoji: true,
    };
    this.signalrService.send(
      'chat',
      'SendMessage',
      msgObj);
  }

  public sendScratchOffCardMsg(msg) {

    this.sendActivityMessage(ActivityFeatureCode.SCRATCH_OFF_CARD, msg, true);

    let dialogContent = `已送出心跳互动-${msg}`;
    if (msg === '铭谢惠顾') {
      dialogContent = '再接再厉喔～';
    }

    this.dialog.open(CommonDialogComponent, {
      width: this.appConfig.popup.width,
      data: {
        title: '提醒',
        content: dialogContent,
        needCancelBtn: false
      },
      panelClass: 'common-dialog-custom-modalbox',
    });
  }

  public sendDessertBenefitMsg() {
    let msgBody = `喂主播吃了1次点心`;
    this.sendDessertCount += 1; // 次數加一
    if (this.sendDessertCount > 1) {
      msgBody = `连续投喂主播${this.sendDessertCount}次点心，么么哒`;
    }
    this.sendActivityMessage(ActivityFeatureCode.DESSERT, msgBody, false);
  }

  public userSendMegaPhoneMsg(msg: string) {
    this.sendActivityMessage(ActivityFeatureCode.MEGAPHONE, msg, true);
  }

  public dessertMsgPushGiftList(msg) {
    const resultMsg = {
      Id: '',
      NickName: msg.NickName,
      MessageId: ActivityFeatureCode.DESSERT,
      Code: 0,
      CorrelationId: '',
      GiftId: -2,
      StarValue: 0,
      Level: msg.Level,
      GiftUrl: '',
      GiftName: '点心',
      ClickTime: 0,
      Balance: 0,
      BalanceSeq: 0,
    };
    this.addChatItemInList(msg);
    this.giftNoticeListTemp.push(resultMsg);
    this.updateGiftNoticeToStoreLogic();
  }

  public updateTaskActive(taskIndex: number, isActive: boolean, renewEndTime: boolean) {

    let endTime = this.LimitTimeTaskList[taskIndex].EndTime // 原本的endTime

    if (renewEndTime) {
      endTime = dayjs(new Date()).unix() + this.LimitTimeTaskList[taskIndex].TaskCDTime
    }

    const newTaskList = [...this.LimitTimeTaskList.slice(0, taskIndex),
    {
      ...this.LimitTimeTaskList[taskIndex],
      CanActive: isActive,
      EndTime: endTime
    },
    ...this.LimitTimeTaskList.slice(taskIndex + 1)
    ];
    this.limitedTimeTaskListUpdate(newTaskList);
  }
  private setChatHistoryListener() {
    this.signalrService.addListener(
      'chat',
      'ChatHistory',
      (msg: ChatHistoryMessage) => {
        const resultMsg = msg.filter((myMsg) => this.haveToInterceptMsg(myMsg.Body) === false);
        this.currentChatList = resultMsg.map(item => {
          if (!this.haveToInterceptMsg(item.Body)) {
            return this.processChatItem(item);
          }
        });

        this.currentChatListUpdate(this.currentChatList);
      });
  }
  public updateActivitiesStatus(activitiesIndex: number, isActive: boolean, renewEndTime: boolean) {

    let endTime = this.limitedTimeActivitiesList[activitiesIndex].EndTime // 原本的endTime

    if (renewEndTime) {
      endTime = dayjs(new Date()).unix() + this.limitedTimeActivitiesList[activitiesIndex].ActivitiesCDTime
    }

    const newTaskList = [...this.limitedTimeActivitiesList.slice(0, activitiesIndex),
    {
      ...this.limitedTimeActivitiesList[activitiesIndex],
      CanActive: isActive,
      EndTime: endTime
    },
    ...this.limitedTimeActivitiesList.slice(activitiesIndex + 1)
    ];
    this.limitedTimeActivitiesListUpdate(newTaskList);
  }

  private setChatMessageListener() {
    this.signalrService.addListener(
      'chat',
      'ReceiveChatMessage',
      (msg: ChatMessage) => {
        const processedMsg = this.processChatItem(msg);
        this.addChatItemInList(processedMsg);
      });
  }

  private setDeleteMsgListener() {
    this.signalrService.addListener(
      'chat',
      'DeleteChatMessage',
      (msg: DeleteMsgNotice) => {
        this.delChatItemInList(msg.DeleteMessageId);
      });
  }

  private setActivityMessageListener() {
    this.signalrService.addListener('chat', 'Activity', (msg: ActivityMsgResp) => {
      if (msg.OnlyReadOnBackstage) return;

      if (msg.FeatureCode === ActivityFeatureCode.POKE_USER) {
        this.pokeUserMsgHandel(msg);
        return;
      }

      if (msg.FeatureCode === ActivityFeatureCode.DESSERT) {
        this.dessertMsgHandle(msg);
        return;
      }

      if (msg.FeatureCode === ActivityFeatureCode.CONTINUOUS_ONLINE) {
        return;
      }

      if (msg.FeatureCode === ActivityFeatureCode.MEGAPHONE) {
        this.megaphoneMsgHandle(msg);
        return;
      }

      if (msg.FeatureCode === ActivityFeatureCode.SCRATCH_OFF_CARD) {
        return;
      }

    });
  }

  /**
   * ======================
   * Other Private Method
   * ======================
   */

  private addChatItemInList(msg) {
    if (this.currentChatList.length >= this.maxChatListLimit) {
      this.currentChatList.shift();
    }

    if (msg.Body && this.isUserBlockResponce(msg.Body)) {
      msg.IsEmoji = false;
    }

    this.currentChatList = [...this.currentChatList, msg];
    this.currentChatListUpdate(this.currentChatList);
  }

  private isUserBlockResponce(content: string): boolean {
    return content === '你已被禁止發言';
  }

  private delChatItemInList(msgId: string) {
    const newList = this.currentChatList.filter((item) => {
      return item.MessageId !== msgId;
    });
    this.currentChatList = newList;
    this.currentChatListUpdate(this.currentChatList);
  }

  private extendGiftInfo(msg: PlayerSendGiftResp): PlayerSendGiftResp {
    const resultMsg = msg;
    this.allGiftsList.forEach((gift) => {
      if (gift.Id === msg.GiftId) {
        resultMsg.GiftUrl = gift.Icon;
        resultMsg.GiftName = gift.Name;
      }
    });
    return resultMsg;
  }

  private markTagUser(msg: ChatMessage) {
    const msgObj = JSON.parse(JSON.stringify(msg));
    msgObj.Body = msgObj.Body.replace(/\B@.+,/g, (match) => {
      const removedSymbolTagName = match.replace('@', '');
      let className = 'tag-name';
      if (msg.IsAnchor) { className = 'tag-anchor-name'; }
      return `<span class="${className}">${removedSymbolTagName}</span>`;
    });

    return msgObj;
  }
  private anchorSwitchLevel(msg: ChatMessage): ChatMessage {
    if (msg.IsAnchor) {
      msg.Level = '主播';
    }
    return msg;
  }
  private processChatItem(msg: ChatMessage) {
    const anchorHandledMsg = this.anchorSwitchLevel(msg);
    const msgWithUserTag = this.markTagUser(anchorHandledMsg);
    return msgWithUserTag;
  }

  private updateLikeToStoreLogic() {
    if (this.currentLikeListTemp.length === 0) {
      clearInterval(this.likeListupdateTimer);
      this.likeListupdateTimer = undefined;
      return;
    }

    const newList = [this.currentLikeListTemp[0]];
    this.currentLikeListUpdate(newList);

    this.currentLikeListTemp.shift();
    setTimeout(() => {
      this.currentLikeListUpdate([]);
    }, this.LikeListItemSurviveTime);
  }

  private updateWeaponSentSuccessToStoreLogic() {
    if (this.weaponSentSuccessListTemp.length === 0) {
      clearInterval(this.weaponSentSuccessUpdateTimer);
      this.weaponSentSuccessUpdateTimer = undefined;
      return;
    }

    this.updateWeaponSentSuccessList([this.weaponSentSuccessListTemp[0]]);

    this.weaponSentSuccessListTemp.shift();
    setTimeout(() => {
      this.updateWeaponSentSuccessList([]);
    }, this.weaponSentSuccessItemSurviveTime);
  }

  private updateVVipNoticeToStoreLogic() {
    if (this.vvipNoticeListTemp.length === 0) {
      clearInterval(this.vvipNoticeUpdateTimer);
      this.vvipNoticeUpdateTimer = undefined;
      return;
    }

    const newList = [this.vvipNoticeListTemp[0]];
    this.vvipNoticeListUpdate(newList);

    this.vvipNoticeListTemp.shift();
    setTimeout(() => {
      this.vvipNoticeListUpdate([]);
    }, this.vvipListItemSurviveTime);
  }

  private updateGiftNoticeToStoreLogic() {
    const self = this;
    if (this.giftNoticeListTemp.length === 0) {
      clearInterval(this.giftNoticeUpdateTimer);
      this.giftNoticeUpdateTimer = undefined;
      return;
    }

    const newList = [this.giftNoticeListTemp[0]];
    this.giftNoticeListUpdate(newList);

    this.giftNoticeListTemp.shift();
    this.giftComboTemp.shift();
    setTimeout(() => {
      this.giftNoticeListUpdate([]);
    }, this.giftNoticeSurviveTime);
  }

  private currentChatListUpdate(chatList: ChatMessage[] | PlayerSendGiftResp[]) {
    this.store.dispatch(currentChatListUpdate({ currentChatList: chatList }));
  }
  private currentLikeListUpdate(chatLikeList: PlayerLikeResp[]) {
    this.store.dispatch(currentLikeListUpdate({ currentLikeList: chatLikeList }));
  }
  private vvipNoticeListUpdate(vvipNotices: PlayerLogged[]) {
    this.store.dispatch(vvipNoticeListUpdate({ vvipNoticeList: vvipNotices }));
  }
  private giftNoticeListUpdate(giftNotices: PlayerSendGiftResp[]) {
    this.store.dispatch(giftNoticeListUpdate({ giftNotice: giftNotices }));
  }
  private freeGiftCoolDownUpdate(second: number) {
    this.store.dispatch(freeGiftCoodDownSecUpdate({ freeGiftCoodDownSec: second }));
  }
  private updateGiftComboCount(giftComboCount: PlayerGiftCombo[]) {
    this.store.dispatch(giftComboCountUpdate({ giftComboCount: giftComboCount }));
  }
  private updateWeaponSentSuccessList(weaponSentSuccessList: GivePlayerWeaponResp[]) {
    this.store.dispatch(weaponSentSuccessListUpdate({ weaponSentSuccessList: weaponSentSuccessList }));
  }
  private timeSpeakerUpdate(currentTime: number) {
    this.store.dispatch(timeSpeakerUpdate({
      timeSpeaker: {
        CurrentTimeStamp: currentTime,
        ContinuouslyOnlineSec: 0
      }
    }));
  }
  private limitedTimeTaskListUpdate(taskList: LimitedTimeTask[]) {
    this.store.dispatch(limitedTimeTaskListUpdate({ limitedTimeTaskList: taskList }));
  }
  private limitedTimeActivitiesListUpdate(ActivitiesList: LimitedTimeActivities[]) {
    this.store.dispatch(limitedTimeActivitiesListUpdate({ limitedTimeActivitiesList: ActivitiesList }));
  }
  private getQueryParems<T>(callback) {
    this.route.queryParams
      .subscribe((params: T) => {
        callback(params);
      });
  }

  private useMockVideoUrl() {
    this.getQueryParems<MockVideoParam>((params) => {
      if (!params.mockVideo) { return; }
      const videos = this.mockDataService.getMockVideoUrl();
      this.store.dispatch(videosListUpdate({ videosList: videos }));
    });
  }

  private haveToInterceptMsg(body: string): boolean {
    let result = false;
    this.interceptMsgList.forEach((key) => {
      if (body.includes(key)) {
        result = true;
      }
    });
    return result;
  }

  private dessertMsgHandle(msg: ActivityMsgResp) {
    msg.MessageId = ActivityFeatureCode.DESSERT;
    this.dessertMsgPushGiftList(msg);
  }

  private megaphoneMsgHandle(msg: ActivityMsgResp) {

    if (msg.OnlyReadOnBackstage) return;

    const bodyObj = JSON.parse(msg.Body) as MegaphoneSenderInfo;

    if (bodyObj.Permit === false && bodyObj.SenderId === this.playerId) {
      this.dialog.open(CommonDialogComponent, {
        width: this.appConfig.popup.width,
        data: {
          title: '主播说',
          content: '哦豁!不可以讲敏感内容噢小哥哥!',
          needCancelBtn: false
        },
        panelClass: 'common-dialog-custom-modalbox',
      });
      return;
    }

    if (bodyObj.Permit) {
      const megaphoneMsg = {
        MessageId: ActivityFeatureCode.MEGAPHONE,
        NickName: bodyObj.SenderName,
        Id: bodyObj.SenderId,
        Level: bodyObj.SenderLevel + '',
        Body: bodyObj.SenderBody,
        IsAnchor: false,
        IsEmoji: true,
      } as ChatMessage;
      this.addChatItemInList(megaphoneMsg);
      return;
    }
  }

  private checkOpenLotteryCondition(giftMsg: PlayerSendGiftResp) {
    if (giftMsg.Id === this.playerId) {
      this.allowOpenLotteryGameUpdate(true);
    }
  }
  private updateBalanceToPlalyer(giftMsg: PlayerSendGiftResp) {
    if (giftMsg.Id === this.playerId) {
      this.gameDisplayService.updateBalance({
        Balance: giftMsg.Balance,
        BalanceSeq: giftMsg.BalanceSeq,
      });
    }
  }
  private checkOpenMegaphoneCondition(giftMsg: PlayerSendGiftResp) {
    if (giftMsg.Id === this.playerId && giftMsg.GiftId >= 3) {
      this.updateTaskActive(1, true, false);
    }
  }

  private getLimitTimeTaskList() {

    const dessertCD = 300;
    const megaphoneCD = 1800;

    const dessertEndTime = dayjs(new Date()).unix() + dessertCD;
    const megaphoneEndTime = dayjs(new Date()).unix() + megaphoneCD;

    const tasks: LimitedTimeTask[] = [
      {
        TaskTitle: LimitedTimeTaskName.dessert,
        TaskCode: 0,
        EndTime: dessertEndTime,
        TaskCDTime: dessertCD,
        CanActive: false,
      },
      {
        TaskTitle: LimitedTimeTaskName.megaphone,
        TaskCode: 1,
        EndTime: megaphoneEndTime,
        TaskCDTime: megaphoneCD,
        CanActive: false,
      },
    ];
    this.limitedTimeTaskListUpdate(tasks);
  }

  private subscribeLimitTimeTask() {
    this.store.pipe(
      select(state => state.liveChatFeature.limitedTimeTaskList),
      tap((msg) => {
        this.LimitTimeTaskList = msg;
      })
    ).subscribe();
  }

  private getLimitTimeActivitiesList() {
    const lotteryCD = 900;
    const lotteryEndTime = dayjs(new Date()).unix() + lotteryCD;

    const Activities: LimitedTimeActivities[] = [
      {
        ActivitiesTitle: LimitedTimeActivitiesName.lottery,
        ActivitiesCode: 0,
        EndTime: lotteryEndTime,
        ActivitiesCDTime: lotteryCD,
        CanActive: false,
      }
    ]

    this.limitedTimeActivitiesListUpdate(Activities);
  }

  private subscribeLimitTimeActivities() {
    this.store.pipe(
      select(state => state.liveChatFeature.limitedTimeActivitiesList),
      tap((msg) => {
        this.limitedTimeActivitiesList = msg;
      })
    ).subscribe();
  }

  private turnOnTimeSpeaker() {
    setInterval(() => {
      const currentTimeStamp = dayjs(new Date()).unix();
      this.timeSpeakerUpdate(currentTimeStamp);
    }, 1000);
  }

  private subscribeTimeSpeaker() {
    this.store.pipe(
      select(state => state.liveChatFeature.timeSpeaker),
      tap((msg) => {
        if (msg.CurrentTimeStamp === 0) { return; }
        this.limitTimeTaskController(msg.CurrentTimeStamp);
        this.continuouslyOnlineMsgHandle(msg.ContinuouslyOnlineSec);
      })
    ).subscribe();
  }

  private limitTimeTaskController(currentTimeStamp: number) {
    this.LimitTimeTaskList.forEach((task: LimitedTimeTask) => {
      if (currentTimeStamp >= task.EndTime) {
        if (task.CanActive === false) {
          this.updateTaskActive(task.TaskCode, true, false);
        }
      }
    });
  }

  private continuouslyOnlineMsgHandle(onlineTime: number) {
    const continuouslyOnlineMsg: string[] = this.autoReplyMsgService.getContinuouslyOnlineMsgList(this.gameType);
    if (onlineTime === 1800) {
      const msgBody = continuouslyOnlineMsg[0];
      this.sendContinuouslyOnlineMsg(msgBody);
      return;
    }
    if (onlineTime === 3600) {
      const msgBody = continuouslyOnlineMsg[1];
      this.sendContinuouslyOnlineMsg(msgBody);
      return;
    }
  }

  private proccessWeaponProperty(item: GivePlayerWeaponResp): GivePlayerWeaponResp {
    const finalMsgObj = {
      ...item,
      ...this.translateWeaponName(item.WeaponLevel)
    };

    return finalMsgObj;
  }
  private translateWeaponName(weaponCode: number): AdditionWeaponSccuessItem {
    const weaponNameList = [
      {
        WeaponName: '核弹',
        AwardType: 'weapon'
      },
      {
        WeaponName: '贯穿炮',
        AwardType: 'weapon'
      },
      {
        WeaponName: '主播鱼',
        AwardType: 'fish'
      },
      {
        WeaponName: '钻头炮',
        AwardType: 'weapon'
      },
      {
        WeaponName: '小炸弹',
        AwardType: 'weapon'
      }
    ];

    return weaponNameList[weaponCode - 1];
  }

  private sendActivityMessage(code: string, body: string, onlyReadOnBackstage: boolean) {
    const msgObj: ActivityMsgReq = {
      FeatureCode: code,
      OnlyReadOnBackstage: onlyReadOnBackstage,
      Body: body,
    };
    this.signalrService.send('chat', 'Activity', msgObj);
  }

  private pokeUserMsgHandel(msg: ActivityMsgResp) {
    const bodyObj = JSON.parse(msg.Body) as PokeUserFromAnchor;

    if (bodyObj.FromAnchor) {
      if (bodyObj.SpecifyId === this.playerId) {
        this.showPokePanelUpdate(true);
        const resultMsg = {
          MessageId: ActivityFeatureCode.POKE_USER,
          NickName: msg.NickName,
          Id: msg.Id,
          Level: '主播',
          Body: bodyObj.Content,
          IsAnchor: msg.IsAnchor,
          IsEmoji: false,
        };
        this.addChatItemInList(resultMsg);
      }
    }

    if (!bodyObj.FromAnchor) {
      if (msg.Id === this.playerId) {
        this.showPokePanelUpdate(false);
        const resultMsg = {
          MessageId: ActivityFeatureCode.POKE_USER,
          NickName: msg.NickName,
          Id: msg.Id,
          Level: msg.Level + '',
          Body: bodyObj.Content,
          IsAnchor: msg.IsAnchor,
          IsEmoji: false,
        } as ChatMessage;
        this.addChatItemInList(resultMsg);
      }
    }

  }
}

interface Message {
  Body: string;
  IsEmoji: boolean;
}
