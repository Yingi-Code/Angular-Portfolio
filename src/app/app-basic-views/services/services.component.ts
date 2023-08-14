import { Component } from '@angular/core';
import { fadeInPageTitle } from 'src/app/app-shared/animations/animations';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  animations: [
    fadeInPageTitle
  ]
})
export class ServicesComponent {
  //ngSwitch for nav-tabs
  viewMode = 'defaultTab';
}
