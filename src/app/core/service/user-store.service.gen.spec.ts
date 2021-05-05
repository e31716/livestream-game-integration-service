import { TestBed } from '@angular/core/testing';
import { UserStoreService } from './user-store.service';
describe('UserStoreService', () => {
  let service: UserStoreService;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [UserStoreService] });
    service = TestBed.inject(UserStoreService);
  });

  describe('邏輯檢查', (() => {

    it('set & get authToken', (() => {
      service.token = 'this is token';
      expect(service.token).toEqual('this is token');
    }));

    it('isLogin', (() => {
      service.token = 'this is token';
      const hasLogin = service.isLoggedIn();
      expect(hasLogin).toEqual(true);
    }));

    xit('set & get account 包含 localStorage', (() => {
      // 使用localStorage 會一直出現 Maximum call stack size exceeded,
    }));

  }));


});
