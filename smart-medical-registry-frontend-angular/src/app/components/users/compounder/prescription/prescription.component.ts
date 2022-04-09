import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageService } from 'src/app/services/image/image.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit {
  imageFile: any;

  prescription = {
    patientId: '',
    description: '',
    type: 'Prescription',
    imageId: 0,
  };

  constructor(
    private imageService: ImageService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
  }

  userDataSubmit() {
    if (
      this.prescription.patientId != '' &&
      this.prescription.description != '' &&
      this.imageFile != null
    ) {
      const uploadImageData = new FormData();
      uploadImageData.append('imageFile', this.imageFile, this.imageFile.name);

      this.imageService.uploadImage(uploadImageData).subscribe(
        (response: any) => {
          if (response.body.message == 'Successfully Save') {
            this.prescription.imageId = response.body.id;
            this.imageService.saveImageDetails(this.prescription).subscribe(
              (response2: any) => {
                if (response2.message == 'Save') {
                  Swal.fire(
                    this.prescription.type + ' Save Successfully!',
                    'For ID #'+this.prescription.patientId,
                    'success'
                  );
                } else {
                  this.snackBar.open('Operation Not Success!  !  !  !', 'Close', {
                    duration: 3000,
                  });
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
