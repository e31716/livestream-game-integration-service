import {
  Component,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-state';
import { interval, Subscription } from 'rxjs';
import { FighterService } from '@feature/fighter/service/fighter.service';

@Component({
  selector: 'app-fighter-splash-page',
  templateUrl: './fighter-splash-page.component.html',
  styleUrls: ['./fighter-splash-page.component.scss']
})
export class FighterSplashPageComponent implements OnInit, OnDestroy {

  animateSubscription: Subscription; // 用於變更狀態
  progressPrecent: number; // 進度％
  showEnterButton = false;
  @Output() sendprogressPrecent = new EventEmitter<number>();// 發送進度％出去

  constructor(
    private store: Store<AppState>,
    private fighterService: FighterService) { }

  ngOnInit(): void {
    this.progressPrecent = 0;
    // 每0.4秒改變一次狀態
    this.animateSubscription = interval(300).subscribe(() => {
      this.handleProcess();
    });
  }

  ngOnDestroy() {
    this.animateSubscription.unsubscribe();
  }

  /** 進入遊戲, 關掉啟動頁,重載視訊,開啟聲音 */
  public enterToGame() {
    this.sendprogressPrecent.emit(100); // 送出100時,啟動頁就會消失
    this.reloadVideo();// 先reload一次
    this.changeVoluem(50);// 再調音量
  }

  /** 控制進度條－現在是假的 */
  private handleProcess() {
    // 生成0~20隨機數,不包含小數
    const randomNumber = Number((Math.random() * 20).toFixed(0));
    if (this.progressPrecent < 100) {
      if (this.progressPrecent + randomNumber > 100) {
        this.progressPrecent = 100;
      } else {
        this.progressPrecent += randomNumber;
      }
    }
    // 如果進度到100%時,要顯示進入按鈕
    if (this.progressPrecent === 100) {
      this.showEnterButton = true;
    }
  }

  /** 送出音量變更 */
  private changeVoluem(volume) {
    this.fighterService.changeVoluem(volume);
  }

  /** 送出重載直播影片指示 */
  private reloadVideo() {
    this.fighterService.reloadVideo();
  }
}
