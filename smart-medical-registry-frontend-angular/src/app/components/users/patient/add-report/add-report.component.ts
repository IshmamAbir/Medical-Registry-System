import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ImageService } from 'src/app/services/image/image.service';
import { LoginService } from 'src/app/services/login/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.css'],
})
export class AddReportComponent implements OnInit {
  imageFile: any;

  report = {
    patientId: '',
    description: '',
    type: 'Report',
    imageId: 0,
  };

  constructor(
    private imageService: ImageService,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.report.patientId = this.loginService.getUserDetails().username;
  }

  userDataSubmit() {
    if (
      this.report.patientId != '' &&
      this.report.description != '' &&
      this.imageFile != null
    ) {
      const uploadImageData = new FormData();
      uploadImageData.append('imageFile', this.imageFile, this.imageFile.name);

      this.imageService.uploadImage(uploadImageData).subscribe(
        (response: any) => {
          if (response.body.message == 'Successfully Save') {
            this.report.imageId = response.body.id;
            this.imageService.saveImageDetails(this.report).subscribe(
              (response2: any) => {
                if (response2.message == 'Save') {
                  this.router.navigate(['/patient/report-list']);
                  Swal.fire(
                    this.report.type + ' Save Successfully!',
                    'Now Check Your List ' + this.report.patientId,
                    'success'
                  );
                } else {
                  this.snackBar.open(
                    'Operation Not Success!  !  !  !',
                    'Close',
                    {
                      duration: 3000,
                    }
                  );
                }
              },
              (error: any) => {
                this.snackBar.open('Operation Fail!  !  !  !', 'Close', {
                  duration: 3000,
                });
              }
            );
          } else {
            this.snackBar.open(
              'Fail Operation After Saving Photo!  !  !  !',
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
  /* --------------------------------------------------------------------------- */
  onFileChanged(event: any) {
    this.imageFile = event.target.files[0];
  }
}
