import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { MedicaldataService } from 'src/app/services/medicaldata/medicaldata.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-blood-pressure',
  templateUrl: './add-blood-pressure.component.html',
  styleUrls: ['./add-blood-pressure.component.css'],
})
export class AddBloodPressureComponent implements OnInit {
  public minDate = new Date();
  processDate = '';

  sbp = '';
  dbp = '';

  data = {
    patientId: '',
    reading: '',
    date: '',
    time: '',
  };

  constructor(
    private loginService: LoginService,
    private medicalDataService: MedicaldataService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.data.patientId = this.loginService.getUserDetails().username;
  }

  userDataSubmit() {
    if (
      this.data.patientId != '' &&
      this.sbp != '' &&
      this.dbp != '' &&
      this.data.time != '' &&
      this.processDate != ''
    ) {
      if (Number(this.sbp) < 90 || Number(this.sbp) > 220) {
        this.snackBar.open('Wrong Reading Input in SBP', 'Close', {
          duration: 3000,
        });
      } else if (Number(this.dbp) < 30 || Number(this.dbp) > 110) {
        this.snackBar.open('Wrong Reading Input in DBP', 'Close', {
          duration: 3000,
        });
      } else {
        this.data.reading = this.sbp + '/' + this.dbp + ' mmHg';
        this.data.date = new Date(this.processDate).toDateString();

        this.medicalDataService.saveBloddPressureMedicalData(this.data).subscribe(
          (response: any) => {
            if (response.message == 'Save') {
              Swal.fire(
                'Data Save Successfully!',
                'For ' + this.data.date,
                'success'
              );
              this.router.navigate(['patient/blood-pressure-list']);
            } else {
              this.snackBar.open('Fail Operation !  !  !  !', 'Close', {
                duration: 3000,
              });
            }
          },
          (error: any) => {
            console.log(error);
            this.snackBar.open('Fail Operation !  !  !  !', 'Close', {
              duration: 3000,
            });
          }
        );
      }
    } else {
      this.snackBar.open('Fill all the Fields Properly ! ! ! !', 'Close', {
        duration: 3000,
      });
    }
  }
}
