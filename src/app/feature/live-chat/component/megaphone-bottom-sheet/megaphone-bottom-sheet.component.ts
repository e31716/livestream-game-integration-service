import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { APP_CONFIG, IAppConfig } from '@core/config/app.config';
import { LiveChatService } from '@feature/live-chat/service/live-chat.service';
import { CommonDialogComponent } from '@shared/components/common-dialog/common-dialog.component';

@Component({
  selector: 'app-megaphone-bottom-sheet',
  templateUrl: './megaphone-bottom-sheet.component.html',
  styleUrls: ['./megaphone-bottom-sheet.component.scss']
})
export class MegaphoneBottomSheetComponent implements OnInit {
  public defaultValue: string = "全服大喇八–让世界听到你的声音\n（30字内）";
  public textValue: string;

  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private megaphoneBottomSheetRef: MatBottomSheetRef<MegaphoneBottomSheetComponent>,
    private liveChatService: LiveChatService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  /** 關閉 megaphone bottom sheet */
  public closeBottomSheet() {
    this.megaphoneBottomSheetRef.dismiss();
  }

  /** 送出訊息 */
  public sendTextarea() {
    // 送出訊息
    this.liveChatService.userSendMegaPhoneMsg(this.textValue);
    // 更新endTime,及狀態 (taskCode = 1 => 大聲公)
    this.liveChatService.updateTaskActive(1, false, true);

    // 關閉面板
    this.closeBottomSheet();
    // 開啟共用dialog
    setTimeout(() => {
      const dialogRef = this.dialog.open(CommonDialogComponent, {
        width: this.appConfig.popup.width,
        data: {
          title: '提醒',
          content: '已提交系统审核',
          needCancelBtn: false
        },
        panelClass: 'common-dialog-custom-modalbox',
      });
    }, 500);
  }
}
