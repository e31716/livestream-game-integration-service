import videojs from 'video.js';
import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { VideoDetail } from '@core/model/live-chat-room';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app-state';
import { tap } from 'rxjs/operators';
import { GameTypeEnum } from '@core/enum/gameType';

@Component({
  selector: 'app-live-stream-iphone',
  templateUrl: './live-stream-iphone.component.html',
  styleUrls: ['./live-stream-iphone.component.scss', './live-stream-iphone.dsg.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LiveStreamIphoneComponent implements OnInit {
  @ViewChild('target', { static: true }) target: ElementRef;
  public status: string;
  public vjsplayerInstant: videojs.Player;
  public themeCode: GameTypeEnum;
  private videoSrcList: VideoDetail[];
  private currentUrl: string;
  private options: IOptions;
  private videoReloadAmount = 0; // 重新reload的次數
  private needReloadCheck = false; // 是否在進行videoReload的循環中
  private currentVolume: number;

  constructor(
    private store: Store<AppState>) { }

  ngOnInit(): void {

    // 取得遊戲類型
    this.getThemeCode();

    this.status = 'loading';
    this.options = {
      autoplay: true,
      controls: false,
      crossOrigin: 'anonymous',
      sources: [{
        src: this.currentUrl,
        type: 'application/x-mpegURL'
      }]
    };

    // 取得影片清單
    this.store.pipe(
      select(state => state.liveChatFeature.videosList),
      tap((videosList) => {
        this.videoSrcList = videosList;
        if (videosList.length !== 0) {
          this.currentUrl = this.getUrl(0)?.Hls;
          this.options.sources[0].src = this.currentUrl;
          this.setplayer();
          this.listenCurrentVideo();
          this.listenCurrentVolume();
          this.listenReloadVideo();
        }
      })
    ).subscribe(); // 如果没有在html直接引用就要 subscribe
  }
  /** 監聽 refreshVideo 通知 */
  private listenReloadVideo() {
    this.store.pipe(
      select(state => state.liveChatFeature.refreshVideo),
      tap((refreshVideo) => {
        if (refreshVideo === 0) { return; }
        this.reloadVideo();
      })
    ).subscribe();
  }
  /** 監聽目前影片 */
  private listenCurrentVideo() {
    // 監聽目前影片
    this.store.pipe(
      select(state => state.liveChatFeature.currentVideo),
      tap((currentVideo) => {
        this.switchUrl(currentVideo);
      })
    ).subscribe(); // 如果没有在html直接引用就要 subscribe
  }
  /** 監聽目前音量 */
  private listenCurrentVolume() {
    this.store.pipe(
      select(state => state.liveChatFeature.currentVolume),
      tap((currentVolume) => {
        this.currentVolume = currentVolume;
        this.adjustVoluem(currentVolume);
      })
    ).subscribe();
  }

  /** 重整 player */
  private reloadVideo() {
    this.videoReloadAmount += 1;
    this.status = 'loading';
    this.vjsplayerInstant.src(this.options.sources[0]);
  }
  /** 切換音量 */
  private adjustVoluem(vol) {
    // iphone 無法微調整音量,所以只接收0代表靜音,100代表非靜音
    if (vol === 0) {
      this.vjsplayerInstant.muted(true);
    } else if (vol === 50) {
      this.vjsplayerInstant.muted(false);
    }
  }
  /** 切換網址並重啟 player */
  private switchUrl(priority) {
    this.status = 'loading';
    this.currentUrl = this.getUrl(priority)?.Hls;
    this.options.sources[0].src = this.currentUrl;
    this.vjsplayerInstant.src(this.options.sources[0]);
  }
  /** 取得指定順位的網址物件 */
  private getUrl(priority) {
    for (const v of this.videoSrcList) {
      if (v.Priority === priority) {
        return v;
      }
    }
  }
  /** 起始設定 */
  private setplayer() {
    this.status = 'loading';

    this.vjsplayerInstant = videojs(
      this.target.nativeElement,
      this.options,
      () => {
        this.vjsplayerInstant.on('playing', () => {
          this.adjustVoluem(this.currentVolume);
          this.status = 'playing';
          this.resetReloadStatus();
        });
        this.videoJsErrorHandle();
      });
  }

  /** 消滅目前影片 */
  private destroyVjsplayer() {
    this.vjsplayerInstant.dispose();
  }

  /** videojs的錯誤處理 */
  private videoJsErrorHandle() {

    // 畫面因各種原因造成的停止
    this.vjsplayerInstant.on('waiting', () => {
      if (this.status === 'playing') {
        console.log('畫面播放過程中停止了');
        this.needReloadCheck = true;
        this.reloadVideo();
      }
    });

    // 其他錯誤:包括Url錯誤,或者網路連線錯誤
    this.vjsplayerInstant.on('error', () => {

      // 如果已經reload過四次都失敗 -> 遇到錯誤時不再reload了
      if (this.videoReloadAmount >= 4) {
        this.needReloadCheck = false;
      }
      // reload
      if (this.needReloadCheck === true) {
        console.log(`３秒後進行Reload-第${this.videoReloadAmount}次`);
        setTimeout(() => {
          this.reloadVideo();
        }, 3000);
        return;
      }
      // 顯示錯誤訊息
      if (this.videoReloadAmount >= 4) {
        // 一直reload失敗的錯誤 => 网路错误
        this.status = 'network-error';
      } else {
        // 其他錯誤 => 加載失敗
        this.status = 'error';
      }
    });
  }

  /** 重置因錯誤統計的Reload數字 */
  private resetReloadStatus() {
    console.log('resetReloadStatus');
    this.videoReloadAmount = 0;
    this.needReloadCheck = false;
  }

  /** 取得遊戲類型 從 store */
  private getThemeCode() {
    this.store.pipe(
      select(state => state.liveChatFeature.themeCode),
      tap((themeCode) => {
        this.themeCode = themeCode;
      })).subscribe();
  }

}

interface IOptions {
  autoplay: boolean;
  controls: boolean;
  crossOrigin: string;
  sources: { src: string; type: string; }[];
}
