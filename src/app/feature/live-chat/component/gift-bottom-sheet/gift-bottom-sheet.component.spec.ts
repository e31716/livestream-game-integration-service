import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftBottomSheetComponent } from './gift-bottom-sheet.component';

describe('GiftBottomSheetComponent', () => {
  let component: GiftBottomSheetComponent;
  let fixture: ComponentFixture<GiftBottomSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftBottomSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
