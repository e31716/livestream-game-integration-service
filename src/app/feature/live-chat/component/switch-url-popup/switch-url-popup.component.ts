import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { VideoDetail } from '@core/model/live-chat-room';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app-state';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-switch-url-popup',
  templateUrl: './switch-url-popup.component.html',
  styleUrls: ['./switch-url-popup.component.scss']
})
/**
 * Mobile - Switch Network
 */
export class SwitchUrlPopupComponent implements OnInit {
  @Output() changeUrl = new EventEmitter<number>();

  currentVideo$ = this.store.pipe(
    select(state => state.liveChatFeature.currentVideo),
    tap((currentVideo) => {
      this.currentVideo = currentVideo;
    })
  );

  public videoSrcList: VideoDetail[];
  private currentVideo: number;

  constructor(
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.pipe(
      select(state => state.liveChatFeature.videosList),
      tap((videosList) => {
        this.videoSrcList = videosList;
      })
    ).subscribe();
  }

  emitUrlChange(priority) {
    if (priority === this.currentVideo) { return; }
    this.currentVideo = priority;
    this.changeUrl.emit(priority);
  }
}
