import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameTypeEnum } from '@core/enum/gameType';
import { ChatMessage } from '@core/model/live-chat-room';
import { select, Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/app-state';
@Component({
  selector: 'app-anchor-msg-box',
  templateUrl: './anchor-msg-box.component.html',
  styleUrls: ['./anchor-msg-box.component.scss', './anchor-msg-box.dsg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnchorMsgBoxComponent implements OnInit {

  @Output() sendTagUserFromBox = new EventEmitter<string>();
  @Input()
  item: ChatMessage;
  public themeCode: GameTypeEnum;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.getThemeCode();
  }

  public boxTagUser(userName) {
    this.sendTagUserFromBox.emit(userName);
  }

  public parseEmojiPosition(text: string): string {
    const textArray = text.split(',');
    const xPosition = Number(textArray[0]) * 34;
    const yPosition = Number(textArray[1]) * 34;
    return `-${xPosition}px -${yPosition}px`;
  }

  private getThemeCode() {
    this.store.pipe(
      select(state => state.liveChatFeature.themeCode),
      tap((themeCode) => {
        this.themeCode = themeCode;
      })
    ).subscribe();
  }
}
