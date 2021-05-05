import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeUserMsgBoxComponent } from './poke-user-msg-box.component';

describe('PokeUserMsgBoxComponent', () => {
  let component: PokeUserMsgBoxComponent;
  let fixture: ComponentFixture<PokeUserMsgBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokeUserMsgBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeUserMsgBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
