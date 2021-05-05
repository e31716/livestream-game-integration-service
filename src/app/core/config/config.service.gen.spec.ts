import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { LikeStatusLobbyInfo, FishLiveGameInfo } from '@core/model/live-chat-room';
import { AnchorSelectRoomResp } from '@core/model/live-chat-room';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ConfigService } from './config.service';
describe('ConfigService', () => {
  let service: ConfigService;
  let fakefishLiveGameInfo: FishLiveGameInfo;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    const likeStatusLobbyInfoStub = () => ({ LikeCount: {}, StarValue: {} });
    const anchorSelectRoomRespStub = () => ({
      FollowCount: {},
      LikeCount: {},
      NickName: {},
      StarValue: {}
    });
    const deviceDetectorServiceStub = () => ({
      getDeviceInfo: () => ({}),
      isMobile: () => ({}),
      isTablet: () => ({})
    });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ConfigService,
        {
          provide: DeviceDetectorService,
          useFactory: deviceDetectorServiceStub
        }
      ]
    });
    service = TestBed.inject(ConfigService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  // 假的fishLiveGameInfo
  fakefishLiveGameInfo = {
    Code: 100,
    Currency: '',
    GameUrl: '',
    GiftCount: 0,
    Gifts: [],
    RoomId: '',
    Token: 'this is token',
    Videos: [],
    AnchorLobbyInfo: {
      CanLike: true,
      FollowCount: 0,
      LikeCount: 0,
      StarValue: 0,
      Name: ''
    }
  };

  describe('邏輯檢查', (() => {
    it('initData APP啟動前執行 -> getDeviceInfo', (() => {
      // 設備資訊
      const deviceServiceStub = TestBed.inject(DeviceDetectorService);
      const fakeDeviceInfo = {
        userAgent: 'my userAgent',
        os: 'my os',
        browser: 'my browser',
        device: 'my device',
        os_version: 'my os_version',
        browser_version: 'my browser_version'
      };
      // 取代設備資訊回傳的內容
      spyOn(deviceServiceStub, 'getDeviceInfo').and.returnValue(fakeDeviceInfo);
      spyOn(deviceServiceStub, 'isMobile').and.returnValues(false);
      spyOn(deviceServiceStub, 'isTablet').and.returnValue(true);
      // 執行方法
      service.initData();
      // 期望得到的設備資訊
      expect(service.deviceInfo).toEqual(fakeDeviceInfo);
      expect(service.isMobile).toEqual(false);
      expect(service.isTablet).toEqual(true);

    }));

    it('initData APP啟動前執行 -> getFishLiveGameInfo', (() => {
      const query = location.search;
      // 執行方法
      service.initData();
      // 找匹配 '/api/games/fish${query}' 的 requset
      const req = httpTestingController.expectOne(`/api/games/fish${query}`);
      // 期望他是GET方法
      expect(req.request.method).toEqual('GET');
      // flush方法,會帶入你想提供給網路請求的任何回應
      req.flush(fakefishLiveGameInfo);
      // 期望fishLiveGameInfo,等於請求回來的假資料
      expect(service.fishLiveGameInfo).toEqual(fakefishLiveGameInfo);
    }));

    it('updateAnchorInfo 更新主播資訊', (() => {
      // 先給個假數據
      service.fishLiveGameInfo = fakefishLiveGameInfo;
      const obj = {
        LikeCount: 100,
        StarValue: 50
      };
      service.updateAnchorInfo(obj);
      expect(service.fishLiveGameInfo.AnchorLobbyInfo.LikeCount).toEqual(100);
      expect(service.fishLiveGameInfo.AnchorLobbyInfo.StarValue).toEqual(50);
      // 我初始值是true,現在變false
      expect(service.fishLiveGameInfo.AnchorLobbyInfo.CanLike).toEqual(false);
    }));
  }));

  xit('anchorSelectRoomUpdateInfo 主播換房', (() => {
    // API還沒好
  }));

  it('getAuthToken 取得登入token', (() => {
    // 先給個假數據
    service.fishLiveGameInfo = fakefishLiveGameInfo;
    const getedToken = service.getAuthToken();
    expect(fakefishLiveGameInfo.Token).toEqual('this is token');
  }));
});
