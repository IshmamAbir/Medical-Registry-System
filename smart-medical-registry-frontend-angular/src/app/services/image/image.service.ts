import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient: HttpClient) {}

  uploadImage( imageFile : any) {
    return this.httpClient.post(`${baseUrl}/file/image/`, imageFile,{ observe: 'response' });
  }

  saveImageDetails( data : any) {
    return this.httpClient.post(`${baseUrl}/file/image/details`,data);
  }

  getImage(imageId:any){
    return this.httpClient.get(`${baseUrl}/file/get-image/${imageId}`);
  }

  getPatientAllDocuments(patientId:any){
    return this.httpClient.get(`${baseUrl}/file/patient-all-docs/${patientId}`);
  }

}
