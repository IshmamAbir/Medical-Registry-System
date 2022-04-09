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
  selector: 'app-diabetic-list',
  templateUrl: './diabetic-list.component.html',
  styleUrls: ['./diabetic-list.component.css'],
})
export class DiabeticListComponent implements OnInit {
  patientId = '';

  diabeticList: Document[] = [];

  constructor(
    private activeRoute: ActivatedRoute,
    private imageService: ImageService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.patientId = this.loginService.getUserDetails().username;
    this.imageService.getPatientAllDocuments(this.patientId).subscribe(
      (response: any) => {
        this.diabeticList = response.diabetesDto;
      },
      (error: any) => {}
    );
  }
}
