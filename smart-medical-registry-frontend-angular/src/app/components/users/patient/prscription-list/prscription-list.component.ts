import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from 'src/app/services/image/image.service';
import { LoginService } from 'src/app/services/login/login.service';

interface Document {
  patientId: string;
  description: string;
  type: string;
  imageId: number;
}

@Component({
  selector: 'app-prscription-list',
  templateUrl: './prscription-list.component.html',
  styleUrls: ['./prscription-list.component.css']
})
export class PrscriptionListComponent implements OnInit {
  patientId = '';


  prescriptionList: Document[] = [];

  constructor(
    private activeRoute: ActivatedRoute,
    private imageService: ImageService,
    private loginService:LoginService
  ) {}

  ngOnInit(): void {
    this.patientId = this.loginService.getUserDetails().username;
    this.imageService.getPatientAllDocuments(this.patientId).subscribe(
      (response: any) => {
        this.prescriptionList = response.prescriptionDto;
      },
      (error: any) => {}
    );
  }

  showImage(imageId: any,type:any,description:any) {
    window.open('patient/image-show/' + imageId+'/'+type+'/'+description);
  }

}
