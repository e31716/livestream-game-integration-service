import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfigService } from '@core/config/config.service';
import { LiveChatService } from '@feature/live-chat/service/live-chat.service';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs/internal/Subscription';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/app-state';

@Component({
  selector: 'app-button-volume-control',
  templateUrl: './button-volume-control.component.html',
  styleUrls: ['./button-volume-control.component.scss']
})
export class ButtonVolumeControlComponent implements OnInit, OnDestroy {

  constructor(
    private store: Store<AppState>,
    private configService: ConfigService,
    private liveChatService: LiveChatService,) { }

  /** 目前音量 */
  public currentVolume: number;
  public isMobile: boolean;
  public isShowVolumePopup = false;

  /** 以訂閱內容 */
  private currentVolumeSubscription: Subscription;

  ngOnInit(): void {
    this.getDeviceType();
    this.getCurrentVolume();
  }

  ngOnDestroy(): void {
    this.currentVolumeSubscription.unsubscribe();
  }

  /** 切換視訊線路彈窗開關 */
  public toggleVolumePopup() {
    // 如果是手機板,不會跳出微調聲音的彈窗,只能開跟關
    if (this.isMobile) {
      this.volumeSwitch();
      return;
    }
    this.isShowVolumePopup = !this.isShowVolumePopup;
  }

  /** 從子元件接收音量資訊 */
  public receiveVolume($event) {
    this.changeVolume($event);
  }

  /** 取得目前音量 從 stroe */
  private getCurrentVolume() {
    this.currentVolumeSubscription = this.store.pipe(
      select(state => state.liveChatFeature.currentVolume),
      tap((currentVolume) => {
        this.currentVolume = currentVolume;
      })
    ).subscribe();
  }

  /** 取得是否為手機版 */
  private getDeviceType() {
    this.isMobile = this.configService.isMobile;
  }

  /** 音量彈窗開關 */
  private volumeSwitch() {
    if (this.currentVolume === 0) {
      this.receiveVolume(50);
    } else if (this.currentVolume === 50) {
      this.receiveVolume(0);
    }
  }

  /** 送出音量變更 */
  private changeVolume(volume) {
    this.liveChatService.changeVoluem(volume);
  }

}
