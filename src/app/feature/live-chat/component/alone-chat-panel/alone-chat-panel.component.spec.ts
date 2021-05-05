import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AloneChatPanelComponent } from './alone-chat-panel.component';

describe('AloneChatPanelComponent', () => {
  let component: AloneChatPanelComponent;
  let fixture: ComponentFixture<AloneChatPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AloneChatPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AloneChatPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
