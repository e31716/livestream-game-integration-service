import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ElementRef } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { ConfigService } from '@core/config/config.service';
import { IsMobileDirective } from './is-mobile.directive';

@Component({
  template: `
    <div>Without Directive</div>
    <div appIsMobile>Default</div>
  `
})
class TestComponent {}

describe('IsMobileDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let elementsWithDirective: Array<DebugElement>;
  let bareElement: DebugElement;
  beforeEach(() => {
    const elementRefStub = () => ({ nativeElement: {} });
    const renderer2Stub = () => ({ addClass: (nativeElement, string) => ({}) });
    const configServiceStub = () => ({ isMobile: {}, isTablet: {} });
    TestBed.configureTestingModule({
      declarations: [IsMobileDirective, TestComponent]
    });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    elementsWithDirective = fixture.debugElement.queryAll(
      By.directive(IsMobileDirective)
    );
    bareElement = fixture.debugElement.query(By.css(':not([appIsMobile])'));
  });
  it('should have bare element', () => {
    expect(bareElement).toBeTruthy();
  });
  it('should have 1 element(s) with directive', () => {
    expect(elementsWithDirective.length).toBe(1);
  });
});
