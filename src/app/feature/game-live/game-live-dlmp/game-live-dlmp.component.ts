import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { ConfigService } from '@core/config/config.service';
import { GameTypeEnum } from '@core/enum/gameType';
import { GameAspectRatioSetting } from '@core/model/live-chat-room';
import { GameLiveDlmpService } from './service/game-live-dlmp.service';

@Component({
  selector: 'app-game-live-dlmp',
  templateUrl: './game-live-dlmp.component.html',
  styleUrls: ['./game-live-dlmp.component.scss'],
})

export class GameLiveDlmpComponent implements OnInit {
  /** to control child components' visibility */
  @Input() gameType: GameTypeEnum;
  @Input() themeCode: GameTypeEnum;
  @Input() gameAspectRatioSetting: GameAspectRatioSetting;

  public isMobile: boolean;

  constructor(
    private configService: ConfigService,
    private gameLiveDlmpService: GameLiveDlmpService) { }

  ngOnInit(): void {
    this.isMobile = this.configService.isMobile;
  }

  private storeGameAspectRatioSetting() {
    this.gameLiveDlmpService.storeGameAspectRatioSetting(
      this.gameAspectRatioSetting
    );
  }
}
