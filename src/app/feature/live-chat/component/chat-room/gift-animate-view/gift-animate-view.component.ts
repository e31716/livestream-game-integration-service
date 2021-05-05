import { Component, OnDestroy, OnInit } from '@angular/core';
import { inOutAnimation } from '@core/animation/animation';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app-state';
import { PlayerSendGiftResp } from '@core/model/fish-live';
import { tap } from 'rxjs/operators';
import * as SVGA from 'svgaplayerweb';
import { computeMsgId } from '@angular/compiler';
import { Subscription } from 'rxjs';
import { GameTypeEnum } from '@core/enum/gameType';
@Component({
  selector: 'app-gift-animate-view',
  templateUrl: './gift-animate-view.component.html',
  styleUrls: ['./gift-animate-view.component.scss', './gift-animate-view.dsg.component.scss'],
  animations: [
    inOutAnimation,
  ],
})
export class GiftAnimateViewComponent implements OnInit, OnDestroy {

  public giftNoticeList: PlayerSendGiftResp[];
  public themeCode: GameTypeEnum;
  private svgaPlayer: SVGA.Player;
  private svgaParser: SVGA.Parser;
  private audio: HTMLAudioElement;
  private giftNoticeListSubscription: Subscription;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.setSVGAPlayer();
    this.getGiftNoticeList();
    this.getThemeCode();
  }
  ngOnDestroy(): void {
    this.giftNoticeListSubscription.unsubscribe();
  }
  private setSVGAPlayer() {
    this.svgaPlayer = new SVGA.Player('#giftCanvas');
    this.svgaParser = new SVGA.Parser();
    this.svgaPlayer.setContentMode('AspectFill');
    this.svgaPlayer.loops = 1;
  }
  private playSVGAPlayer() {
    this.svgaParser.load('assets/img/animate/sports-car/sports-car.svga', (videoItem) => {
      this.svgaPlayer.setVideoItem(videoItem);
      this.svgaPlayer.startAnimation();
    });
  }

  private setAudioElement() {
    this.audio = new Audio();
    this.audio.src = 'assets/img/animate/sports-car/sports-car.mp3';
    this.audio.load();
  }

  private getGiftNoticeList() {
    this.giftNoticeListSubscription = this.store.pipe(
      select(state => state.liveChatFeature.giftNoticeList),
      tap((giftNoticeList) => {
        this.giftNoticeList = giftNoticeList;
        if (this.giftNoticeList.length !== 0) {
          this.detectUseBigAnimateGift();
        }
      })
    ).subscribe();
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
