import { Component, OnInit } from '@angular/core';
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
  selector: 'app-patient-test-due',
  templateUrl: './patient-test-due.component.html',
  styleUrls: ['./patient-test-due.component.css'],
})
export class PatientTestDueComponent implements OnInit {
  patientTestList: PatientTest[] = [];

  constructor(private testService: TestService) {}

  ngOnInit(): void {
    this.testService.getAllTestDue().subscribe(
      (response: any) => {
        this.patientTestList = response;
      },
      (error: any) => {}
    );
  }

  duePayment(patientTestId:number) {
    this.testService.duePayment(patientTestId).subscribe(
      (response:any)=>{
        if (response.message=="Success") {
          window.location.reload();
        } else {
          
        }
      },
      (error:any)=>{},
    )
  }
}
