import { Component } from '@angular/core';
import { fadeInPageTitle } from 'src/app/app-shared/animations/animations';

@Component({
  selector: 'app-cascading-menu',
  templateUrl: './cascading-menu.component.html',
  styleUrls: ['./cascading-menu.component.css'],
  animations: [
    fadeInPageTitle
  ]
})
export class CascadingMenuComponent {
  //[ ngSwitch tag]
  viewMode = 'defaultTab';
}
