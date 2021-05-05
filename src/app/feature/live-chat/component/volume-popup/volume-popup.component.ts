import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app-state';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-volume-popup',
  templateUrl: './volume-popup.component.html',
  styleUrls: ['./volume-popup.component.scss']
})
export class VolumePopupComponent implements OnInit {
  @Output() changeVolume = new EventEmitter<number>();

  public currentVolume: number;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.pipe(
      select(state => state.liveChatFeature.currentVolume),
      tap((currentVolume) => {
        this.currentVolume = currentVolume;
      })
    ).subscribe();
  }
  getVolume() {
    this.emitVolume();
  }

  goToVolume(type: string) {
    this.currentVolume = type === 'max' ? 100 : 0;
    this.emitVolume();
  }

  emitVolume() {
    this.changeVolume.emit(this.currentVolume);
  }
}
