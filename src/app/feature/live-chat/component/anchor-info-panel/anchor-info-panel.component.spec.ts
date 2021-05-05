import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnchorInfoPanelComponent } from './anchor-info-panel.component';

describe('AnchorInfoPanelComponent', () => {
  let component: AnchorInfoPanelComponent;
  let fixture: ComponentFixture<AnchorInfoPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnchorInfoPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnchorInfoPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
