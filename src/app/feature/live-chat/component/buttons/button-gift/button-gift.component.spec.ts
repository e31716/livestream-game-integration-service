import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonGiftComponent } from './button-gift.component';

describe('ButtonGiftComponent', () => {
  let component: ButtonGiftComponent;
  let fixture: ComponentFixture<ButtonGiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonGiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonGiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
