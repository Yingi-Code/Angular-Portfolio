import { Component } from '@angular/core';
import { fadeInPageTitle } from 'src/app/app-shared/animations/animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [
    fadeInPageTitle
  ]
})
export class AboutComponent {

  //[ ngSwitch tag]
  viewMode = 'defaultTab';

}
