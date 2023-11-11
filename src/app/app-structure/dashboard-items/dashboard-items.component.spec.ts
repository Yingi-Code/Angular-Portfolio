import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardItemsComponent } from './dashboard-items.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharethisAngularModule } from 'sharethis-angular';
import { ShareThisButtonsComponent } from 'src/app/app-shared/social-media-buttons/share-this-buttons/share-this-buttons.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppIconsModule } from 'src/app/app.icons.module';

describe('DashboardItemsComponent', () => {
  let component: DashboardItemsComponent;
  let fixture: ComponentFixture<DashboardItemsComponent>;

  beforeEach(async () => {
    
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        SharethisAngularModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        AppIconsModule
      ],
      declarations: [
        DashboardItemsComponent,
        ShareThisButtonsComponent,
        SidebarComponent,
      ],
      teardown: { destroyAfterEach: true }
    });
    fixture = TestBed.createComponent(DashboardItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
