//for data-binding - using ngModel
import { NgModule } from '@angular/core';

//for reactive forms
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

//for Angular Universal (SEO)
import { provideClientHydration} from '@angular/platform-browser';

//for toasts notifications and aminations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//for template-driven forms. e.g ngForm
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

//App structural components
import { HeaderComponent } from './app-structure/header/header.component';
import { FooterComponent } from './app-structure/footer/footer.component';
import { NavbarComponent } from './app-structure/navbar/navbar.component';

//App Views components
import { HomeComponent } from './app-views/home/home.component';
import { AboutComponent } from './app-views/about/about.component';
import { ContactComponent } from './app-views/contact/contact.component';
import { PageNotFoundComponent } from './app-views/page-not-found/page-not-found.component';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

//for font-awesome
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { far } from '@fortawesome/free-regular-svg-icons';
import { faCoffee, fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import { SidebarComponent } from './app-structure/sidebar/sidebar.component';

import { CommonModule } from '@angular/common';

//for carousels
import { NgbCarouselConfig, NgbModule } from "@ng-bootstrap/ng-bootstrap";

//for lightbox image gallery
import { LightboxModule } from 'ngx-lightbox';

//for share-this buttons
import { SharethisAngularModule } from 'sharethis-angular';
import { ShareThisButtonsComponent } from './app-shared/social-media-buttons/share-this-buttons/share-this-buttons.component';
import { StarRatingComponent } from './app-shared/star-rating/star-rating.component';
import { DashboardComponent } from './app-views/dashboard/dashboard.component';
import { FormsTemplateDrivenComponent } from './app-dashboard-items/angular forms/forms-template-driven/forms-template-driven.component';
import { StrValidatorDirective } from './app-shared/validators/template-driven-validator.directive';
import { FormsReactiveComponent } from './app-dashboard-items/angular forms/forms-reactive/forms-reactive.component';
import { NgBootstrapCarouselComponent } from './app-structure/carousel/ng-bootstrap-carousel/ng-bootstrap-carousel.component';
import { NgxLightboxComponent } from './app-structure/image-gallery/ngx-lightbox/ngx-lightbox/ngx-lightbox.component';
import { GalleryComponent } from './app-dashboard-items/gallery/gallery.component';
import { ProductsListComponent } from './app-dashboard-items/online-store-api/products/products-list/products-list.component';
import { AngularFormsDataService } from './app-shared/services/angular-forms-service/angular-forms.service';
import { ProductService } from './app-shared/services/online-store-services/products/products.service';
import { SearchComponent } from './app-structure/search/search.component';
import { NgxPaginationModule } from 'ngx-pagination';

import { GoogleMapsModule } from '@angular/google-maps';
import { GoogleMapsComponent } from './app-dashboard-items/google-maps/google-maps.component';
import { DashboardItemsComponent } from './app-structure/dashboard-items/dashboard-items.component';

import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VideoComponent } from './app-dashboard-items/videos/video.component';
import { OnlineBookingsComponent } from './app-dashboard-items/online-booking-calendar/online-bookings.component';

//for calendar
import { FullCalendarModule } from '@fullcalendar/angular';
import { LoadingSpinnerComponent } from './app-structure/loading-spinner/loading-spinner.component';

//for Authentication methods
import { AuthJwtComponent } from './app-dashboard-items/authentications/auth-jwt/auth-jwt.component';
import { AccountComponent } from './app-dashboard-items/authentications/account/account.component'
import { AuthBasicComponent } from './app-dashboard-items/authentications/auth-basic/auth-basic.component';
import { DeactivateRoute } from './app-shared/routes-guard/deactivate-route';
import { ProductDetailsComponent } from './app-dashboard-items/online-store-api/products/product-details/product-details.component';
import { UsersService } from './app-shared/services/online-store-services/users/users.service';
import { CartsService } from './app-shared/services/online-store-services/carts/carts.service';
import { WeatherForecastComponent } from './app-dashboard-items/weather-forecast/weather-forecast.component';


@NgModule({

  //All the App Components here ...
  declarations: [
    
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    PageNotFoundComponent,
    SidebarComponent,
    ContactComponent,
    NgxLightboxComponent,
    ShareThisButtonsComponent,
    StarRatingComponent,
    DashboardComponent,
    FormsTemplateDrivenComponent,
    StrValidatorDirective,
    FormsReactiveComponent,
    NgBootstrapCarouselComponent,
    GalleryComponent,
    ProductsListComponent,
    ProductDetailsComponent,
    SearchComponent,
    GoogleMapsComponent,
    DashboardItemsComponent,
    VideoComponent,
    OnlineBookingsComponent,
    LoadingSpinnerComponent,
    AuthBasicComponent,
    WeatherForecastComponent,
    
    //Account and Auth components
    AccountComponent,
    AuthJwtComponent
    
  ],

  imports: [
    
    HttpClientModule,

    //All the App Special Models not from @angular/core
    BrowserModule,
    FontAwesomeModule,
    CommonModule,

    //for share-this buttons
    SharethisAngularModule,
    
    //for Template-Driven forms [ngModel  and ngForm]
    FormsModule,
    ReactiveFormsModule,

    // for carousel
    NgbModule,

    //for lightbox image gallery
    LightboxModule,
    
    //for toasts notifications and animations
    BrowserAnimationsModule,

    //for pagination
    NgxPaginationModule,

    //for GoogleMaps
    GoogleMapsModule,

    //for routes in App-Routing.Module.ts
    AppRoutingModule,

    //for videogular
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,

    //for calendar
    FullCalendarModule

  ],

  exports: [
    AppComponent
  ],

  providers: [
    NgbCarouselConfig,
    AngularFormsDataService,
    ProductService,
    UsersService,
    CartsService,
    // provideClientHydration(),
    DeactivateRoute
  ],
  bootstrap: [AppComponent]
})
  
export class AppModule { 

  //for Font-Awesome to be accessible globally
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far, fab);
    library.addIcons(faCoffee);
  }
  
}





