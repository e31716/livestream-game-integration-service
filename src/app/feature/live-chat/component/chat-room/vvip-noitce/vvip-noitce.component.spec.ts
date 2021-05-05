import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VvipNoitceComponent } from './vvip-noitce.component';

describe('VvipNoitceComponent', () => {
  let component: VvipNoitceComponent;
  let fixture: ComponentFixture<VvipNoitceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VvipNoitceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VvipNoitceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
