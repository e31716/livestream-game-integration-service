import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerMsgBoxComponent } from './player-msg-box.component';

describe('PlayerMsgBoxComponent', () => {
  let component: PlayerMsgBoxComponent;
  let fixture: ComponentFixture<PlayerMsgBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerMsgBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerMsgBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
