import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { APP_CONFIG, IAppConfig } from '@core/config/app.config';
import { ConfigService } from '@core/config/config.service';
import { GameTypeEnum } from '@core/enum/gameType';
import { LobbyUrlResp } from '@core/model/fish-live';
import { NewFeatureNoticeService } from '@core/service/new-feature-notice.service';
import { UtilityService } from '@core/service/utility.service';
import { GameLiveDlmpService } from '@feature/game-live/game-live-dlmp/service/game-live-dlmp.service';
import { CommonDialogComponent } from '@shared/components/common-dialog/common-dialog.component';

@Injectable()
export class DsgService {

  private isloadingExitProcess = false;

  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private configService: ConfigService,
    private newFeatureNoticeService: NewFeatureNoticeService,
    private utilityService: UtilityService,
    private gameLiveDlmpService: GameLiveDlmpService,
    private http: HttpClient,
    public dialog: MatDialog) {

    this.utilityService.changeTheme(GameTypeEnum.DSG);

    setTimeout(() => {
      this.newFeatureNoticeService.updatePopNeverShowAgain(GameTypeEnum.DSG);
    }, 1000);

    this.listenFishGameExitPostMessage();
  }

  public changeVoluem(volume) {
    this.gameLiveDlmpService.changeVoluem(volume);
  }

  public reloadVideo() {
    this.gameLiveDlmpService.reloadVideo();
  }

  private listenFishGameExitPostMessage() {
    window.addEventListener('message', event => {
      const url = new URL(this.configService.initGameInfo.GameUrl);
      const gameOrigin = `${url.protocol}//${url.host}`;
      const msgData: ExitPostMessage = event.data;

      if (event.origin !== gameOrigin) { return; }

      if (msgData.type === 'exit_game') {
        if (this.isloadingExitProcess) { return; }
        this.isloadingExitProcess = true;

        const dialogRef = this.dialog.open(CommonDialogComponent, {
          width: this.appConfig.popup.width,
          data: {
            title: '提醒',
            content: '闲置过久，即将返回大厅',
            needCancelBtn: false
          },
          panelClass: 'common-dialog-custom-modalbox',
        });

        dialogRef.afterClosed().subscribe((result) => {
          this.goBackGameLobby();
        });
      }
    });
  }

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
