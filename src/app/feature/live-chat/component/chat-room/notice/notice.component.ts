import { Component, OnInit } from '@angular/core';
import { inOutAnimation } from '@core/animation/animation';
import { Store, select } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/app-state';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss'],
  animations: [
    inOutAnimation
  ]
})
export class NoticeComponent implements OnInit {

  public anchorName: string;

  currentLikeList$ = this.store.pipe(
    select(state => state.liveChatFeature.currentLikeList)
  );

  constructor(
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.pipe(
      select(state => state.liveChatFeature.anchorLobbyInfo),
      tap((anchorLobbyInfo) => {
        this.anchorName = anchorLobbyInfo.NickName;
      })
    ).subscribe();
  }
}
