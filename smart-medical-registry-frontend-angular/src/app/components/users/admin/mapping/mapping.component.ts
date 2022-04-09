import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegistrationService } from 'src/app/services/registration/registration.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.css'],
})
export class MappingComponent implements OnInit {
  public user = {
    docUsername: '',
    comUsername: '',
  };

  doctorDetails = {
    name: '',
    mobile: '',
  };
  compounderDetails = {
    name: '',
    mobile: '',
  };

  constructor(
    private snackBar: MatSnackBar,
    private registrationService: RegistrationService
  ) {}

  ngOnInit(): void {}

  doctorUsernameSubmit() {
    this.doctorDetails = {
      name: '',
      mobile: '',
    };
    if (this.user.docUsername != '' && this.user.docUsername != null) {
      this.registrationService.getDetails(this.user.docUsername).subscribe(
        (response: any) => {
          this.doctorDetails.name = response.name;
          this.doctorDetails.mobile = response.mobile;
        },
        (error: any) => {
          this.snackBar.open('Username Not Found ! ! !', 'Close', {
            duration: 3000,
          });
        }
      );
    } else {
      this.snackBar.open('Username Required ! ! !', 'Close', {
        duration: 3000,
      });
    }
  }

  compounderUsernameSubmit() {
    this.compounderDetails = {
      name: '',
      mobile: '',
    };
    if (this.user.comUsername != '' && this.user.comUsername != null) {
      this.registrationService.getDetails(this.user.comUsername).subscribe(
        (response: any) => {
          this.compounderDetails.name = response.name;
          this.compounderDetails.mobile = response.mobile;
        },
        (error: any) => {
          this.snackBar.open('Username Not Found ! ! !', 'Close', {
            duration: 3000,
          });
        }
      );
    } else {
      this.snackBar.open('Username Required ! ! !', 'Close', {
        duration: 3000,
      });
    }
  }

  mapping() {
    if (this.user.docUsername != '' && this.user.comUsername != '') {
      this.registrationService.mapping(this.user).subscribe(
        (response: any) => {
          if (response.message != 'Mapped Successfully') {
            Swal.fire('Mapped Not Successful ! ! ! !', response.message, 'error');
          }else{
            Swal.fire('Mapped Successfully ! ! ! !', 'Success', 'success');
          }
        },
        (error: any) => {
          this.snackBar.open('Unsuccessful ! ! !', 'Close', {
            duration: 3000,
          });
        }
      );
    } else {
      this.snackBar.open('Doctor and Compounder Both Required ! ! !', 'Close', {
        duration: 3000,
      });
    }
  }
}
