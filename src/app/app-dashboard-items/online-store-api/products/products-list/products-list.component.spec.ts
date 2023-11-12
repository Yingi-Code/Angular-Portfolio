import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsListComponent } from './products-list.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LightboxModule } from 'ngx-lightbox';
import { SharethisAngularModule } from 'sharethis-angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppIconsModule } from 'src/app/app.icons.module';
import { ShareThisButtonsComponent } from 'src/app/app-shared/social-media-buttons/share-this-buttons/share-this-buttons.component';
import { LoadingSpinnerComponent } from 'src/app/app-structure/loading-spinner/loading-spinner.component';
import { SidebarComponent } from 'src/app/app-structure/sidebar/sidebar.component';
import { ProductService } from 'src/app/app-shared/services/online-store-services/products/products.service';
import { SearchComponent } from 'src/app/app-structure/search/search.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AppIconsModule,
        SharethisAngularModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        LightboxModule,
        NgxPaginationModule,
        FormsModule
      ],
      declarations: [
        ProductsListComponent,
        ShareThisButtonsComponent,
        SidebarComponent,
        LoadingSpinnerComponent,
        SearchComponent
      ],
      providers: [
        ProductService,
      ],
      teardown: { destroyAfterEach: false }
    });
    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
