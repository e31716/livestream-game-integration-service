import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ElementRef } from '@angular/core';
import { ConfigService } from '@core/config/config.service';
import { IphoneVisibleDirective } from './iphone-visible.directive';

@Component({
  template: `
    <div>Without Directive</div>
    <div appIphoneVisible>Default</div>
  `
})
class TestComponent {}

describe('IphoneVisibleDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let elementsWithDirective: Array<DebugElement>;
  let bareElement: DebugElement;
  beforeEach(() => {
    const elementRefStub = () => ({ nativeElement: { remove: () => ({}) } });
    const configServiceStub = () => ({ deviceInfo: { device: {} } });
    TestBed.configureTestingModule({
      declarations: [IphoneVisibleDirective, TestComponent]
    });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    elementsWithDirective = fixture.debugElement.queryAll(
      By.directive(IphoneVisibleDirective)
    );
    bareElement = fixture.debugElement.query(
      By.css(':not([appIphoneVisible])')
    );
  });
  it('should have bare element', () => {
    expect(bareElement).toBeTruthy();
  });
  it('should have 1 element(s) with directive', () => {
    expect(elementsWithDirective.length).toBe(1);
  });
});
