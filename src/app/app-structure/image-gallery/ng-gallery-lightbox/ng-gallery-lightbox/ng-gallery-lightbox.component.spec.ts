import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgGalleryLightboxComponent } from './ng-gallery-lightbox.component';

describe('NgGalleryLightboxComponent', () => {
  let component: NgGalleryLightboxComponent;
  let fixture: ComponentFixture<NgGalleryLightboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgGalleryLightboxComponent]
    });
    fixture = TestBed.createComponent(NgGalleryLightboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
