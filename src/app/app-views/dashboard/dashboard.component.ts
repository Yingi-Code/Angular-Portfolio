import { Component } from '@angular/core';
import { fadeInPageTitle } from 'src/app/app-shared/animations/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    fadeInPageTitle
  ]
})
export class DashboardComponent {

}
