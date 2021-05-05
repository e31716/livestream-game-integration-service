import { Injectable } from '@angular/core';
import { GameAspectRatioSetting } from '@core/model/live-chat-room';
import { LiveChatService } from '@feature/live-chat/service/live-chat.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-state';
import { gameAspectRatioSettingUpdate } from '../store/game-live-dlmp.actions';
@Injectable({
  providedIn: 'root'
})
export class GameLiveDlmpService {

  constructor(
    private liveChatService: LiveChatService,
    private store: Store<AppState>,) { }

  /** 送出音量變更 */
  public changeVoluem(volume) {
    this.liveChatService.changeVoluem(volume);
  }

  /** 送出重載直播影片指示 */
  public reloadVideo() {
    this.liveChatService.reloadVideo();
  }
  /** 儲存收到的遊戲類型 */
  public storeGameAspectRatioSetting(setting: GameAspectRatioSetting) {
    this.store.dispatch(gameAspectRatioSettingUpdate({
      gameAspectRatioSetting: setting
    }));
  }
}
