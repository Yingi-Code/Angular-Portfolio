import { Component, OnInit } from '@angular/core';
import { fadeInPageTitle } from 'src/app/app-shared/animations/animations';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
  animations: [
    fadeInPageTitle
  ]
})
export class VideoComponent implements OnInit {

  //[ ngSwitch tag]
  viewMode = 'defaultTab';
  
  videoItems = [
    { name: 'Scatting and cableway', src: 'assets/videos/ice.mp4', type: 'video/mp4'},
    { name: 'Maldive lifestyle', src: 'assets/videos/malvide.mp4', type: 'video/mp4' },
    { name: 'Home away from home', src: 'assets/videos/relaxed-waves.mp4', type: 'video/mp4'},
    { name: 'The magical surfing', src: 'assets/videos/surfing.mp4', type: 'video/mp4' },
    { name: 'Peace of mind', src: 'assets/videos/end-of-the-day.mp4', type: 'video/mp4' }
  ];

  activeIndex = 0;
  currentVideo = this.videoItems[this.activeIndex];
  data: any;
  constructor() { }
  ngOnInit(): void { }

  videoPlayerInit(data: any) {
    this.data = data;
    this.data.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.initVdo.bind(this));
    this.data.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
  }

  nextVideo() {
    this.activeIndex++;
    if (this.activeIndex === this.videoItems.length) {
      this.activeIndex = 0;
    }
    this.currentVideo = this.videoItems[this.activeIndex];
  }

  initVdo() {
    this.data.play();
  }
  
  startPlaylistVdo(item: any, index: number) {
    this.activeIndex = index;
    this.currentVideo = item;
  }

}
