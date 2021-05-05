import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MegaphoneBottomSheetComponent } from './megaphone-bottom-sheet.component';

describe('MegaphoneBottomSheetComponent', () => {
  let component: MegaphoneBottomSheetComponent;
  let fixture: ComponentFixture<MegaphoneBottomSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MegaphoneBottomSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MegaphoneBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
