import { Component, HostListener, Input, OnInit } from '@angular/core';
import { fadeIn } from '@core/animation/animation';
import { ConfigService } from '@core/config/config.service';
import { GameTypeEnum } from '@core/enum/gameType';
import { GameAspectRatioSetting } from '@core/model/live-chat-room';
import { select, Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/app-state';
import { GameLiveDlmlService } from '../../service/game-live-dlml.service';

@Component({
  selector: 'app-desktop-layout',
  templateUrl: './desktop-layout.component.html',
  styleUrls: ['./desktop-layout.component.scss'],
  animations: [
    fadeIn,
  ],
})
export class DesktopLayoutComponent implements OnInit {
  /** GameType for child components to control visibility */
  @Input() gameType: GameTypeEnum;
  @Input() themeCode: GameTypeEnum;
  @Input() gameAspectRatioSetting: GameAspectRatioSetting;

  public hideAnchor: boolean;
  public windowAspectRatio = `${window.innerWidth}/${window.innerHeight}`;
  public showProcessing = false;
  public inLandscape = false;
  private resizeTime = 0;

  constructor(
    private gameLiveDlmlService: GameLiveDlmlService,
    private store: Store<AppState>,
    private configService: ConfigService,
  ) { }

  ngOnInit(): void {
    this.getHideAnchorFromStore();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.resizeTime += 1;
    this.showGameDisplayInLandscape();
  }

  public showAnchor() {
    this.gameLiveDlmlService.hideAnchorUpdate(false);
  }

  private getHideAnchorFromStore() {
    this.store.pipe(
      select(state => state.shareFeature.hideAnchor),
      tap((hideAnchor) => {
        this.hideAnchor = hideAnchor;
        this.showProcessingView();
      })
    ).subscribe();
  }

  private showProcessingView() {
    this.showProcessing = true;
    setTimeout(() => {
      this.showProcessing = false;
    }, 1000);
  }

  private showGameDisplayInLandscape() {
    if (this.inLandscape) { return; }
    if (this.configService.isMobile) {
      // tslint:disable-next-line: deprecation
      if (window.orientation === 90 || window.orientation === -90 || this.resizeTime >= 2) {
        this.inLandscape = true;
        return;
      }
    } else {
      this.inLandscape = true;
    }
  }
}
