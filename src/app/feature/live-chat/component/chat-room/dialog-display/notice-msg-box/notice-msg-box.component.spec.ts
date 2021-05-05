import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeMsgBoxComponent } from './notice-msg-box.component';

describe('NoticeMsgBoxComponent', () => {
  let component: NoticeMsgBoxComponent;
  let fixture: ComponentFixture<NoticeMsgBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeMsgBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeMsgBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
