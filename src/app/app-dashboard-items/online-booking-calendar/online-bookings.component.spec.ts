import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineBookingsComponent } from './online-bookings.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharethisAngularModule } from 'sharethis-angular';
import { AppIconsModule } from 'src/app/app.icons.module';
import { SidebarComponent } from 'src/app/app-structure/sidebar/sidebar.component';
import { ShareThisButtonsComponent } from 'src/app/app-shared/social-media-buttons/share-this-buttons/share-this-buttons.component';
import { FullCalendarModule } from '@fullcalendar/angular';

describe('OnlineBookingsComponent', () => {
  let component: OnlineBookingsComponent;
  let fixture: ComponentFixture<OnlineBookingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppIconsModule,
        SharethisAngularModule,
        BrowserAnimationsModule, 
        FullCalendarModule
      ],
      declarations: [
        OnlineBookingsComponent,
        ShareThisButtonsComponent,
        SidebarComponent
      ]
    });
    fixture = TestBed.createComponent(OnlineBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
