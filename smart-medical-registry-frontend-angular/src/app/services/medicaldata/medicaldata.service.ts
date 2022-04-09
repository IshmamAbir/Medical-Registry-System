import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root'
})
export class MedicaldataService {

  constructor(private httpClient: HttpClient) {}


  saveDiabeticMedicalData( data : any) {
    return this.httpClient.post(`${baseUrl}/file/diabetic`,data);
  }

  saveBloddPressureMedicalData( data : any) {
    return this.httpClient.post(`${baseUrl}/file/blood-pressure`,data);
  }
}
