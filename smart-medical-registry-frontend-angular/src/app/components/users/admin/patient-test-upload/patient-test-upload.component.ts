import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestService } from 'src/app/services/test/test.service';
interface PatientTest {
  patientTestId: number;
  patientName: string;
  patientId: string;
  email: string;
  testDtoList: {};
  totalCost: number;
  pay: number;
  deliveryDate: string;
}

@Component({
  selector: 'app-patient-test-upload',
  templateUrl: './patient-test-upload.component.html',
  styleUrls: ['./patient-test-upload.component.css'],
})
export class PatientTestUploadComponent implements OnInit {
  patientTestList: PatientTest[] = [];

  constructor(private testService: TestService) {}

  ngOnInit(): void {
    this.testService.getAllTestPaid().subscribe(
      (response: any) => {
        this.patientTestList = response;
      },
      (error: any) => {}
    );
  }

  sendMail(patientTestId: any) {
    this.testService.informPatientAboutTest(patientTestId).subscribe(
      (response: any) => {
        if (response.message == 'Send') {
          this.testService.getAllTestPaid().subscribe(
            (response: any) => {
              this.patientTestList = response;
            },
            (error: any) => {}
          );
        } else {
        }
      },
      (error: any) => {}
    );
  }
}
