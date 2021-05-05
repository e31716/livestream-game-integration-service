import { NgModule, Optional, SkipSelf, APP_INITIALIZER } from '@angular/core';
import { environment as env } from '@env/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SignalrService } from '@core/service/signalr.service';
import { AuthGuard } from '@core/auth/auth.guard';
import { UserService } from '@core/service/user.service';
import { UserStoreService } from '@core/service/user-store.service';
import { ConfigService } from '@core/config/config.service';
import { httpInterceptorProviders } from './interceptor/interceptor-barrel';
import { UtilityService } from './service/utility.service';
import { FishLiveService } from '@feature/fish-live/service/fish-live.service';
import { MockDataService } from './mock/mock-data.service';
import { NewFeatureNoticeService } from './service/new-feature-notice.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [],
  // More info for Prividers
  // https://angular.io/guide/dependency-injection-providers
  providers: [
    httpInterceptorProviders,
    { provide: Window, useValue: window },
    SignalrService,
    AuthGuard,
    UserService,
    UserStoreService,
    ConfigService,
    FishLiveService,
    UtilityService,
    MockDataService,
    NewFeatureNoticeService,
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: ConfigService) => () => configService.initData(),
      deps: [ConfigService],
      multi: true
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
