import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnchorMsgBoxComponent } from './anchor-msg-box.component';

describe('AnchorMsgBoxComponent', () => {
  let component: AnchorMsgBoxComponent;
  let fixture: ComponentFixture<AnchorMsgBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnchorMsgBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnchorMsgBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
