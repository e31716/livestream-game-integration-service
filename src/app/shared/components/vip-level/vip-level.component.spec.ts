import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VipLevelComponent } from './vip-level.component';

describe('VipLevelComponent', () => {
  let component: VipLevelComponent;
  let fixture: ComponentFixture<VipLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VipLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VipLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
