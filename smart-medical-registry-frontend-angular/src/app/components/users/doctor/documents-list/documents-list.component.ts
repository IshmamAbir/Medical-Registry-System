import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from 'src/app/services/image/image.service';

interface Document {
  patientId: string;
  description: string;
  type: string;
  imageId: number;
}

interface Records {
  patientId: string;
  reading: string;
  type: string;
  date: string;
  time: string;
}

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css'],
})
export class DocumentsListComponent implements OnInit {
  patientId = '';

  allDocuments: Document[] = [];
  reportList: Document[] = [];
  prescriptionList: Document[] = [];
  diabeticList: Records[] = [];
  bpList: Records[] = [];

  constructor(
    private activeRoute: ActivatedRoute,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.patientId = this.activeRoute.snapshot.params.patientId;
    this.imageService.getPatientAllDocuments(this.patientId).subscribe(
      (response: any) => {
        this.prescriptionList = response.prescriptionDto;
        this.reportList = response.reportDto;
        this.diabeticList = response.diabetesDto;
        this.bpList = response.bpDto;
      },
      (error: any) => {}
    );
  }

  showImage(imageId: any,type:any,description:any) {
    window.open('doctor/show/' + imageId+'/'+type+'/'+description);
  }
}
