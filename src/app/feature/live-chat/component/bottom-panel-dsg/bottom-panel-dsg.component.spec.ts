import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomPanelDsgComponent } from './bottom-panel-dsg.component';

describe('BottomPanelComponent', () => {
  let component: BottomPanelDsgComponent;
  let fixture: ComponentFixture<BottomPanelDsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BottomPanelDsgComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomPanelDsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
