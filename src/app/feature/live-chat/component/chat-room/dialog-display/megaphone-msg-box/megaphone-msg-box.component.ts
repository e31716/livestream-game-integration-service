import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameTypeEnum } from '@core/enum/gameType';
import { ChatMessage } from '@core/model/live-chat-room';
import { select, Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/app-state';

@Component({
  selector: 'app-megaphone-msg-box',
  templateUrl: './megaphone-msg-box.component.html',
  styleUrls: ['./megaphone-msg-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MegaphoneMsgBoxComponent implements OnInit {

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

  private getThemeCode() {
    this.store.pipe(
      select(state => state.liveChatFeature.themeCode),
      tap((themeCode) => {
        this.themeCode = themeCode;
      })
    ).subscribe();
  }

}
