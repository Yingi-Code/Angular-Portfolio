import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsReactiveComponent } from './forms-reactive.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharethisAngularModule } from 'sharethis-angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppIconsModule } from 'src/app/app.icons.module';
import { ShareThisButtonsComponent } from 'src/app/app-shared/social-media-buttons/share-this-buttons/share-this-buttons.component';
import { SidebarComponent } from 'src/app/app-structure/sidebar/sidebar.component';

describe('FormsReactiveComponent', () => {
  let component: FormsReactiveComponent;
  let fixture: ComponentFixture<FormsReactiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppIconsModule,
        SharethisAngularModule,
        BrowserAnimationsModule,
        AppRoutingModule
      ],
      declarations: [
        FormsReactiveComponent,
        ShareThisButtonsComponent,
        SidebarComponent],
      teardown: { destroyAfterEach: false }
    });
    fixture = TestBed.createComponent(FormsReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
