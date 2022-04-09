import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { MedicaldataService } from 'src/app/services/medicaldata/medicaldata.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-diabetic',
  templateUrl: './add-diabetic.component.html',
  styleUrls: ['./add-diabetic.component.css'],
})
export class AddDiabeticComponent implements OnInit {
  public minDate = new Date();
  processDate = '';

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
      this.data.reading != '' &&
      this.data.time != '' &&
      this.processDate != ''
    ) {
      if (Number(this.data.reading) > 550) {
        this.snackBar.open('Wrong Reading Input', 'Close', {
          duration: 3000,
        });
      } else {
        this.data.date = new Date(this.processDate).toDateString();
        this.medicalDataService.saveDiabeticMedicalData(this.data).subscribe(
          (response: any) => {
            if (response.message == 'Save') {
              Swal.fire(
                'Data Save Successfully!',
                'For ' + this.data.date,
                'success'
              );
              this.router.navigate(['patient/diabetic-list']);
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
