import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideUpPanelComponent } from './slide-up-panel.component';

describe('SlideUpPanelComponent', () => {
  let component: SlideUpPanelComponent;
  let fixture: ComponentFixture<SlideUpPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideUpPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideUpPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
