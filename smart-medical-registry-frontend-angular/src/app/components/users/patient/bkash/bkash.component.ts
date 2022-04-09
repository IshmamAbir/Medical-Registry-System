import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login/login.service';
import { TestService } from 'src/app/services/test/test.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bkash',
  templateUrl: './bkash.component.html',
  styleUrls: ['./bkash.component.css'],
})
export class BkashComponent implements OnInit {
  data = {
    patientId: '',
    mobile: '',
    pin: '',
  };

  bkashMapId = 0;
  constructor(
    private testService: TestService,
    private loginService: LoginService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.data.patientId = this.loginService.getUserDetails().username;

    this.testService.getPatientBkash(this.data.patientId).subscribe(
      (response: any) => {
        this.data.mobile = response.mobile;
        this.bkashMapId = response.bkashMapId;
        if (this.bkashMapId != 0) {
          Swal.fire({
            title: 'Bkash Mapping',
            text: 'This Account Is Already Mapped With ' + response.mobile,
            imageUrl: '../../../assets/bkash2.png',
            imageAlt: 'Custom image',
          });
        } 
      },
      (error: any) => {}
    );
  }

  userDataSubmit() {
    if (this.data.mobile != '' && this.data.pin != '') {
      this.testService.savePatientBkashDetails(this.data).subscribe(
        (response: any) => {
          Swal.fire({
            title: 'Bkash Mapping',
            text: response.message,
            imageUrl: '../../../assets/bkash2.png',
            imageAlt: 'Custom image',
          });

          this.testService.getPatientBkash(this.data.patientId).subscribe(
            (response: any) => {
              this.data.mobile = response.mobile;
              this.bkashMapId = response.bkashMapId;
            },
            (error: any) => {}
          );
        },
        (error: any) => {
          alert(error);
        }
      );
    } else {
      this.snackBar.open('Fill all the Fields Properly ! ! ! !', 'Close', {
        duration: 3000,
      });
    }
  }
}
