import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DsgRoutingModule } from './dsg-routing.module';
import { DsgComponent } from './dsg.component';
import { SharedModule } from '@shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { DsgService } from './service/dsg.service';
import { GameLiveDlmpModule } from '@feature/game-live/game-live-dlmp/game-live-dlmp.module';
import { DsgSplashPageComponent } from '@feature/dsg/component/dsg-splash-page/dsg-splash-page.component';


@NgModule({
  declarations: [
    DsgComponent,
    DsgSplashPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    GameLiveDlmpModule,
    DsgRoutingModule,
    StoreModule.forFeature('dsgFeature', {})
  ],
  providers: [
    DsgService
  ]
})
export class DsgModule { }
