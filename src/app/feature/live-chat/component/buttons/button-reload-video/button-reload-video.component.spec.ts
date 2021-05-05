import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonReloadVideoComponent } from './button-reload-video.component';

describe('ButtonReloadVideoComponent', () => {
  let component: ButtonReloadVideoComponent;
  let fixture: ComponentFixture<ButtonReloadVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonReloadVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonReloadVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
