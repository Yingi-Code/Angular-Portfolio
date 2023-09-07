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

  albums: any = [];
  private _images = [
    { src: "assets/gallery/1.jpeg", caption: "Example" },
    // { src: "assets/gallery/2.jpeg", caption: "Example" },
    { src: "assets/gallery/3.jpeg", caption: "Example" },
    { src: "assets/gallery/4.jpeg", caption: "Example" },
    { src: "assets/gallery/5.jpeg", caption: "Example" },
    // { src: "assets/gallery/6.jpeg" , caption: "Example" },
    { src: "assets/gallery/7.jpeg", caption: "Example" },
    { src: "assets/gallery/8.jpeg", caption: "Example" },
    { src: "assets/gallery/9.jpeg", caption: "Example" },
    { src: "assets/gallery/10.jpeg", caption: "Example" },
    { src: "assets/gallery/11.jpeg", caption: "Example" },
    { src: "assets/gallery/12.jpeg", caption: "Example" },
    { src: "assets/gallery/13.jpeg", caption: "Example" },
    { src: "assets/gallery/14.jpeg", caption: "Example" },
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
    _lightboxConfig.showZoom = false;
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

}
