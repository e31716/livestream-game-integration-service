import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftPanelMComponent } from './gift-panel-m.component';

describe('GiftPanelComponent', () => {
  let component: GiftPanelMComponent;
  let fixture: ComponentFixture<GiftPanelMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GiftPanelMComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftPanelMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
