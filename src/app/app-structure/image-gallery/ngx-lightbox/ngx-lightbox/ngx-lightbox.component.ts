import { Component } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { LightboxConfig } from 'ngx-lightbox';

@Component({
  selector: 'app-ngx-lightbox',
  templateUrl: './ngx-lightbox.component.html',
  styleUrls: ['./ngx-lightbox.component.css']
})
export class NgxLightboxComponent {

  i: number = 0;
  selectedImageDetails: any;
  selectedImageIndex: number = 0;
  fileExtension: any;
  fileName: any;
  filePath: any;

  albums: any = [];
  private _images = [
  
    { src: "assets/gallery/1.jpg", caption: "Hi, I'm Yingi, welcome to my photo album." },
    { src: "assets/gallery/2.jpg", caption: "I am an Angular +2 Front-End Developer." },
    { src: "assets/gallery/3.jpg", caption: "I enjoy solving real-world problems." },
    { src: "assets/gallery/4.jpg", caption: "I always see challanges as an opportunity to unleash my potential" },
    { src: "assets/gallery/5.jpg", caption: "Learning is the key to personal development" },
    { src: "assets/gallery/6.jpg", caption: "Hope you enjoyed viewing my photo album." },

  ];

  public get images() {
    return this._images;
  }
  public set images(value) {
    this._images = value;
  }

  constructor(private _lightboxConfig: LightboxConfig, private _lightbox: Lightbox) {


    _lightboxConfig.fadeDuration = 0.7;
    _lightboxConfig.resizeDuration = 0.5;
    _lightboxConfig.fitImageInViewPort = true;
    // _lightboxConfig.positionFromTop = 350;
    _lightboxConfig.showImageNumberLabel = true;
    _lightboxConfig.alwaysShowNavOnTouchDevices = true;
    _lightboxConfig.wrapAround = true;
    _lightboxConfig.disableKeyboardNav = false;
    _lightboxConfig.disableScrolling = false;
    _lightboxConfig.centerVertically = true;
    _lightboxConfig.albumLabel = "Image %1 of %2";
    _lightboxConfig.enableTransition = true;
    _lightboxConfig.showZoom = true;
    _lightboxConfig.showRotate = false;
    _lightboxConfig.showDownloadButton = false;
    _lightboxConfig.containerElementResolver = () => document.body;

    while (this.i < this.images.length) {

      const src = this.images[this.i].src;
      const caption = this.images[this.i].caption;
      const thumb = this.images[this.i].src;

      const album = {
        src: src,
        caption: caption,
        thumb: thumb
      };

      this.albums.push(album);
      this.i++;
    }
  }

  open(index: number): void {
    // open lightbox
    this._lightbox.open(this.albums, index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

  getSelectedImageDetails(imageIndex: number) {
    this.selectedImageIndex = imageIndex;
    this.selectedImageDetails = this._images[imageIndex];
    this.getSeletedImageExtension(imageIndex);
  }

  getSeletedImageExtension(imageIndex: number) {
    this.selectedImageIndex = imageIndex;
    this.filePath = this._images[imageIndex].src;
    this.fileName = this.filePath.split('/').pop().split('.')[0];
    this.fileExtension = this.filePath.split('/').pop().split('.')[1];

  }

}
