import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInPageTitle } from 'src/app/app-shared/animations/animations';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
  animations: [
    fadeInPageTitle,
  ]
})
export class PageNotFoundComponent implements OnInit {

  //[ ngSwitch tag]
  viewMode = 'defaultTab';
  private currentUrl: string = '';

  constructor(private _router: Router,) {
    
  }

  ngOnInit(): void {
    this.currentUrl  = this._router.url;
  }

  redirectToHomePage() {
    this._router.navigate(['/']);
  }

  redirectToCPanle() {
    this._router.navigate(['/cpanel']);
  }

}
