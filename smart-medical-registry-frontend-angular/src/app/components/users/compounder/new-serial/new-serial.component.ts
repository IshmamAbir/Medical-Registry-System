import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { SerialService } from 'src/app/services/serial/serial.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-serial',
  templateUrl: './new-serial.component.html',
  styleUrls: ['./new-serial.component.css'],
})
export class NewSerialComponent implements OnInit {
  public minDate = new Date();
  public ProcessDate: any;
  genderlist: string[] = ['Male', 'Female', 'Other'];
  data = {
    compounder: '',
    patientName: '',
    mobile: '',
    age: '',
    gender: '',
    id: '',
    date: '',
  };
  constructor(
    private snackBar: MatSnackBar,
    private loginService: LoginService,
    private serialService: SerialService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.data.compounder = this.loginService.getUserDetails().username;
  }

  serialDataSubmit() {
    if (
      this.data.patientName != '' &&
      this.data.age != '' &&
      this.data.gender != '' &&
      this.data.mobile != '' &&
      this.data.id != '' &&
      this.ProcessDate != ''
    ) {
      /* --Convert Date in Correct Format-- */
      this.data.date = new Date(this.ProcessDate).toDateString();
      this.serialService.serial(this.data).subscribe(
        (response: any) => {
          if (response.message == 'Patient Id Not Found') {
            this.snackBar.open('Patient Id Does not Exist ! ! ! !', 'Close', {
              duration: 3000,
            });
          } else {
            Swal.fire(
              'Patient Serial Save Successfully!',
              'For ' + this.data.date,
              'success'
            );
            this.router.navigate(['compounder/all-serial']);
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
