import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TestService } from 'src/app/services/test/test.service';
import Swal from 'sweetalert2';

interface Test {
  testId: number;
  testName: string;
  cost: number;
  testDay: string;
  time: string;
  prerequisite: string;
}

@Component({
  selector: 'app-patient-tests',
  templateUrl: './patient-tests.component.html',
  styleUrls: ['./patient-tests.component.css'],
})
export class PatientTestsComponent implements OnInit {
  public minDate = new Date();
  public ProcessDate: any;

  selectedTest = 0;
  testList: Test[] = [];

  data = {
    patientName: '',
    patientId: '',
    email: '',
    testDtoList: {},
    totalCost: 0,
    pay: 0,
    deliveryDate: '',
  };

  test = {
    testId: 0,
    testName: '',
    cost: 0,
    testDay: '',
    time: '',
    prerequisite: '',
  };
  showTestList: Test[] = [];
  selectedTestList: Test[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private testService: TestService
  ) {}

  ngOnInit(): void {
    this.testService.getAllTest().subscribe(
      (response: any) => {
        this.testList = response;
      },
      (error: any) => {}
    );
  }

  getTestInfo() {
    this.testService.getTestInfo(this.selectedTest).subscribe(
      (response: any) => {
        this.test = response;
      },
      (error: any) => {
        alert(error);
      }
    );
  }
  add() {
    if (this.getTestByFind()) {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Test Already Add In The List',
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      this.selectedTestList.push(this.test);
      this.showTestList = this.selectedTestList;
      this.data.totalCost += this.test.cost;
    }
  }
  getTestByFind() {
    return this.selectedTestList.find((x) => x.testId === this.test.testId);
  }

  userDataSubmit() {
    console.log(this.data);
    if (
      this.data.patientName != '' &&
      this.data.patientId != '' &&
      this.data.email != '' &&
      this.data.pay != 0 &&
      this.ProcessDate != '' &&
      this.showTestList.length != 0
    ) {
      this.data.deliveryDate = new Date(this.ProcessDate).toDateString();
      this.data.testDtoList = this.showTestList;
      this.testService.savePatientTest(this.data).subscribe(
        (response: any) => {
          if (response.message == 'Save') {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Successfully Save',
              showConfirmButton: false,
            });
            window.setTimeout(function () {
              location.reload();
            }, 2000);
          } else {
            this.snackBar.open(
              'Fail Operation !  !  !  !' + response.message,
              'Close',
              {
                duration: 3000,
              }
            );
          }
        },
        (error: any) => {
          console.log(error);
          this.snackBar.open('Fail Operation !  !  !  !', 'Close', {
            duration: 3000,
          });
        }
      );
    } else {
      this.snackBar.open('Fill all the Fields Properly ! ! ! !', 'Close', {
        duration: 3000,
      });
    }
  }
}
