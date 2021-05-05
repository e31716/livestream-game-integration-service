import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotteryGameEntranceComponent } from './lottery-game-entrance.component';

describe('LotteryGameEntranceComponent', () => {
  let component: LotteryGameEntranceComponent;
  let fixture: ComponentFixture<LotteryGameEntranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LotteryGameEntranceComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotteryGameEntranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
