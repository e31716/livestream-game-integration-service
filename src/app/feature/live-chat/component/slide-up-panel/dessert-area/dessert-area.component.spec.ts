import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DessertAreaComponent } from './dessert-area.component';

describe('DessertAreaComponent', () => {
  let component: DessertAreaComponent;
  let fixture: ComponentFixture<DessertAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DessertAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DessertAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
