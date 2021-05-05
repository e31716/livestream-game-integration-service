import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftComboViewComponent } from './gift-combo-view.component';

describe('GiftComboViewComponent', () => {
  let component: GiftComboViewComponent;
  let fixture: ComponentFixture<GiftComboViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftComboViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftComboViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
