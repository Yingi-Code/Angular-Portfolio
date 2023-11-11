import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharethisAngularModule } from 'sharethis-angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppIconsModule } from 'src/app/app.icons.module';
import { ShareThisButtonsComponent } from 'src/app/app-shared/social-media-buttons/share-this-buttons/share-this-buttons.component';
import { SidebarComponent } from 'src/app/app-structure/sidebar/sidebar.component';
import { DashboardItemsComponent } from 'src/app/app-structure/dashboard-items/dashboard-items.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppIconsModule,
        SharethisAngularModule,
        BrowserAnimationsModule,
        AppRoutingModule
      ],
      declarations: [
        DashboardComponent,
        DashboardItemsComponent,
        ShareThisButtonsComponent,
        SidebarComponent,
      ],
      teardown: { destroyAfterEach: false }
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
