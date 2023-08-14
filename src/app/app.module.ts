//for data-binding - using ngModel
import { NgModule } from '@angular/core';

//eliminates 404 error when refresh the hosted page
// import { HashLocationStrategy, LocationStrategy  } from '@angular/common';

//for reactive forms
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

//for Angular Universal (SEO)
import { provideClientHydration } from '@angular/platform-browser';

//for toasts notifications and aminations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

//for template-driven forms. e.g ngForm
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './app-structure/header/header.component';
import { FooterComponent } from './app-structure/footer/footer.component';
import { NavbarComponent } from './app-structure/navbar/navbar.component';
import { HomeComponent } from './app-basic-views/home/home.component';
import { AboutComponent } from './app-basic-views/about/about.component';
import { ErrorComponent } from './app-basic-views/error/error.component';
import { AppRoutingModule } from './app-routing.module';

//for font-awesome
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons'

import { SidebarComponent } from './app-structure/sidebar/sidebar.component';
import { ServicesComponent } from './app-basic-views/services/services.component';
import { FaqComponent } from './app-basic-views/faq/faq.component';
import { ContactComponent } from './app-basic-views/contact/contact.component';
import { CommonModule } from '@angular/common';

//for carousels
import { NgbCarouselConfig, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CarouselComponent } from './app-shared/image-slider/carousel/carousel.component';
import { NgBootstrapCarouselComponent } from './app-shared/image-slider/ng-bootstrap-carousel/ng-bootstrap-carousel.component';


//for lightbox image gallery
import { LightboxModule } from 'ngx-lightbox';

import { NgxLightboxComponent } from './app-shared/image-viewer/ngx-lightbox/ngx-lightbox.component';

//for share-this buttons
import { SharethisAngularModule } from 'sharethis-angular';
import { ShareThisButtonsComponent } from './app-shared/social-media-buttons/share-this-buttons/share-this-buttons.component';
import { StarRatingComponent } from './app-shared/star-rating/star-rating.component';
import { GalleryComponent } from './app-basic-views/gallery/gallery.component';


@NgModule({

  //All the App Components here ...
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ErrorComponent,
    SidebarComponent,
    ServicesComponent,
    FaqComponent,
    ContactComponent,
    CarouselComponent,
    NgBootstrapCarouselComponent,
    NgxLightboxComponent,
    ShareThisButtonsComponent,
    StarRatingComponent,
    GalleryComponent

  ],
  imports: [
  
    // NgbCarouselModule,
    // NgIf,

    //All the App Special Models not from @angular/core
    BrowserModule,
    // GoogleMapsModule,
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
    
    //for toasts notifications
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
    }),

    //for routes in App-Routing.Module.ts
    AppRoutingModule,
  ],
  providers: [
    NgbCarouselConfig, 
    // { provide: LocationStrategy, useClass: HashLocationStrategy },
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
  
export class AppModule { 

  //for Font-Awesome to be accessible globally
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far, fab);
  }
  
}
