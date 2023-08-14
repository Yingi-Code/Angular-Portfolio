import { Component } from '@angular/core';
import { trigger, state, style, animate, transition, AnimationTriggerMetadata } from '@angular/animations';
import { fadeInPageTitle, fadeInFeaturedImaged, fadeInOutCarousel } from 'src/app/app-shared/animations/animations';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    fadeInPageTitle,
    fadeInFeaturedImaged,
    fadeInOutCarousel
  ]
})
  
export class HomeComponent{
  //page title
  viewTitle = "Welcome";
 }

