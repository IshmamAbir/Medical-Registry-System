import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private httpClient: HttpClient) {}

  registration(data: any) {
    return this.httpClient.post(`${baseUrl}/registration/`, data);
  }

  mapping(user: { docUsername: string; comUsername: string }) {
    return this.httpClient.post(`${baseUrl}/registration/map`, user);
  }

  getDetails(username: string) {
    return this.httpClient.post(`${baseUrl}/registration/getDetails`, username);
  }
}
