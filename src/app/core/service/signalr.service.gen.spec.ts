import { TestBed } from '@angular/core/testing';
import { ConfigService } from '@core/config/config.service';
import { SignalrService } from './signalr.service';
describe('SignalrService', () => {
  let service: SignalrService;
  beforeEach(() => {
    const configServiceStub = () => ({
      API_URL_Origin: {},
      fishLiveGameInfo: { Token: {} }
    });
    TestBed.configureTestingModule({
      providers: [
        SignalrService,
        { provide: ConfigService, useFactory: configServiceStub }
      ]
    });
    service = TestBed.get(SignalrService);
  });
  describe('邏輯檢查', (() => {
    xit('Signalr的檢查', (() => {
      //  尚不會寫
    }));
  }));
});
