import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsComponent } from './product-details.component';
import { ProductService } from 'src/app/app-shared/services/online-store-services/products/products.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharethisAngularModule } from 'sharethis-angular';
import { AppIconsModule } from 'src/app/app.icons.module';
import { ShareThisButtonsComponent } from 'src/app/app-shared/social-media-buttons/share-this-buttons/share-this-buttons.component';
import { SidebarComponent } from 'src/app/app-structure/sidebar/sidebar.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LightboxModule } from 'ngx-lightbox';
import { LoadingSpinnerComponent } from 'src/app/app-structure/loading-spinner/loading-spinner.component';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AppIconsModule,
        SharethisAngularModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        LightboxModule
      ],

      declarations: [
        ProductDetailsComponent,
        ShareThisButtonsComponent,
        SidebarComponent,
        LoadingSpinnerComponent
      ],
      
      providers: [
        ProductService,
      ],
      teardown: { destroyAfterEach: false }
    });
    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
