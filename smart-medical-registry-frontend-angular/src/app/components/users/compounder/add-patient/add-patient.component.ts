import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/services/registration/registration.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {
  public data = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    mobile: '',
    userType: 'Patient',
  };

  constructor(
    private snackBar: MatSnackBar,
    private registrationService: RegistrationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  /* -------------------------------------------------------------------------------------------- */
  userDataSubmit() {
    if (
      this.data.username != '' &&
      this.data.password != '' &&
      this.data.firstName != '' &&
      this.data.lastName != '' &&
      this.data.mobile != '' &&
      this.data.userType != '' &&
      this.data.username != null &&
      this.data.password != null &&
      this.data.firstName != null &&
      this.data.lastName != null &&
      this.data.mobile != null &&
      this.data.userType != null
    ) {
      this.registrationService.registration(this.data).subscribe(
        (response: any) => {
          if (response.message == 'Username Already Used') {
            this.snackBar.open('Username Already Used', 'Close', {
              duration: 3000,
            });
          } else {
            Swal.fire('Patient Save Successfully!', 'ID: #'+this.data.username, 'success');
            
            (this.data.username = ''),
              (this.data.password = ''),
              (this.data.firstName = ''),
              (this.data.lastName = ''),
              (this.data.mobile = ''),
              (this.data.userType = 'Patient');
          }
        },
        (error) => {
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
  /* -------------------------------------------------------------------------------------------- */
}
