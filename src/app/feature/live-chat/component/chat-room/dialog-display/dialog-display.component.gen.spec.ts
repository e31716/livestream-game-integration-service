import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { LiveChatService } from '@core/service/live-chat.service';
import { DialogDisplayComponent } from './dialog-display.component';
import { ChatMessage } from '@core/model/live-chat-room';
describe('DialogDisplayComponent', () => {
  let component: DialogDisplayComponent;
  let fixture: ComponentFixture<DialogDisplayComponent>;
  beforeEach(() => {
    const changeDetectorRefStub = () => ({ markForCheck: () => ({}) });
    const chatRoomServiceStub = () => ({
      currentChatList: {},
      broadcastInfo: string => ({}),
      chatAction: { subscribe: f => f({}) }
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DialogDisplayComponent],
      providers: [
        { provide: ChangeDetectorRef, useFactory: changeDetectorRefStub },
        { provide: ChatRoomService, useFactory: chatRoomServiceStub }
      ]
    });
    fixture = TestBed.createComponent(DialogDisplayComponent);
    component = fixture.componentInstance;
  });
  const fakeChatData: ChatMessage = { MessageId: '6', NickName: 'Johnny', Id: '3', Level: '3', Body: '您好', IsAnchor: false };
  describe('ChatRoomService相關邏輯檢查', () => {
    it('取用中央儲存的聊天清單', () => {
      const chatRoomServiceStub: ChatRoomService = fixture.debugElement.injector.get(ChatRoomService);
      chatRoomServiceStub.currentChatList = [fakeChatData];
      component.ngOnInit();
      expect(component.chatMessageList[0].NickName).toEqual('Johnny');
    });

    // 載入時觸發更新-要解決setTimeout(非同步)的測試-一直錯,不會寫
    xit('onInit時觸發broadcastInfo', fakeAsync(() => {
      const chatRoomServiceStub: ChatRoomService = fixture.debugElement.injector.get(ChatRoomService);
      spyOn(chatRoomServiceStub, 'broadcastInfo').and.callThrough();
      component.ngOnInit();
      tick(100);
      expect(chatRoomServiceStub.broadcastInfo).toHaveBeenCalled();
    }));
  });

  describe('邏輯檢查', () => {
    it('tagUser觸發邏輯', () => {
      spyOn(component.sendTagUser, 'emit');
      component.tagUser('Johnny');
      expect(component.sendTagUser.emit).toHaveBeenCalledWith('Johnny');
    });
  });
});
