import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponNoticeComponent } from './weapon-notice.component';

describe('WeaponNoticeComponent', () => {
  let component: WeaponNoticeComponent;
  let fixture: ComponentFixture<WeaponNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeaponNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeaponNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
