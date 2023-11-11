import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxLightboxComponent } from './ngx-lightbox.component';
import { LightboxConfig, LightboxModule } from 'ngx-lightbox';
import { AppIconsModule } from 'src/app/app.icons.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharethisAngularModule } from 'sharethis-angular';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('NgxLightboxComponent', () => {
  let component: NgxLightboxComponent;
  let fixture: ComponentFixture<NgxLightboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        SharethisAngularModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        AppIconsModule,
        LightboxModule
      ],
      declarations: [
        NgxLightboxComponent,
      ],
      providers: [LightboxConfig],
      teardown: { destroyAfterEach: false }
    });
    fixture = TestBed.createComponent(NgxLightboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
