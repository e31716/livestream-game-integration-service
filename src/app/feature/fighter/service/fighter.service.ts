import { Inject, Injectable } from '@angular/core';
import { ConfigService } from '@core/config/config.service';
import { LobbyUrlResp } from '@core/model/fish-live';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogComponent } from '@shared/components/common-dialog/common-dialog.component';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '@core/config/app.config';
import { UtilityService } from '@core/service/utility.service';
import { GameTypeEnum } from '@core/enum/gameType';
import { NewFeatureNoticeService } from '@core/service/new-feature-notice.service';
import { GameLiveDlmlService } from '@feature/game-live/game-live-dlml/service/game-live-dlml.service';

@Injectable()
export class FighterService {

  private isloadingExitProcess = false;

  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private configService: ConfigService,
    private newFeatureNoticeService: NewFeatureNoticeService,
    private utilityService: UtilityService,
    private gameLiveDlmlService: GameLiveDlmlService,
    private http: HttpClient,
    public dialog: MatDialog,) {
    // 變更主題
    this.utilityService.changeTheme(GameTypeEnum.DEFAULT);
    // 新功能提示彈窗
    setTimeout(() => {
      this.newFeatureNoticeService.updatePopNeverShowAgain(GameTypeEnum.FISH);
    }, 1000);
    this.listenFishGameExitPostMessage();
  }

  /** 送出音量變更 */
  public changeVoluem(volume) {
    this.gameLiveDlmlService.changeVoluem(volume);
  }

  /** 送出重載直播影片指示 */
  public reloadVideo() {
    this.gameLiveDlmlService.reloadVideo();
  }

  /** 監聽來自遊戲端的離開通知 */
  private listenFishGameExitPostMessage() {
    window.addEventListener('message', event => {
      const url = new URL(this.configService.initGameInfo.GameUrl);
      const gameOrigin = `${url.protocol}//${url.host}`;
      const msgData: ExitPostMessage = event.data;

      // 若不是來自遊戲 Domain 就離開
      if (event.origin !== gameOrigin) { return; }
      // 確認是離開遊戲指令
      if (msgData.type === 'exit_game') {
        // 若已在處理中就略過
        if (this.isloadingExitProcess) { return; }
        // 更新 flag
        this.isloadingExitProcess = true;

        // 開啟共用dialog
        const dialogRef = this.dialog.open(CommonDialogComponent, {
          width: this.appConfig.popup.width,
          data: {
            title: '提醒',
            content: '闲置过久，即将返回大厅',
            needCancelBtn: false,
          },
          panelClass: 'common-dialog-custom-modalbox',
        });
        // 訂閱關閉後的事件
        dialogRef.afterClosed().subscribe((result) => {
          this.goBackGameLobby();
        });
      }
    });
  }
  /** 返回大廳前,要先去拿新的url */
  private goBackGameLobby() {
    const apiURL = this.appConfig.endpoints.lobbyUrl;

    this.http.get(apiURL)
      .subscribe((resp: LobbyUrlResp) => {
        const url = resp.LobbyUrl;
        window.location.href = url;
      });
  }
}

export interface ExitPostMessage {
  dir: string;
  type: string;
  message: string;
}
