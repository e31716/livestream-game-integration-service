import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VipRankComponent } from './vip-rank.component';

describe('VipRankComponent', () => {
  let component: VipRankComponent;
  let fixture: ComponentFixture<VipRankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VipRankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VipRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
