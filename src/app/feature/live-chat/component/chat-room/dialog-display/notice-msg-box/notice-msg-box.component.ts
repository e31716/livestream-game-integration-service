import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChatMessage } from '@core/model/live-chat-room';
import { select, Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/app-state';
@Component({
  selector: 'app-notice-msg-box',
  templateUrl: './notice-msg-box.component.html',
  styleUrls: ['./notice-msg-box.component.scss', './notice-msg-box.dsg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoticeMsgBoxComponent implements OnInit {

  @Output() sendTagUserFromBox = new EventEmitter<string>();
  @Input() item: ChatMessage;
  public themeCode: string;
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
