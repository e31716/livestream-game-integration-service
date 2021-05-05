import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { ConfigService } from '@core/config/config.service';
import { GameTypeEnum } from '@core/enum/gameType';
import { GameAspectRatioSetting } from '@core/model/live-chat-room';
import { select, Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/app-state';
import { GameLiveDlmlService } from './service/game-live-dlml.service';

@Component({
  selector: 'app-game-live-dlml',
  templateUrl: './game-live-dlml.component.html',
  styleUrls: ['./game-live-dlml.component.scss']
})
export class GameLiveDlmlComponent implements OnInit {
  /** to control child components' visibility */
  @Input() gameType: GameTypeEnum;
  @Input() themeCode: GameTypeEnum;
  @Input() gameAspectRatioSetting: GameAspectRatioSetting;

  public isMobile: boolean;
  public hideAnchor: boolean;

  constructor(
    private configService: ConfigService,
    private gameLiveDlmlService: GameLiveDlmlService,
    private store: Store<AppState>,) { }

  ngOnInit(): void {
    this.isMobile = this.configService.isMobile;
    this.getHideAnchorFromStore();
  }

  public getWindowAspectRatio() {
    return `${window.innerWidth}/${window.innerHeight}`;
  }

  private getHideAnchorFromStore() {
    this.store.pipe(
      select(state => state.shareFeature.hideAnchor),
      tap((hideAnchor) => {
        this.hideAnchor = hideAnchor;
      })
    ).subscribe();
  }
}
