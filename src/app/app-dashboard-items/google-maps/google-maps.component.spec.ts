import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleMapsComponent } from './google-maps.component';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SharethisAngularModule } from 'sharethis-angular';
import { ShareThisButtonsComponent } from 'src/app/app-shared/social-media-buttons/share-this-buttons/share-this-buttons.component';
import { SidebarComponent } from 'src/app/app-structure/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppModule } from 'src/app/app.module';
import { AppIconsModule } from 'src/app/app.icons.module';

describe('GoogleMapsComponent', () => {
  let component: GoogleMapsComponent;
  let fixture: ComponentFixture<GoogleMapsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AppIconsModule,
        SharethisAngularModule,
        BrowserAnimationsModule,
        AppModule
      ],
      declarations: [
        GoogleMapsComponent,
        ShareThisButtonsComponent,
        SidebarComponent,]
    });
    fixture = TestBed.createComponent(GoogleMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
