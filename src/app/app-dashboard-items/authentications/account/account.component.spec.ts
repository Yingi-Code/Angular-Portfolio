import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountComponent } from './account.component';
import { ShareThisButtonsComponent } from 'src/app/app-shared/social-media-buttons/share-this-buttons/share-this-buttons.component';
import { SidebarComponent } from 'src/app/app-structure/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharethisAngularModule } from 'sharethis-angular';
import { AppIconsModule } from 'src/app/app.icons.module';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        AppIconsModule,
        SharethisAngularModule,
        BrowserAnimationsModule,
        AppRoutingModule
      ],
      declarations: [
        AccountComponent,
        ShareThisButtonsComponent,
        SidebarComponent],
      teardown: { destroyAfterEach: true }
    });
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
