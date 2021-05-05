/**
 * GameLiveDlmp : Game + Livestream module
 * DLMP : Desktop Landscape) & Mobile Portrait
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameLiveDlmpComponent } from './game-live-dlmp.component';
import { SharedModule } from '@shared/shared.module';
import { DesktopLayoutComponent } from './component/desktop-layout/desktop-layout.component';
import { MobileLayoutComponent } from './component/mobile-layout/mobile-layout.component';
import { LiveChatModule } from '@feature/live-chat/live-chat.module';
import { GameDisplayModule } from '@feature/game-display/game-display.module';
import { GameLiveDlmpService } from './service/game-live-dlmp.service';

@NgModule({
  declarations: [
    GameLiveDlmpComponent,
    DesktopLayoutComponent,
    MobileLayoutComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    LiveChatModule,
    GameDisplayModule,
  ],
  exports: [
    GameLiveDlmpComponent
  ],
  providers: [
    GameLiveDlmpService
  ]
})
export class GameLiveDlmpModule { }
