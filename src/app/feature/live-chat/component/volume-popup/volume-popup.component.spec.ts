import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumePopupComponent } from './volume-popup.component';

describe('VolumePopupComponent', () => {
  let component: VolumePopupComponent;
  let fixture: ComponentFixture<VolumePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolumePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
