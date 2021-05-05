import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MegaphoneMsgBoxComponent } from './megaphone-msg-box.component';

describe('MegaphoneMsgBoxComponent', () => {
  let component: MegaphoneMsgBoxComponent;
  let fixture: ComponentFixture<MegaphoneMsgBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MegaphoneMsgBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MegaphoneMsgBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
