import { Inject, Injectable } from '@angular/core';
import { NoticePopupComponent } from '@shared/components/notice-popup/notice-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { APP_CONFIG, IAppConfig } from '@core/config/app.config';

@Injectable({
  providedIn: 'root'
})
/** Popup for new features */
export class NewFeatureNoticeService {

  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    public dialog: MatDialog) { }

  /** Check local version and latest version */
  private versionNumberSame(gametype) {
    // the local version
    const versionNum = localStorage.getItem('versionNumber');
    return versionNum === this.appConfig.newFeatureNotice[gametype].version;
  }

  public updatePopNeverShowAgain(gametype) {
    const neverShowAgain = localStorage.getItem('updatePopNeverShowAgain');
    if (neverShowAgain === 'true' && this.versionNumberSame(gametype)) { return; } else { this.showTempPopup(gametype); }
  }

  private showTempPopup(gametype) {
    localStorage.setItem('versionNumber', this.appConfig.newFeatureNotice[gametype].version);

    const dialogRef = this.dialog.open(NoticePopupComponent, {
      width: this.appConfig.popup.width,
      data: {
        title: this.appConfig.newFeatureNotice[gametype].title,
        content: this.appConfig.newFeatureNotice[gametype].content,
        needCancelBtn: true
      },
      panelClass: 'notice-popup-custom-modalbox',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result) => {
      // result = true means click yes; result = false means click no 
      if (result) {
        localStorage.setItem('updatePopNeverShowAgain', 'false');
      } else {
        localStorage.setItem('updatePopNeverShowAgain', 'true');
      }
    });
  }

}
