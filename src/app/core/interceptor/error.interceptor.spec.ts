import { TestBed } from '@angular/core/testing';

import { ErrorInterceptor } from './error.nterceptor';

describe('ErrorInterceptor', () => {
  let service: ErrorInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
