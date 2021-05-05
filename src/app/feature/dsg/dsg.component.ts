import { Component, OnInit } from '@angular/core';
import { fadeInOut } from '@core/animation/animation';
import { GameTypeEnum } from '@core/enum/gameType';
import { GameAspectRatioSetting } from '@core/model/live-chat-room';

@Component({
  selector: 'app-dsg',
  templateUrl: './dsg.component.html',
  styleUrls: ['./dsg.component.scss'],
  animations: [
    fadeInOut,
  ],
})
export class DsgComponent implements OnInit {
  /**
   * Setting
   */
  public gameType = GameTypeEnum.DSG;
  public themeCode = GameTypeEnum.DSG;
  public gameAspectRatioSetting = {
    root: {
      aspectRatio: '1920/1080',
      relativeTo: 'window'
    },
    gameDisplay: {
      aspectRatio: '1280/1080',
      relativeTo: 'parent-height'
    },
    liveChat: {
      aspectRatio: '640/1080',
      relativeTo: 'parent-height'
    }
  } as GameAspectRatioSetting;

  public showSplashScreen = true;
  public showGameLiveScreen = false;

  constructor() { }

  ngOnInit(): void {
    this.delayGameLiveDisplay();
  }

  public receiveprogressPrecent(precent: number) {
    if (precent >= 100) {
      this.showSplashScreen = false;
    }
  }

  private delayGameLiveDisplay() {
    setTimeout(() => {
      this.showGameLiveScreen = true;
    }, 1000);
  }
}
