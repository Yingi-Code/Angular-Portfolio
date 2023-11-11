import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthBasicComponent } from './auth-basic.component';
import { AuthService } from 'src/app/app-shared/services/authentication/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ShareThisButtonsComponent } from 'src/app/app-shared/social-media-buttons/share-this-buttons/share-this-buttons.component';
import { SidebarComponent } from 'src/app/app-structure/sidebar/sidebar.component';
import { SharethisAngularModule } from 'sharethis-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppIconsModule } from 'src/app/app.icons.module';
import { ReactiveFormsModule } from '@angular/forms';

describe('AuthBasicComponent', () => {
  let component: AuthBasicComponent;
  let fixture: ComponentFixture<AuthBasicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AppIconsModule,  
        SharethisAngularModule,
        BrowserAnimationsModule,
        ReactiveFormsModule
      ],
      
      declarations:
        [
          AuthBasicComponent,
          ShareThisButtonsComponent,
          SidebarComponent,
        ],
      providers: [AuthService]
    });
    fixture = TestBed.createComponent(AuthBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('To be instance of Auth-Basic component', () => {
    expect(component).toBeInstanceOf(AuthBasicComponent);
  });
});
