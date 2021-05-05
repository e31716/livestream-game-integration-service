import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { FishInitResp } from '@core/model/live-chat-room';
import { CdnUrlResp, LiveChatUIStyle } from '@core/model/share';
import { environment as env } from '@env/environment';
import { APP_CONFIG, IAppConfig } from './app.config';
import { UtilityService } from '@core/service/utility.service';

@Injectable()
export class ConfigService {
  public isMock = env.envName === 'mock';
  // tslint:disable-next-line:variable-name
  public API_URL_Origin = this.isMock ? env.apiUrl : `${location.origin}`;
  public CDN_URL: string;
  public liveChatUIStyle: LiveChatUIStyle;
  public initGameInfo: FishInitResp;
  public deviceInfo: DeviceInfo;
  public isMobile: boolean;
  public isTablet: boolean;
  public isFullScreenAvailable: boolean;

  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private http: HttpClient,
    private deviceService: DeviceDetectorService,
    private utilityService: UtilityService) { }

  /** APP 啟動前執行的都放這裡 */
  public initData(): Promise<any> {
    this.getDeviceInfo();
    this.getCdnUrl();
    return this.getInitGameInfo();
  }

  public getAuthToken(): string {
    return this.initGameInfo ? this.initGameInfo.Token : '';
  }

  private getInitGameInfo() {
    const query = location.search;
    const apiURL = this.utilityService.replaceUrlGameType(
      this.appConfig.endpoints.login,
      window.location.pathname.split('/')[1]
    );

    return this.http.get<FishInitResp>(`${apiURL}${query}`)
      .pipe(tap((resp) => {
        this.initGameInfo = resp;
      })).toPromise();
  }

  private getCdnUrl() {
    const apiURL = this.appConfig.endpoints.cdnConfig;
    return this.http.get<CdnUrlResp>(apiURL)
      .pipe(
        tap((resp) => {
          this.CDN_URL = resp.CdnPath;
          this.liveChatUIStyle = {
            fish: resp.LsgFrontendUIStyle,
            dsg: '1'
          };
        })).toPromise();
  }

  private getDeviceInfo() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    // only Android device and not UIWebView can process fullscreen api
    this.isFullScreenAvailable = this.deviceInfo.os === 'Android' && !navigator.userAgent.includes('wv');
  }
}
