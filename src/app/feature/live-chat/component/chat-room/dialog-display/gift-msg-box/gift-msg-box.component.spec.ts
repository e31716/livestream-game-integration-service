import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftMsgBoxComponent } from './gift-msg-box.component';

describe('GiftMsgBoxComponent', () => {
  let component: GiftMsgBoxComponent;
  let fixture: ComponentFixture<GiftMsgBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftMsgBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftMsgBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
