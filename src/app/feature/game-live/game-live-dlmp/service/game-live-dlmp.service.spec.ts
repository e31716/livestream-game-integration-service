import { TestBed } from '@angular/core/testing';

import { GameLiveDlmpService } from './game-live-dlmp.service';

describe('GameLiveDlmpService', () => {
  let service: GameLiveDlmpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameLiveDlmpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
