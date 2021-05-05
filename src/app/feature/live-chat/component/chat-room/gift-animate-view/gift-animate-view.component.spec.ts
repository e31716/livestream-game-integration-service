import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftAnimateViewComponent } from './gift-animate-view.component';

describe('GiftAnimateViewComponent', () => {
  let component: GiftAnimateViewComponent;
  let fixture: ComponentFixture<GiftAnimateViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftAnimateViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftAnimateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
