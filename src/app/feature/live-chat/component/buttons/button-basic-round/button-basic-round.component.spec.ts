import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonBasicRoundComponent } from './button-basic-round.component';

describe('ButtonBasicRoundComponent', () => {
  let component: ButtonBasicRoundComponent;
  let fixture: ComponentFixture<ButtonBasicRoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonBasicRoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonBasicRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
