import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsTemplateDrivenComponent } from './forms-template-driven.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharethisAngularModule } from 'sharethis-angular';
import { AppIconsModule } from 'src/app/app.icons.module';
import { ShareThisButtonsComponent } from 'src/app/app-shared/social-media-buttons/share-this-buttons/share-this-buttons.component';
import { SidebarComponent } from 'src/app/app-structure/sidebar/sidebar.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('FormsTemplateDrivenComponent', () => {
  let component: FormsTemplateDrivenComponent;
  let fixture: ComponentFixture<FormsTemplateDrivenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppIconsModule,
        SharethisAngularModule,
        BrowserAnimationsModule,
        AppRoutingModule
      ],
      declarations: [
        FormsTemplateDrivenComponent,
        ShareThisButtonsComponent,
        SidebarComponent],
      teardown: { destroyAfterEach: false }
    });
    fixture = TestBed.createComponent(FormsTemplateDrivenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
