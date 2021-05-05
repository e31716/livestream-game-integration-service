import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForceRotateComponent } from './force-rotate.component';

describe('ForceRotateComponent', () => {
  let component: ForceRotateComponent;
  let fixture: ComponentFixture<ForceRotateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForceRotateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForceRotateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
