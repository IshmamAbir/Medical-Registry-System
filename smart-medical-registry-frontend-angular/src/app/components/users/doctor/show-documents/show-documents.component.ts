import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from 'src/app/services/image/image.service';

@Component({
  selector: 'app-show-documents',
  templateUrl: './show-documents.component.html',
  styleUrls: ['./show-documents.component.css'],
})
export class ShowDocumentsComponent implements OnInit {
  public imageId: any;
  public type: any;
  public description: any;

  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;

  constructor(
    private activeRoute: ActivatedRoute,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.imageId = this.activeRoute.snapshot.params.imageId;
    this.type = this.activeRoute.snapshot.params.type;
    this.description = this.activeRoute.snapshot.params.description;

    console.log(this.imageId);
    this.imageService.getImage(this.imageId).subscribe(
      (response: any) => {
        console.log(response);
        this.retrieveResonse = response;
        this.base64Data = this.retrieveResonse.imageByte;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      },
      (error: any) => {}
    );
  }

  closeImage() {
    window.close();
  }
}
