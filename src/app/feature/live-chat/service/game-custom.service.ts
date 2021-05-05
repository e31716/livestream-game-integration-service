/**
 * GameCustomService For different games's custom needs
 */
import { Injectable } from '@angular/core';
import { ConfigService } from '@core/config/config.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-state';
import { gameLayerTopUpdate } from '../store/live-chat.actions';

@Injectable()
export class GameCustomService {

  private isProcessingDsgLayer = false;

  constructor(
    private configService: ConfigService,
    private store: Store<AppState>) {
    this.listenDsgLayerChangePostMsg();
  }

  /** For switching different layers in DSG game */
  private listenDsgLayerChangePostMsg() {
    window.addEventListener('message', event => {
      const url = new URL(this.configService.initGameInfo.GameUrl);
      const gameOrigin = `${url.protocol}//${url.host}`;
      const msgData: DsgLayerChange = event.data;
      // {type:"popup",msg:"1"}
      // {type:"game_initialized",msg:"1"}

      if (event.origin !== gameOrigin) { return; }

      if (this.isProcessingDsgLayer) { return; }

      this.isProcessingDsgLayer = true;

      switch (msgData.type) {
        case 'popup':
          this.popupPostHandler(msgData.msg);
          break;
        case 'game_initialized':
          this.gameInitialPostHandler(msgData.msg);
          break;
      }

      this.isProcessingDsgLayer = false;
    });
  }

  private popupPostHandler(msg: string): void {
    switch (msg) {
      case '1':
        this.upriseGameLayper();
        break;
      case '0':
        this.dropdownGameLayper();
        break;
    }
  }

  private gameInitialPostHandler(msg: string): void {
    if (msg === '1') {
      this.dropdownGameLayper();
    }
  }

  private upriseGameLayper() {
    this.store.dispatch(gameLayerTopUpdate({ gameLayerTop: true }));
  }

  private dropdownGameLayper() {
    this.store.dispatch(gameLayerTopUpdate({ gameLayerTop: false }));
  }
}

interface DsgLayerChange {
  type: string;
  msg: string;
}
