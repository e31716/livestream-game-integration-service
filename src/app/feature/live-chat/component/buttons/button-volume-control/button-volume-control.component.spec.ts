import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonVolumeControlComponent } from './button-volume-control.component';

describe('ButtonVolumeControlComponent', () => {
  let component: ButtonVolumeControlComponent;
  let fixture: ComponentFixture<ButtonVolumeControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonVolumeControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonVolumeControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
