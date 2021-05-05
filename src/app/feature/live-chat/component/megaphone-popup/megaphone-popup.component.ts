import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { APP_CONFIG, IAppConfig } from '@core/config/app.config';
import { LiveChatService } from '@feature/live-chat/service/live-chat.service';
import { CommonDialogComponent } from '@shared/components/common-dialog/common-dialog.component';

@Component({
  selector: 'app-megaphone-popup',
  templateUrl: './megaphone-popup.component.html',
  styleUrls: ['./megaphone-popup.component.scss']
})
export class MegaphonePopupComponent implements OnInit {
  public defaultValue: string = "Let's talk to eveyone!";
  public textValue: string;

  constructor(
    private liveChatService: LiveChatService,
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  public closePopup() {
    this.liveChatService.showMegaphonePopupUpdate(false);
  }

  public sendTextarea() {
    this.liveChatService.userSendMegaPhoneMsg(this.textValue);
    this.liveChatService.updateTaskActive(1, false, true);

    this.closePopup();
    setTimeout(() => {
      const dialogRef = this.dialog.open(CommonDialogComponent, {
        width: this.appConfig.popup.width,
        data: {
          title: 'Notice',
          content: 'Wait for confirmation',
          needCancelBtn: false
        },
        panelClass: 'common-dialog-custom-modalbox',
      });
    }, 500);
  }
}
