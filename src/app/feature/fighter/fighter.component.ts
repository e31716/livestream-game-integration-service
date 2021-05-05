import { Component, OnInit } from '@angular/core';
import { fadeInOut } from '@core/animation/animation';
import { GameTypeEnum } from '@core/enum/gameType';
import { GameAspectRatioSetting } from '@core/model/live-chat-room';
@Component({
    selector: 'app-fighter',
    templateUrl: './fighter.component.html',
    styleUrls: ['./fighter.component.scss'],
    animations: [
        fadeInOut,
    ],
})
export class FighterComponent implements OnInit {
    /**
     * Setting
     */
    public gameType = GameTypeEnum.FISH;
    public themeCode = GameTypeEnum.DEFAULT;
    public gameAspectRatioSetting = {
        root: {
            aspectRatio: '2.39/1',
            relativeTo: 'window',
        },
        gameDisplay: {
            aspectRatio: '16/9',
            relativeTo: 'parent-height',
        },
        liveChat: {
            aspectRatio: '1/1.633',
            relativeTo: 'parent-height',
        },
    } as GameAspectRatioSetting;

    public showSplashScreen = true;
    public showGameLiveScreen = false;

    constructor() { }

    ngOnInit(): void {
        this.delayGameLiveDisplay();
    }

    public receiveprogressPrecent(precent: number) {
        if (precent >= 100) {
            this.showSplashScreen = false;
        }
    }

    private delayGameLiveDisplay() {
        setTimeout(() => {
            this.showGameLiveScreen = true;
        }, 1000);
    }
}
