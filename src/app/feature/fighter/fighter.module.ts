import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { LiveChatModule } from '@feature/live-chat/live-chat.module';
import { GameDisplayModule } from '@feature/game-display/game-display.module';
import { StoreModule } from '@ngrx/store';
import { FighterComponent } from './fighter.component';
import { MatIconModule } from '@angular/material/icon';
import { FighterService } from './service/fighter.service';
import { FighterSplashPageComponent } from './component/fighter-splash-page/fighter-splash-page.component';
import { FighterRoutingModule } from './fighter-routing.module';
import { GameLiveDlmlModule } from '@feature/game-live/game-live-dlml/game-live-dlml.module';

@NgModule({
  declarations: [
    FighterComponent,
    FighterSplashPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
    LiveChatModule,
    GameDisplayModule,
    FighterRoutingModule,
    GameLiveDlmlModule,
    StoreModule.forFeature('fighterFeature', {

    })
  ],
  providers: [
    FighterService,
  ]
})
export class FighterModule { }
