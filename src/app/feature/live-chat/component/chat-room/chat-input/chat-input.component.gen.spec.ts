import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, DebugElement, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatInputComponent } from './chat-input.component';
import { By } from '@angular/platform-browser';

describe('ChatInputComponent', () => {
  let component: ChatInputComponent;
  let fixture: ComponentFixture<ChatInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ChatInputComponent]
    });
    fixture = TestBed.createComponent(ChatInputComponent);
    component = fixture.componentInstance;
    // 這裡不知道為什麼 沒加下面這段,在呼叫component的方法時會跑出
    // TypeError: Cannot read property 'nativeElement' of undefined 的警告(不是錯誤)
    fixture.detectChanges();
  });

  describe('邏輯檢查', () => {

    it('測試showEmojiPicker', () => {
      spyOn(component.emitEmojiPicker, 'emit');
      const button = fixture.debugElement.query(By.css('.emoji'));
      button.nativeElement.click();
      expect(component.emitEmojiPicker.emit).toHaveBeenCalled();
    });

    it('測試sendMessage', () => {
      spyOn(component.emitChatMessage, 'emit');
      component.newChatMessage = '你好';
      const button = fixture.debugElement.query(By.css('.send'));
      button.nativeElement.click();
      expect(component.emitChatMessage.emit).toHaveBeenCalledWith('你好');
    });

    it('測試addTag', () => {
      // 假設一開始已經輸入了‘你好’
      component.newChatMessage = '你好';
      component.tagList = [];
      // 接著點擊到玩家名稱 Johnny
      component.addTag('Johnny');
      // 期望輸入內容，tagList內有'Johnny'
      expect(component.newChatMessage).toEqual('你好 @Johnny,');
      expect(component.tagList).toEqual(['Johnny']);
    });

    it('測試Emoji', () => {
      component.newChatMessage = '晚安';
      // 假的emoji事件
      const fakeEmojiEven = {
        emoji: {
          native: 'emojiImg'
        }
      };
      component.addEmoji(fakeEmojiEven);
      expect(component.newChatMessage).toEqual('晚安emojiImg');
    });
  });
});
