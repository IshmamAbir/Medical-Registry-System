import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { TestService } from 'src/app/services/test/test.service';
import Swal from 'sweetalert2';

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
  selector: 'app-test-due-payment',
  templateUrl: './test-due-payment.component.html',
  styleUrls: ['./test-due-payment.component.css'],
})
export class TestDuePaymentComponent implements OnInit {
  username = '';
  bkashMapId = 0;
  mobile = '';
  patientTestList: PatientTest[] = [];

  constructor(
    private testService: TestService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.username = this.loginService.getUserDetails().username;

    this.testService.getPatientBkash(this.username).subscribe(
      (response: any) => {
        this.bkashMapId = response.bkashMapId;
        this.mobile = response.mobile;
        console.log(this.bkashMapId);
        if (this.bkashMapId == 0) {
          Swal.fire({
            title: 'Bkash Mapping',
            text: 'This Account Is Not Mapped With Any Bkash Account',
            imageUrl: '../../../assets/bkash2.png',
            imageAlt: 'Custom image',
          });
        }
      },
      (error: any) => {}
    );

    this.testService.getPatientAllTestDue(this.username).subscribe(
      (response: any) => {
        this.patientTestList = response;
      },
      (error: any) => {}
    );
  }

  duePayment(patientTestId: number, payment: any) {
    this.testService.paymentByPatient(patientTestId).subscribe(
      (response: any) => {
        if (response.message == 'Success') {
          this.testService.getPatientAllTestDue(this.username).subscribe(
            (response: any) => {
              this.patientTestList = response;
            },
            (error: any) => {}
          );

          Swal.fire(
            'Payment Successful',
            payment + ' Tk. Paid Form ' + this.mobile,
            'success'
          );
        } else {
        }
      },
      (error: any) => {}
    );
  }
}
