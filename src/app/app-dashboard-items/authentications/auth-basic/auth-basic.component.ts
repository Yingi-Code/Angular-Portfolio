import { Component } from '@angular/core';
import { fadeInPageTitle } from 'src/app/app-shared/animations/animations';

@Component({
  selector: 'app-auth-basic',
  templateUrl: './auth-basic.component.html',
  styleUrls: ['./auth-basic.component.css'],
  animations: [
    fadeInPageTitle
  ]
})
export class AuthBasicComponent {

  //[ ngSwitch tag]
  viewMode = 'defaultTab';

}
