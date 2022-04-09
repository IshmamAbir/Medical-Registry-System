import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from 'src/app/services/image/image.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-test-report-upload',
  templateUrl: './test-report-upload.component.html',
  styleUrls: ['./test-report-upload.component.css'],
})
export class TestReportUploadComponent implements OnInit {
  imageFile: any;

  report = {
    patientId: '',
    description: '',
    type: 'Report',
    imageId: 0,
  };
  constructor(
    private activeRoute: ActivatedRoute,
    private imageService: ImageService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.report.patientId = this.activeRoute.snapshot.params.patientId;
    this.report.description = this.activeRoute.snapshot.params.testName;
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
                  Swal.fire(
                    this.report.description +
                      ' ' +
                      this.report.type +
                      ' Save Successfully!',
                    'For ID #' + this.report.patientId,
                    'success'
                  );
                  window.setTimeout(function () {
                    window.close();
                  }, 2000);
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
