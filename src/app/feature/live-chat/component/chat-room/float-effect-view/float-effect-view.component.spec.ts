import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatEffectViewComponent } from './float-effect-view.component';

describe('FloatEffectViewComponent', () => {
  let component: FloatEffectViewComponent;
  let fixture: ComponentFixture<FloatEffectViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloatEffectViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatEffectViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
