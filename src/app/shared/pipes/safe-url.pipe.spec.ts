import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeUrlPipe } from './safe-url.pipe';
describe('SafeUrlPipe', () => {
  let pipe: SafeUrlPipe;
  beforeEach(() => {
    const domSanitizerStub = () => ({
      bypassSecurityTrustResourceUrl: url => ({})
    });
    TestBed.configureTestingModule({
      providers: [
        SafeUrlPipe,
        { provide: DomSanitizer, useFactory: domSanitizerStub }
      ]
    });
    pipe = TestBed.get(SafeUrlPipe);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
