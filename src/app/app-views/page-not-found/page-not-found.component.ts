import { Component } from '@angular/core';
import { fadeInPageTitle } from 'src/app/app-shared/animations/animations';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
  animations: [
    fadeInPageTitle,
  ]
})
export class PageNotFoundComponent {

}
