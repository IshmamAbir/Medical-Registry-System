import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from 'src/app/services/image/image.service';
import { LoginService } from 'src/app/services/login/login.service';

interface Document {
  patientId: string;
  reading: string;
  type: string;
  date: string;
  time: string;
}

@Component({
  selector: 'app-blood-pressure-list',
  templateUrl: './blood-pressure-list.component.html',
  styleUrls: ['./blood-pressure-list.component.css'],
})
export class BloodPressureListComponent implements OnInit {
  patientId = '';

  bpList: Document[] = [];

  constructor(
    private activeRoute: ActivatedRoute,
    private imageService: ImageService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.patientId = this.loginService.getUserDetails().username;
    this.imageService.getPatientAllDocuments(this.patientId).subscribe(
      (response: any) => {
        this.bpList = response.bpDto;
      },
      (error: any) => {}
    );
  }
}
