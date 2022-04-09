import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root'
})
export class SerialService {


  constructor(private httpClient: HttpClient) {}

  serial(data: any) {
    return this.httpClient.post(`${baseUrl}/serial/`, data);
  }

  getAllSerialForCompounder(username: string, date: string) {
    return this.httpClient.get(`${baseUrl}/serial/all-serial/${username}/${date}`);
  }
  
  getAllSerialForDoctor(username: string, date: string) {
    return this.httpClient.get(`${baseUrl}/serial/all-serial-doctor/${username}/${date}`);
  }
  
}
