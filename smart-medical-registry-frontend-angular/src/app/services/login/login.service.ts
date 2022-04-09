import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root',
})

export class LoginService {
  public notify = new Subject<boolean>();

  constructor(private httpClient: HttpClient) {}

  /* -------------------------------------------------------- */

  public getCurrentUserDetails() {
    return this.httpClient.get(`${baseUrl}/user/details`);
  }

  /* -------------------------------------------------------- */

  public generateToken(credentials: any) {
    return this.httpClient.post(`${baseUrl}/token`, credentials);
  }

  /* -------------------------------------------------------- */

  public loginUser(token: any) {
    localStorage.setItem('token', token);
    return true;
  }

  /* -------------------------------------------------------- */

  public isLoggedIn() {
    let token = localStorage.getItem('token');

    if (token == undefined || token === '' || token == null) {
      return false;
    } else {
      return true;
    }
  }

  /* -------------------------------------------------------- */

  public getToken() {
    return localStorage.getItem('token');
  }

  /* -------------------------------------------------------- */

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  /* -------------------------------------------------------- */

  public setUserDetails(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  /* -------------------------------------------------------- */

  public getUserDetails() {
    let user = localStorage.getItem('user');
    if (user != null) {
      return JSON.parse(user);
    } else {
      this.logout();
      return null;
    }
  }

  /* -------------------------------------------------------- */

  public getUserRole() {
    let user = this.getUserDetails();
    return user.roleList[0];
  }

  /* -------------------------------------------------------- */
}
