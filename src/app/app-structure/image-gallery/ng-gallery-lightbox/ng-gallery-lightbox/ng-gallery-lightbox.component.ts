
import { Component, OnInit } from '@angular/core';
import { NgFor, AsyncPipe } from '@angular/common';
import { GalleryModule, Gallery, GalleryItem } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';


@Component({
  selector: 'app-ng-gallery-lightbox',
  template: `
   <div class="grid-item"  *ngFor="let item of items; let i = index" [lightbox]="i">
    {{ item.data }}
    <img [src]="item.data"  title="{{item.data}}" />
</div>
  `,
  standalone: true,
  imports: [LightboxModule, NgFor, AsyncPipe]
})
  
  
export class NgGalleryLightboxComponent implements OnInit  {

  galleryId = 'myLightbox';
  items: GalleryItem[] = [
    //GalleryItem array
    {
      data: {  
        type: 'GalleryItemType',
        src: 'assets/gallery/1.jpeg',
        // {
        //     url: 'assets/gallery/1.jpeg',
        //     type: 'GalleryItem',
        // },
          thumb: 'assets/gallery/1.jpeg',
          args: 'Some argument'
      }
    }   

  ];

  constructor(public gallery: Gallery) { }

  ngOnInit() {
    // Load items into gallery
    const galleryRef = this.gallery.ref(this.galleryId);
    galleryRef.load(this.items);
  }


}
