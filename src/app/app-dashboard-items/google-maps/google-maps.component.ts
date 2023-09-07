import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';
import { fadeInPageTitle } from 'src/app/app-shared/animations/animations';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css'],
  animations: [
    fadeInPageTitle
  ]
})
  
export class GoogleMapsComponent {
  @ViewChild(MapInfoWindow, { static: false }) infoWindow!: MapInfoWindow
  constructor() { }
  ngOnInit(): void { 

  }

  //[ ngSwitch tag]
  viewMode = 'defaultTab';

  display: any;
  center: google.maps.LatLngLiteral = {
    lat: -26.059366641676547,
    lng: 27.945592723518114
  };
  zoom = 13;

  markerPosition = {
    lat: -26.059366641676547,
    lng: 27.945592723518114,
    label: 'myRecentProjects'
  };

  openInfo(marker: MapMarker) {
    this.infoWindow.open(marker)
  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = (event.latLng.toJSON());
  }
  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }

}
