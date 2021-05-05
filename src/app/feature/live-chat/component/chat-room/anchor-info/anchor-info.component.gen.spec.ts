import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LiveChatService } from '@core/service/live-chat.service';
import { ConfigService } from '@core/config/config.service';
import { AnchorInfoComponent } from './anchor-info.component';
import { AnchorLobbyInfoDetail } from '@core/model/live-chat-room';
import { of } from 'rxjs';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';
import { By } from '@angular/platform-browser';


describe('AnchorInfoComponent', () => {
  let component: AnchorInfoComponent;
  let fixture: ComponentFixture<AnchorInfoComponent>;

  // Jasmine有提供4個handlers，來處理一些在測試前或是測試後可以額外執行的動作。beforeEach,afterEach,beforeAll,afterAll
  // 1.beforeEach 於每一個it function(spec)“執行之前”被執行。
  // 2.afterEach  於每一個it function(spec)”執行之後“被執行。
  // 3.beforeAll  只會在describe()內的所有測試”之前“被呼叫一次。
  // 4.afterAll   會在所有的describe()都做完”之後“被呼叫一次。

  beforeEach(() => {
    const chatRoomServiceStub = () => ({
      likeAnchor: () => ({ subscribe: f => f({}) }),
      unlikeAnchor: () => ({ subscribe: f => f({}) })
    });
    const configServiceStub = () => ({
      fishLiveGameInfo: { AnchorLobbyInfo: { Name: {} } }
    });

    // TestBed(測試床),用來模擬 @NgModule的Angular 測試模組,
    // configureTestingModule方法,方法接收一個元資料物件，其中具有 @NgModule 中的絕大多數屬性。
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AnchorInfoComponent],
      // 要測試哪個服務,就在providers陣列內,填入要進行測試或者模擬的相關服務
      // useFactory可讓angular知道provider是一個工廠函數，其實現是chatRoomServiceStub (angular中useFactory可用於動態建立依賴值)
      providers: [
        { provide: ChatRoomService, useFactory: chatRoomServiceStub },
        { provide: ConfigService, useFactory: configServiceStub },
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    });

    // 注意在不要在執行 createComponent() 之後又修改 TestBed 的相關定義,因為createComponent() 會凍結目前的 TestBed 定義除非關閉它才能進行新的配置。
    fixture = TestBed.createComponent(AnchorInfoComponent);
    component = fixture.componentInstance;
  });

  describe('chatRoomService相關邏輯檢查', () => {
    // describe (string,function是一個容器,裡面可以放多個測試單位(it)
    it('makes expected calls', () => {
      // Injector: 允許我們在Component Level取得 dependencies
      const chatRoomServiceStub: ChatRoomService = fixture.debugElement.injector.get(
        ChatRoomService
      );
      // spyOn像間諜一樣會針對你給的目標(chatRoomServiceStub)內的方法名稱(likeAnchor)
      // callThrough() 呼叫原本的method，而且 Spy 會對此Method進行監測，
      // 因此可搭配其他toHaveBeenCalled()等函式驗證該method是否被呼叫過
      spyOn(chatRoomServiceStub, 'likeAnchor').and.callThrough();
      // 呼叫一次 likeAnchor()
      component.likeAnchor();
      // 期望 likeAnchor方法 有曾經被呼叫過
      expect(chatRoomServiceStub.likeAnchor).toHaveBeenCalled();
    });

    it('檢查likeAnchor回傳的內容', () => {
      // 取得 ChatRoomService
      const chatRoomServiceStub: ChatRoomService = fixture.debugElement.injector.get(ChatRoomService);
      // 用來做假的資料回傳
      const fakeResp = { PlayerLikeStatusLobbyInfo: { LikeCount: 19, StarValue: 651218 }, Code: 0 };
      spyOn(chatRoomServiceStub, 'likeAnchor').and.returnValue(of(fakeResp));
      let myRespCode: number;
      // 訂閱回傳內容
      chatRoomServiceStub.likeAnchor().subscribe((resp) => {
        myRespCode = resp.Code;
      });
      // 期望Code === 0
      expect(myRespCode).toEqual(0);

    });

    it('makes expected calls', () => {
      const chatRoomServiceStub: ChatRoomService = fixture.debugElement.injector.get(
        ChatRoomService
      );
      spyOn(chatRoomServiceStub, 'unlikeAnchor').and.callThrough();
      component.unlikeAnchor();
      expect(chatRoomServiceStub.unlikeAnchor).toHaveBeenCalled();
    });

    it('檢查unlikeAnchor回傳的內容', () => {
      // 取得 ChatRoomService
      const chatRoomServiceStub: ChatRoomService = fixture.debugElement.injector.get(ChatRoomService);
      // 用來做假的資料回傳
      const fakeResp = { PlayerLikeStatusLobbyInfo: { LikeCount: 19, StarValue: 651218 }, Code: 0 };
      spyOn(chatRoomServiceStub, 'unlikeAnchor').and.returnValue(of(fakeResp));
      let myRespCode: number;
      // 訂閱回傳內容
      chatRoomServiceStub.unlikeAnchor().subscribe((resp) => {
        myRespCode = resp.Code;
      });
      // 期望Code === 0
      expect(myRespCode).toEqual(0);
    });
  });

  // 假的AnchorInfo
  const fakeAnchorInfo: AnchorLobbyInfoDetail = {
    CanLike: true,
    FollowCount: 0,
    LikeCount: 22,
    Name: 'Alina',
    StarValue: 650448
  };


  describe('邏輯檢查', () => {
    it('檢查AnchorInfo資料是否從ConfigService過來', () => {
      const configServiceStub: ConfigService = fixture.debugElement.injector.get(ConfigService);
      // 先給 configService 假資料
      configServiceStub.fishLiveGameInfo.AnchorLobbyInfo = fakeAnchorInfo;
      // 透過 fixture.detectChanges() 告訴 TestBed 去做 data binding,這樣angular才會把typescript那邊的變數binding到Dom上面
      component.ngOnInit();
      expect(component.anchorInfo).toEqual(configServiceStub.fishLiveGameInfo.AnchorLobbyInfo);
    });

    it('檢查name是否有出現在html中', () => {
      component.anchorInfo = fakeAnchorInfo;
      const nativeEl = fixture.debugElement.nativeElement;
      fixture.detectChanges();
      expect(nativeEl.querySelector('.name').textContent).toContain(component.anchorInfo.Name);
    });

    it('檢查關注按鈕UI邏輯', () => {
      component.canLike = true;
      fixture.detectChanges();
      const likeButton = fixture.debugElement.query(By.css('.like-anchor'));
      const unLikeButton = fixture.debugElement.query(By.css('unlike-anchor'));
      expect(likeButton).toBeTruthy();
      expect(unLikeButton).toBeFalsy();
    })

    it('檢查likeAnchor邏輯', () => {
      const chatRoomServiceStub: ChatRoomService = fixture.debugElement.injector.get(ChatRoomService);
      // 用來做假的資料回傳
      const fakeResp = { PlayerLikeStatusLobbyInfo: { LikeCount: 19, StarValue: 651218 }, Code: 0 };
      spyOn(chatRoomServiceStub, 'likeAnchor').and.returnValue(of(fakeResp));
      // 假設一開始可以訂閱
      component.canLike = true;
      // 點擊訂閱後
      component.likeAnchor();
      // 期望變成不能訂閱
      expect(component.canLike).toEqual(false);
    });

    it('檢查unLikeAnchor邏輯', () => {
      const chatRoomServiceStub: ChatRoomService = fixture.debugElement.injector.get(ChatRoomService);
      // 用來做假的資料回傳
      const fakeResp = { PlayerLikeStatusLobbyInfo: { LikeCount: 19, StarValue: 651218 }, Code: 0 };
      spyOn(chatRoomServiceStub, 'unlikeAnchor').and.returnValue(of(fakeResp));
      // 假設一開始是已經訂閱
      component.canLike = false;
      // 點擊訂閱後
      component.unlikeAnchor();
      // 期望變成能訂閱
      expect(component.canLike).toEqual(true);
    });
  });


});
