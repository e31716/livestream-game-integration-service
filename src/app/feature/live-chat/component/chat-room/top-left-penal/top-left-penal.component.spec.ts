import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopLeftPenalComponent } from './top-left-penal.component';

describe('TopLeftPenalComponent', () => {
  let component: TopLeftPenalComponent;
  let fixture: ComponentFixture<TopLeftPenalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopLeftPenalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopLeftPenalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
