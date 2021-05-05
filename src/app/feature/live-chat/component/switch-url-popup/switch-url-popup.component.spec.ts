import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchUrlPopupComponent } from './switch-url-popup.component';

describe('SwitchUrlPopupMComponent', () => {
  let component: SwitchUrlPopupComponent;
  let fixture: ComponentFixture<SwitchUrlPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SwitchUrlPopupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchUrlPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
