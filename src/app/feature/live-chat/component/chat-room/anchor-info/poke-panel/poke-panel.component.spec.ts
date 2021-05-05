import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokePanelComponent } from './poke-panel.component';

describe('PokePanelComponent', () => {
  let component: PokePanelComponent;
  let fixture: ComponentFixture<PokePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
