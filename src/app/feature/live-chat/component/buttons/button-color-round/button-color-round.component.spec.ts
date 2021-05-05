import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonColorRoundComponent } from './button-color-round.component';

describe('ButtonColorRoundComponent', () => {
  let component: ButtonColorRoundComponent;
  let fixture: ComponentFixture<ButtonColorRoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonColorRoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonColorRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
