import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameTypeEnum } from '@core/enum/gameType';
import { ChatMessage } from '@core/model/live-chat-room';
import { select, Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/app-state';

@Component({
  selector: 'app-player-msg-box',
  templateUrl: './player-msg-box.component.html',
  styleUrls: ['./player-msg-box.component.scss', './player-msg-box.dsg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerMsgBoxComponent implements OnInit {

  @Output() sendTagUserFromBox = new EventEmitter<string>();
  @Input()
  item: ChatMessage;
  public themeCode: GameTypeEnum;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.getThemeCode();
  }

  /** 標記用戶 */
  public boxTagUser(userName) {
    this.sendTagUserFromBox.emit(userName);
  }

  /** 解析emoji訊息傳過來的座標 */
  public parseEmojiPosition(text: string): string {
    const textArray = text.split(',');
    const xPosition = Number(textArray[0]) * 34;
    const yPosition = Number(textArray[1]) * 34;
    return `-${xPosition}px -${yPosition}px`;
  }

  /** 取得遊戲代號 */
  private getThemeCode() {
    this.store.pipe(
      select(state => state.liveChatFeature.themeCode),
      tap((themeCode) => {
        this.themeCode = themeCode;
      })
    ).subscribe();
  }

}
