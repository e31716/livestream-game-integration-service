import flvjs from 'flv.js';
import { Component, OnInit } from '@angular/core';
import { VideoDetail } from '@core/model/live-chat-room';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app-state';
import { tap } from 'rxjs/operators';
import { stat } from 'fs';
import { GameTypeEnum } from '@core/enum/gameType';

@Component({
  selector: 'app-live-stream',
  templateUrl: './live-stream.component.html',
  styleUrls: ['./live-stream.component.scss', './live-stream.dsg.component.scss']
})
export class LiveStreamComponent implements OnInit {
  public status: string;
  public flvPlayerInstant: any;
  public themeCode: GameTypeEnum;
  private videoSrcList: VideoDetail[];
  private currentUrl: string;
  private isMuted: boolean;
  private flvHeartStopAmount = 0;
  private networkErrorAmount = 0;
  private currentVolume: number;

  constructor(
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.status = 'loading';
    this.isMuted = false;
    // 取得影片清單
    this.store.pipe(
      select(state => state.liveChatFeature.videosList),
      tap((videosList) => {
        this.videoSrcList = videosList;
        this.currentUrl = this.getUrl(0)?.Flv;

        this.setFlvplayer();
      })
    ).subscribe();

    // MOCK
    // this.videoSrcList = [
    //   {
    //     Flv: '//tw.2q3k.cn/obs/018.flv',
    //     Hls: '//tw.2q3k.cn/obs/018/playlist.m3u8',
    //     Priority: 0
    //   },
    //   {
    //     Flv: '//tw.2q3k.cn/obs/018.flv',
    //     Hls: '//tw.2q3k.cn/obs/018/playlist.m3u8',
    //     Priority: 1
    //   },
    //   {
    //     Flv: '//tw.pubcc.cn/obs/018.flv',
    //     Hls: '//tw.pubcc.cn/obs/018/playlist.m3u8',
    //     Priority: 2
    //   }
    // ];
    // this.currentUrl = this.getUrl(0)?.Flv;
    // this.setFlvplayer();
    // MOCK    

    // 取得遊戲類型
    this.getThemeCode();

    // 監聽目前影片
    this.store.pipe(
      select(state => state.liveChatFeature.currentVideo),
      tap((currentVideo) => {
        this.switchUrl(currentVideo);
      })
    ).subscribe();
    // 監聽目前音量
    this.store.pipe(
      select(state => state.liveChatFeature.currentVolume),
      tap((currentVolume) => {
        this.currentVolume = currentVolume;
        this.adjustVoluem(currentVolume);
      })
    ).subscribe();
    /** 取得 refreshVideo 通知 */
    this.store.pipe(
      select(state => state.liveChatFeature.refreshVideo),
      tap((refreshVideo) => {
        if (refreshVideo === 0) { return; }
        this.reloadVideo();
      })
    ).subscribe();
  }

  reloadVideo() {
    this.status = 'loading';
    this.destroyFlyplayer();
    this.setFlvplayer();
  }

  mutedVideo() {
    this.isMuted = !this.isMuted;
    this.flvPlayerInstant.muted = this.isMuted;
  }

  adjustVoluem(vol) {
    this.flvPlayerInstant.volume = this.validVoluemValue(vol);
  }

  switchUrl(priority) {
    this.status = 'loading';
    this.destroyFlyplayer();
    this.currentUrl = this.getUrl(priority)?.Flv;
    this.setFlvplayer();
  }

  getUrl(priority) {
    for (const v of this.videoSrcList) {
      if (v.Priority === priority) {
        return v;
      }
    }
  }

  setFlvplayer() {
    this.status = 'loading';
    if (flvjs.isSupported()) {
      const videoElement = document.getElementById('videoElement') as HTMLAudioElement;
      this.flvPlayerInstant = flvjs.createPlayer({
        type: 'flv',
        url: this.currentUrl
      });
      this.flvHalfwayErrorHandle();
      this.flvPlayerInstant.attachMediaElement(videoElement);
      this.flvPlayerInstant.load();
      this.flvPlayerInstant.muted = true;
      setTimeout(() => {
        // @ts-ignore
        if (videoElement.paused) {
          this.flvPlayerInstant.play().then(() => {
            // Automatic playback started!
            // Show playing UI.
            this.flvPlayerInstant.muted = false;
            this.flvPlayerInstant.volume = this.validVoluemValue(this.currentVolume);
            this.status = 'playing';
            // 成功play心跳停止計數器,斷網計數器歸零
            this.flvHeartStopAmount = 0;
            this.networkErrorAmount = 0;
            this.flvHeartbeatListen();
          }).catch(error => {
            // Auto-play was prevented
            // Show paused UI.
            console.log('error', error);
          });
        }
      }, 100);
    }
  }

  /** 音量數值轉換成0-1之間的小數,Flvplayer才能使用 */
  private validVoluemValue(volume: number): number {
    return volume / 100;
  }

  private destroyFlyplayer() {
    this.flvPlayerInstant.destroy();
  }
  /** flv中途錯誤處理 */
  private flvHalfwayErrorHandle() {
    this.flvPlayerInstant.on(flvjs.Events.ERROR, (errorType, errorDetail, errorInfo) => {
      // console.log('errorType', errorType);
      // console.log('errorDetail', errorDetail);
      // console.log('errorInfo', errorInfo);

      console.log('flvPlayer發生了錯誤');
      // 網路類型的錯誤處理
      if (errorType === 'NetworkError') {
        // flv網址錯誤
        if (errorInfo.code === 404) {
          this.status = 'error';
          return;
        }
        // 斷網錯誤
        this.networkErrorAmount += 1;
        console.log('將於三秒後ReloadVideo');
        setTimeout(() => {
          if (this.networkErrorAmount >= 4) {
            // 超過四次重建flv失敗,判斷為網路斷線
            this.status = 'network-error';
          } else {
            this.reloadVideo();
          }
        }, 3000);
      }
    });
  }
  /** flv心跳監控 */
  private flvHeartbeatListen() {
    this.flvPlayerInstant.on(flvjs.Events.STATISTICS_INFO, (info) => {
      // speed 為0,代表心跳停止
      if (info.speed === 0) {
        this.flvHeartStopHandle();
      }
    });
  }
  /** flv心跳停止處理 */
  private flvHeartStopHandle() {
    this.flvHeartStopAmount += 1;
    if (this.flvHeartStopAmount >= 6) {
      console.log('超過3秒沒接收到直播流,開始reloadVideo');
      this.reloadVideo();
    }
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
