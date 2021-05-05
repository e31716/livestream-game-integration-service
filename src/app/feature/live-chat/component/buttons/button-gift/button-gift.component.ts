import { Component, OnInit } from '@angular/core';
import { LiveChatService } from '@feature/live-chat/service/live-chat.service';
import { select, Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/app-state';

@Component({
  selector: 'app-button-gift',
  templateUrl: './button-gift.component.html',
  styleUrls: ['./button-gift.component.scss']
})
export class ButtonGiftComponent implements OnInit {

  public badge = false; // 是否有新的通知
  private currentGiftPanelState: boolean;
  constructor(private store: Store<AppState>, private liveChatService: LiveChatService,) { }

  ngOnInit(): void {
    this.getGiftPanelState();
    this.subscribeLimitTimeTask();
  }

  /** 開啟禮物面板 */
  public openGiftPanel() {
    // 如果已經是開啟狀態,再點擊了話,就不做事 = 點擊到外部component 就會關掉
    if (this.currentGiftPanelState) {
      return;
    }
    // 延遲一點推送,避免與點擊外部directive衝突
    setTimeout(() => {
      this.liveChatService.showGiftPanelUpdate(true);
    }, 100);
  }
  /** 訂閱限時任務清單 */
  private subscribeLimitTimeTask() {
    this.store.pipe(
      select(state => state.liveChatFeature.limitedTimeTaskList),
      tap((msg) => {
        if (msg === []) { return; }// 空白的不理
        let unActiveNumber = 0;
        // 如果有任務可以觸發,就要出現紅點
        msg.forEach((task) => {
          if (task.CanActive) {
            this.badge = true;
          } else {
            unActiveNumber++;
          }
        });
        if (unActiveNumber === msg.length) {
          // 代表全部任務都還不可以觸發,移除紅點
          this.badge = false;
        }
      })
    ).subscribe();
  }

  /** 取得禮物面板狀態從Store */
  private getGiftPanelState() {
    this.store.pipe(
      select(state => state.liveChatFeature.showGiftPanel),
      tap((showGiftPanel) => {
        this.currentGiftPanelState = showGiftPanel;
      }
      )).subscribe();
  }
}
