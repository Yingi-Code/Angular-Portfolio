import { IDeveloper } from '../../../app-shared/interfaces/i-developer/ideveloper';
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
  let mockDevOjb = {
    firstName: 'Yingi',
    emailAddress: "yingi@yahoo.com",
    project: {
      isSubscribed: false,
      developerRole: "Angular Developer",
    }
  };

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

  it('Should create [ Form Reactive ] component ', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit() - Should load list of developers', () => {
    expect(component.developers).toBeDefined();
  });

  it('ResetToDefault() - Should reset Developer object to null', () => {
    expect(component.ResetToDefault()).toBeUndefined();
  });

  it('Developer() - Developers list lenght should be less or equal to 4', () => {
    expect(component.developers.length).toBeLessThan(4);
  });

  it('populateDeveloperForm - Should populate Developer object when developer is seleted', () => {
    let _mockDevDetailsObj = component.DeveloperDetails(mockDevOjb);
    expect(_mockDevDetailsObj.firstName).toContain("Yingi");
  });
  
});
