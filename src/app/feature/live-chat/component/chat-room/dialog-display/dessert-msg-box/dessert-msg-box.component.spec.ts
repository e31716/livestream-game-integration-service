import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DessertMsgBoxComponent } from './dessert-msg-box.component';

describe('DessertMsgBoxComponent', () => {
  let component: DessertMsgBoxComponent;
  let fixture: ComponentFixture<DessertMsgBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DessertMsgBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DessertMsgBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
