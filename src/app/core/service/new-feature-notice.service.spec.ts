import { TestBed } from '@angular/core/testing';

import { NewFeatureNoticeService } from './new-feature-notice.service';

describe('NewFeatureNoticeService', () => {
  let service: NewFeatureNoticeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewFeatureNoticeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
