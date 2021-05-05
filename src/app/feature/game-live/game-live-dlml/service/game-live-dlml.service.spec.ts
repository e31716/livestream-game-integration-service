import { TestBed } from '@angular/core/testing';

import { GameLiveDlmlService } from './game-live-dlml.service';

describe('GameLiveDlmlService', () => {
  let service: GameLiveDlmlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameLiveDlmlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
