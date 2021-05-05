import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '@shared/components/header/header.component';
import { LoginComponent } from '@shared/login/login.component';
// UI modules
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AutoScrollDirective } from '@shared/directive/auto-scroll.directive';
import { ForceLandscapeComponent } from '@shared/components//force-landscape/force-landscape.component';
import { IsMobileDirective } from '@shared/directive/is-mobile.directive';
import { MobileVisibleDirective } from '@shared/directive/mobile-visible.directive';
import { SplashPageComponent } from './components/splash-page/splash-page.component';
import { IphoneVisibleDirective } from './directive/iphone-visible.directive';
import { GiftNamePipe } from './pipes/gift-name.pipe';
import { GiftAdContentPipe } from './pipes/gift-ad-content.pipe';
import { NameProtectPipe } from './pipes/name-protect.pipe';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { VipLevelComponent } from './components/vip-level/vip-level.component';
import { InProcessingComponent } from './components/in-processing/in-processing.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { VipRankComponent } from './components/vip-rank/vip-rank.component';
import { RandomBgColorDirective } from './directive/random-bg-color.directive';
import { RandomFloatPathDirective } from './directive/random-float-path.directive';
import { ClickOutsildDirective } from './directive/click-outsild.directive';
import { TouchAndMoveDirective } from './directive/touch-and-move.directive';
import { CommonDialogComponent } from './components/common-dialog/common-dialog.component';
import { ScratchOffCardComponent } from './components/scratch-off-card/scratch-off-card.component';
import { ForceRotateComponent } from './components/force-rotate/force-rotate.component';
import { WhenToShowDirective } from './directive/when-to-show.directive';
import { KeepAspectRatioDirective } from './directive/keep-aspect-ratio.directive';
import { DsgGameMockComponent } from './components/mock/dsg-game-mock.component';
import { StoreModule } from '@ngrx/store';
import { hideAnchorReducer } from './store/share.reducers';
import { WidePhoneDeviceDirective } from './directive/wide-phone-device.directive';
import { NoticePopupComponent } from './components/notice-popup/notice-popup.component';

// Purpose: SharedModule collect all shared components/directive/pipe for entire app
@NgModule({
  declarations: [
    HeaderComponent,
    LoginComponent,
    AutoScrollDirective,
    ForceLandscapeComponent,
    IsMobileDirective,
    MobileVisibleDirective,
    SplashPageComponent,
    IphoneVisibleDirective,
    GiftNamePipe,
    GiftAdContentPipe,
    NameProtectPipe,
    SafeUrlPipe,
    VipLevelComponent,
    InProcessingComponent,
    VipRankComponent,
    RandomBgColorDirective,
    RandomFloatPathDirective,
    ClickOutsildDirective,
    TouchAndMoveDirective,
    CommonDialogComponent,
    ScratchOffCardComponent,
    ForceRotateComponent,
    WhenToShowDirective,
    KeepAspectRatioDirective,
    DsgGameMockComponent,
    WidePhoneDeviceDirective,
    NoticePopupComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    StoreModule.forFeature('shareFeature', {
      hideAnchor: hideAnchorReducer,
    }),
  ],
  exports: [
    HeaderComponent,
    LoginComponent,
    AutoScrollDirective,
    ForceLandscapeComponent,
    IsMobileDirective,
    MobileVisibleDirective,
    SplashPageComponent,
    IphoneVisibleDirective,
    GiftNamePipe,
    GiftAdContentPipe,
    NameProtectPipe,
    SafeUrlPipe,
    VipLevelComponent,
    InProcessingComponent,
    VipRankComponent,
    RandomBgColorDirective,
    RandomFloatPathDirective,
    ClickOutsildDirective,
    TouchAndMoveDirective,
    CommonDialogComponent,
    ScratchOffCardComponent,
    ForceRotateComponent,
    WhenToShowDirective,
    KeepAspectRatioDirective,
    DsgGameMockComponent,
    WidePhoneDeviceDirective
  ]
})
export class SharedModule { }
