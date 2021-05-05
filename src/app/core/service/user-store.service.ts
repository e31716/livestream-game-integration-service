import { Injectable } from '@angular/core';

@Injectable()
export class UserStoreService {

  private authToken: string = null;
  constructor() { }

  set token(token: string) {
    this.authToken = token;
  }

  get token() {
    return this.authToken;
  }

  isLoggedIn() {
    return this.authToken != null;
  }

  set account(account: string) {
    localStorage.setItem('account', account);
    this.account = account;
  }

  get account() {
    return this.account;
  }
}
