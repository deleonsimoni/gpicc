import { Component } from '@angular/core';
import { ImagePathComplement } from '@app/shared/pipes/image-path-complement.pipe';
import { GaleriaService } from '@app/shared/services/galeria/galeria.service';

import { mergeMap, map, switchMap } from "rxjs/operators";

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss']
})
export class GaleriaComponent {

  public gallery: any[] = [];
  private galleryToSend: any = [];
  public theresNewPhoto = false;

  constructor(
    public galeriaService: GaleriaService,
    private pipeImage: ImagePathComplement
  ) {}

  ngOnInit() {
    this.listAllImages()
      .subscribe();
  }

  private listAllImages() {
    this.gallery = [
      { base64: null }
    ];
    this.theresNewPhoto = false;

    return this.galeriaService.retrieveImages()
      .pipe(
        mergeMap(gallery => gallery),
        map((gallery: any) => {
          this.gallery.push({
            id: gallery._id,
            base64: this.pipeImage.transform(gallery.imagePathS3)
          });
        })
      );
  }

  public setGalleryImage(event: any, index: number) {
    const that = this;
    const FR = new FileReader();
    const files = event.target.files;

    FR.addEventListener("load", function (e) {
      that.theresNewPhoto = true;

      if (index == 0) {
        that.gallery.push({ base64: e.target.result });
        that.galleryToSend.push(files[0]);
      } else {
        that.gallery[index]["base64"] = e.target.result;
        that.galleryToSend[index] = files[0];
      }
    });

    if (files.length > 0) {
      FR.readAsDataURL(files[0]);
    }
  }

  public deleteImage(image: any) {
    this.galeriaService.deleteImage(image.id)
      .pipe(
        switchMap(_ => this.listAllImages()),
        map(_ => this.galleryToSend = [])
      )
      .subscribe();
  }

  public saveImages() {
    this.theresNewPhoto = false;
    this.galeriaService.registerImages(this.galleryToSend)
      .subscribe();
  }

  public unselectedImage() {
    this.gallery.splice(this.gallery.length - this.galleryToSend.length, this.galleryToSend.length);
    this.galleryToSend = [];
    this.theresNewPhoto = false;
  }

  canSelect(event: any, index: number): void {
    if (index > 0) {
      event.preventDefault();
    }
  }
}
