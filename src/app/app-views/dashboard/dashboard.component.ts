import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  //[ ngSwitch tag]
  viewMode = 'defaultTab';

  constructor(
    private _router: Router,
  )
{}
  redirectToHomePage() {
    this._router.navigate(['/']); 
  }
  
}
