import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class UtilityService {
  // for fullscreen operation
  private element;
  constructor(@Inject(DOCUMENT) private document: any,) {
    this.element = document.documentElement;
  }

  /** replace url path */
  public replaceUrlGameType(endpoint: string, gameType: string): string {
    return `${endpoint.replace('{gameType}', gameType)}`;
  }

  public changeTheme(gameType) {
    const appWrapper = document.querySelector('#app-wrapper');
    // clear all classes
    appWrapper.className = '';
    // add class for swiching theme
    appWrapper.classList.add(`theme-${gameType}`);
  }

  public fullScreenSwitch(isFullScreen, callback) {
    if (isFullScreen) {
      this.openFullscreen();
    } else {
      this.closeFullscreen();
    }
    callback();
  }

  private openFullscreen() {
    if (this.element.requestFullscreen) {
      this.element.requestFullscreen();
    } else if (this.element.mozRequestFullScreen) {
      /* Firefox */
      this.element.mozRequestFullScreen();
    } else if (this.element.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.element.webkitRequestFullscreen();
    } else if (this.element.msRequestFullscreen) {
      /* IE/Edge */
      this.element.msRequestFullscreen();
    }
  }

  private closeFullscreen() {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }
}
