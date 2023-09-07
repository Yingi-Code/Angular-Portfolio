import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { fadeInOutCarousel } from 'src/app/app-shared/animations/animations';

@Component({
  selector: 'app-ng-bootstrap-carousel',
  templateUrl: './ng-bootstrap-carousel.component.html',
  styleUrls: ['./ng-bootstrap-carousel.component.css'],
  animations: [fadeInOutCarousel],
  providers: [NgbCarouselConfig]
})
export class NgBootstrapCarouselComponent {


  images = [
    {
      title: 'Responsive UI(s)',
      short: 'Mobile-friendly user-interface designs.',
      src: "../assets/banners/1.jpg"
    },
    {
      title: 'Angular SPA(s)',
      short: 'Developing single-page applications using angular framework.',
      src: "../assets/banners/2.jpg"
    },
    {
      title: 'API(s) Integration',
      short: 'Interfacing Angular applications with other applications',
      src: "../assets/banners/3.jpg"
    }
  ];

  constructor(config: NgbCarouselConfig) {
    // 
    config.interval = 4000;
    config.keyboard = true;
    config.pauseOnHover = true;

  }

}
