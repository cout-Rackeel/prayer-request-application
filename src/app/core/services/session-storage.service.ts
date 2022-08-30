import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})


export class SessionStorageService {

  USER_KEY = 'auth-user';

  constructor() { }

  logOut(): boolean {
    window.sessionStorage.clear();
    return this.isLoggedIn();
  }

  public saveUser(user: Partial<User>): void {
    window.sessionStorage.removeItem(this.USER_KEY);
    window.sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  public getUser(): Partial<User> {
    const user = window.sessionStorage.getItem(this.USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return new User();
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(this.USER_KEY);
    if (user) {
      return true;
    }
    return false;
  }

}

