import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameLiveDlmlComponent } from './game-live-dlml.component';

describe('GameLiveDlmlComponent', () => {
  let component: GameLiveDlmlComponent;
  let fixture: ComponentFixture<GameLiveDlmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameLiveDlmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameLiveDlmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
