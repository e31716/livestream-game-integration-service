import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MegaphonePopupComponent } from './megaphone-popup.component';

describe('MegaphonePopupComponent', () => {
  let component: MegaphonePopupComponent;
  let fixture: ComponentFixture<MegaphonePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MegaphonePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MegaphonePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
