import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonBackLobbyComponent } from './button-back-lobby.component';

describe('ButtonBackLobbyComponent', () => {
  let component: ButtonBackLobbyComponent;
  let fixture: ComponentFixture<ButtonBackLobbyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonBackLobbyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonBackLobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
