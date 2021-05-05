/**
 * GameLiveDlml : Game + Livestream modules
 * DLML : Desktop Landscape & Mobile Landscape
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameLiveDlmlComponent } from './game-live-dlml.component';
import { SharedModule } from '@shared/shared.module';
import { LiveChatModule } from '@feature/live-chat/live-chat.module';
import { GameDisplayModule } from '@feature/game-display/game-display.module';
import { GameLiveDlmlService } from './service/game-live-dlml.service';
import { DesktopLayoutComponent } from './component/desktop-layout/desktop-layout.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    GameLiveDlmlComponent,
    DesktopLayoutComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
    LiveChatModule,
    GameDisplayModule,
  ],
  exports: [
    GameLiveDlmlComponent,
  ],
  providers: [
    GameLiveDlmlService,
  ]
})
export class GameLiveDlmlModule { }
