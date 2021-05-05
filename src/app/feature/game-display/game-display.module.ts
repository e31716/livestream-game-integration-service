import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameDisplayComponent } from '@feature/game-display/game-display.component';
import { MatIconModule } from '@angular/material/icon';
import { LiveChatRoomModule } from '@feature/live-chat-room/live-chat-room.module';
import { SharedModule } from '@shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { balanceInfoReducer, gameUrlReducer } from './store/game-display.reducers';
import { GameDisplayService } from './service/game-display.service';

@NgModule({
  declarations: [
    GameDisplayComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
    LiveChatRoomModule,
    StoreModule.forFeature('gameDisplayFeature', {
      // property name 建議跟 State 一致
      gameUrl: gameUrlReducer,
      balanceInfo: balanceInfoReducer,
    })
  ],
  exports: [
    GameDisplayComponent,
  ],
  providers: [
    GameDisplayService,
  ],
})
export class GameDisplayModule { }
