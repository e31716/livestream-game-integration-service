import { Component, Input, OnInit } from '@angular/core';
import { GameLiveLayout } from '@core/enum/gameLiveLayout';
import { GameTypeEnum } from '@core/enum/gameType';

@Component({
  selector: 'app-mobile-layout',
  templateUrl: './mobile-layout.component.html',
  styleUrls: ['./mobile-layout.component.scss']
})
export class MobileLayoutComponent implements OnInit {
  /** to control child components' visibility */
  @Input() gameType: GameTypeEnum;
  @Input() themeCode: GameTypeEnum;

  public gameLiveLayout = GameLiveLayout.DLMP;

  constructor() { }

  ngOnInit(): void {
  }
}
