import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialNoticeComponent } from './special-notice.component';

describe('SpecialNoticeComponent', () => {
  let component: SpecialNoticeComponent;
  let fixture: ComponentFixture<SpecialNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
