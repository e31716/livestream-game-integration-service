import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { APP_CONFIG, IAppConfig } from '@core/config/app.config';
import { LobbyUrlResp } from '@core/model/fish-live';
import { LiveChatService } from '@feature/live-chat/service/live-chat.service';
import { CommonDialogComponent } from '@shared/components/common-dialog/common-dialog.component';
@Component({
  selector: 'app-button-back-lobby',
  templateUrl: './button-back-lobby.component.html',
  styleUrls: ['./button-back-lobby.component.scss']
})
export class ButtonBackLobbyComponent implements OnInit {

  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private liveChatService: LiveChatService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  public backToLobby() {

    const dialogRef = this.dialog.open(CommonDialogComponent, {
      width: this.appConfig.popup.width,
      data: {
        title: '提醒',
        content: '确定要离开了吗？',
        needCancelBtn: true
      },
      panelClass: 'common-dialog-custom-modalbox',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.liveChatService.goBackLobbyHandle()
          .subscribe((resp: LobbyUrlResp) => {
            const url = resp.LobbyUrl;
            window.location.href = url;
          });
      }
    });
  }
}
