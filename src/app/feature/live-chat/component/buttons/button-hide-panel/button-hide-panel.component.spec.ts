import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonHidePanelComponent } from './button-hide-panel.component';

describe('ButtonHidePanelComponent', () => {
  let component: ButtonHidePanelComponent;
  let fixture: ComponentFixture<ButtonHidePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonHidePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonHidePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
