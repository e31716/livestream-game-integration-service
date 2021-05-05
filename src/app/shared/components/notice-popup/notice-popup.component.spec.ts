import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticePopupComponent } from './notice-popup.component';

describe('NoticePopupComponent', () => {
  let component: NoticePopupComponent;
  let fixture: ComponentFixture<NoticePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
