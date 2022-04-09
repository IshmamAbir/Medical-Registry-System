import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private httpClient: HttpClient) {}

  saveTest(data: any) {
    return this.httpClient.post(`${baseUrl}/test/`, data);
  }

  getAllTest() {
    return this.httpClient.get(`${baseUrl}/test/all-test`);
  }

  getTestInfo(test:any) {
    return this.httpClient.get(`${baseUrl}/test/${test}`);
  }
  
  getPatientTestInfo(patientTestId:any) {
    return this.httpClient.get(`${baseUrl}/test/get-patient-test-info/${patientTestId}`);
  }

  savePatientTest(data: any) {
    return this.httpClient.post(`${baseUrl}/test/patient-test`, data);
  }

  getAllTestDue() {
    return this.httpClient.get(`${baseUrl}/test/get-due-tests`);
  }

  duePayment(patientTestId: number) {
    return this.httpClient.get(`${baseUrl}/test/due-payment/${patientTestId}`);
  }

  paymentByPatient(patientTestId: number) {
    return this.httpClient.get(`${baseUrl}/test/payment-by-patient/${patientTestId}`);
  }

  getAllTestPaid() {
    return this.httpClient.get(`${baseUrl}/test/get-paid-tests`);
  }

  getPatientAllTestDue(username: any) {
    return this.httpClient.get(`${baseUrl}/test/patient-due-test/${username}`);
  }

  informPatientAboutTest(patientTestId:any) {
    return this.httpClient.get(`${baseUrl}/test/inform/${patientTestId}`);
  }

  savePatientBkashDetails(data: { patientId: string; mobile: string; pin: string; }) {
    return this.httpClient.post(`${baseUrl}/bkash/map`, data);
  }

  getPatientBkash(patientId: string) {
    return this.httpClient.get(`${baseUrl}/bkash/get-info/${patientId}`);
  }


}
