import { Component, Input, OnInit } from '@angular/core';
import { GameLiveLayout } from '@core/enum/gameLiveLayout';
import { GameTypeEnum } from '@core/enum/gameType';
import { GameAspectRatioSetting } from '@core/model/live-chat-room';

@Component({
  selector: 'app-desktop-layout',
  templateUrl: './desktop-layout.component.html',
  styleUrls: ['./desktop-layout.component.scss']
})
export class DesktopLayoutComponent implements OnInit {
  /** to control child components' visibility */
  @Input() gameType: GameTypeEnum;
  @Input() themeCode: GameTypeEnum;
  @Input() gameAspectRatioSetting: GameAspectRatioSetting;

  public gameLiveLayout = GameLiveLayout.DLMP;

  constructor() { }

  ngOnInit(): void {
  }

}
