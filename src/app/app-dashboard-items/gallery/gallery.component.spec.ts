import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryComponent } from './gallery.component';
import { ShareThisButtonsComponent } from 'src/app/app-shared/social-media-buttons/share-this-buttons/share-this-buttons.component';

import { SharethisAngularModule } from 'sharethis-angular';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from 'src/app/app-structure/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppIconsModule } from 'src/app/app.icons.module';
import { LightboxModule } from 'ngx-lightbox';
import { NgxLightboxComponent } from 'src/app/app-structure/image-gallery/ngx-lightbox/ngx-lightbox/ngx-lightbox.component';

describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AppIconsModule,
        SharethisAngularModule,
        BrowserAnimationsModule,
        LightboxModule
      ],

      declarations: [
        GalleryComponent,
        ShareThisButtonsComponent,
        SidebarComponent,
        NgxLightboxComponent]
    });
    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
