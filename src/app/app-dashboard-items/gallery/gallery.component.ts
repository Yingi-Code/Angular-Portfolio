import { Component } from '@angular/core';
import { fadeInPageTitle } from 'src/app/app-shared/animations/animations';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  animations: [
    fadeInPageTitle
  ]
})
export class GalleryComponent {
  //[ ngSwitch tag]
  viewMode = 'defaultTab';
  ng_Gallery_ViewMode = 'ng-gallery-lightbox-Tab';

}
