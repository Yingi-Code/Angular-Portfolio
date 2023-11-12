import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthJwtComponent } from './auth-jwt.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharethisAngularModule } from 'sharethis-angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppIconsModule } from 'src/app/app.icons.module';
import { ShareThisButtonsComponent } from 'src/app/app-shared/social-media-buttons/share-this-buttons/share-this-buttons.component';
import { SidebarComponent } from 'src/app/app-structure/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/app-shared/services/authentication/auth/auth.service';

describe('AuthJwtComponent', () => {
  let component: AuthJwtComponent;
  let fixture: ComponentFixture<AuthJwtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AppIconsModule,
        SharethisAngularModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ReactiveFormsModule
      ],
      declarations: [
        AuthJwtComponent,
        ShareThisButtonsComponent,
        SidebarComponent,],
      
      providers: [AuthService],
      
      teardown: { destroyAfterEach: false }
    });

    fixture = TestBed.createComponent(AuthJwtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
