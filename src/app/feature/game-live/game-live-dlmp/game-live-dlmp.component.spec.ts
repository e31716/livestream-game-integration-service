import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameLiveDlmpComponent } from './game-live-dlmp.component';

describe('GameLiveDlmpComponent', () => {
  let component: GameLiveDlmpComponent;
  let fixture: ComponentFixture<GameLiveDlmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameLiveDlmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameLiveDlmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
