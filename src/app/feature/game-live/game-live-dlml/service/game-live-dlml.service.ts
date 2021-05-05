import { Injectable } from '@angular/core';
import { GameAspectRatioSetting } from '@core/model/live-chat-room';
import { gameAspectRatioSettingUpdate } from '@feature/game-live/game-live-dlmp/store/game-live-dlmp.actions';
import { LiveChatService } from '@feature/live-chat/service/live-chat.service';
import { Store } from '@ngrx/store';
import { hideAnchorRequest } from '@shared/store/share.actions';
import { AppState } from 'src/app/app-state';

@Injectable({
  providedIn: 'root'
})
export class GameLiveDlmlService {
  constructor(
    private liveChatService: LiveChatService,
    private store: Store<AppState>,) { }

  public changeVoluem(volume) {
    this.liveChatService.changeVoluem(volume);
  }

  public reloadVideo() {
    this.liveChatService.reloadVideo();
  }

  public hideAnchorUpdate(isHide: boolean) {
    this.store.dispatch(hideAnchorRequest({ hideAnchor: isHide }));
  }

  public storeGameAspectRatioSetting(setting: GameAspectRatioSetting) {
    this.store.dispatch(gameAspectRatioSettingUpdate({
      gameAspectRatioSetting: setting,
    }));
  }
}
