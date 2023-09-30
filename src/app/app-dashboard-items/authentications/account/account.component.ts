import { Component } from '@angular/core';
import { fadeInPageTitle } from 'src/app/app-shared/animations/animations';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  animations: [
    fadeInPageTitle
  ]
})
export class AccountComponent {

  //[ ngSwitch tag]
  viewMode = 'defaultTab';

}
