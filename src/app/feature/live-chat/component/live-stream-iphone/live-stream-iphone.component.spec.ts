import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveStreamIphoneComponent } from './live-stream-iphone.component';

describe('LiveStreamComponent', () => {
  let component: LiveStreamIphoneComponent;
  // tslint:disable-next-line: whitespace
  let fixture: ComponentFixture<LiveStreamIphoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LiveStreamIphoneComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveStreamIphoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
