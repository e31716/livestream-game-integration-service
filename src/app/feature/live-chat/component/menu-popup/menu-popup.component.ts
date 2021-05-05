import { Component, OnDestroy, OnInit } from '@angular/core';
import { VideoDetail } from '@core/model/live-chat-room';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app-state';
import { tap } from 'rxjs/operators';
import { LiveChatService } from '@feature/live-chat/service/live-chat.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-menu-popup',
  templateUrl: './menu-popup.component.html',
  styleUrls: ['./menu-popup.component.scss']
})
export class MenuPopupComponent implements OnInit, OnDestroy {

  public videoSrcList: VideoDetail[];
  public currentVideo: number;
  public isHideChatRoom: boolean;

  constructor(
    private store: Store<AppState>, private liveChatService: LiveChatService) { }

  private objectSubscription: Subscription;

  ngOnInit(): void {
    this.getIsObjectSubscription();
  }

  ngOnDestroy(): void {
    this.objectSubscription.unsubscribe();
  }

  public emitUrlChange(priority) {
    if (priority === this.currentVideo) { return; }
    this.currentVideo = priority;
    this.liveChatService.switchUrlUpdate(priority);
  }

  private getIsObjectSubscription() {
    this.objectSubscription = this.store.pipe(
      select(state => state.liveChatFeature),
      tap((liveChatFeature) => {
        this.videoSrcList = liveChatFeature.videosList;
        this.currentVideo = liveChatFeature.currentVideo;
        this.isHideChatRoom = liveChatFeature.isHideChatRoom;
      })
    ).subscribe();
  }
}
