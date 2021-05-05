import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HidePanelPopupComponent } from './hide-panel-popup.component';

describe('HidePanelPopupComponent', () => {
  let component: HidePanelPopupComponent;
  let fixture: ComponentFixture<HidePanelPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HidePanelPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HidePanelPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
