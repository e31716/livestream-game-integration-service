import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftPanelComponent } from './gift-panel.component';

describe('GiftPanelComponent', () => {
  let component: GiftPanelComponent;
  let fixture: ComponentFixture<GiftPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
