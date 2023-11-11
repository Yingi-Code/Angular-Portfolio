import { GalleryComponent } from './app-dashboard-items/gallery/gallery.component';
import { PageNotFoundComponent } from './app-views/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './app-views/home/home.component';
import { AboutComponent } from './app-views/about/about.component';
import { DeactivateRoute } from './app-shared/routes-guard/deactivate-route';
import { ContactComponent } from './app-views/contact/contact.component';
import { DashboardComponent } from './app-views/dashboard/dashboard.component';
import { FormsTemplateDrivenComponent } from './app-dashboard-items/angular forms/forms-template-driven/forms-template-driven.component';
import { FormsReactiveComponent } from './app-dashboard-items/angular forms/forms-reactive/forms-reactive.component';
import { ProductsListComponent } from './app-dashboard-items/online-store-api/products/products-list/products-list.component';
import { GoogleMapsComponent } from './app-dashboard-items/google-maps/google-maps.component';
import { VideoComponent } from './app-dashboard-items/videos/video.component';
import { OnlineBookingsComponent } from './app-dashboard-items/online-booking-calendar/online-bookings.component';
import { AuthJwtComponent } from './app-dashboard-items/authentications/auth-jwt/auth-jwt.component';
import { AccountComponent } from './app-dashboard-items/authentications/account/account.component';
import { AuthBasicComponent } from './app-dashboard-items/authentications/auth-basic/auth-basic.component';
import { ProductDetailsComponent } from './app-dashboard-items/online-store-api/products/product-details/product-details.component';

const routes: Routes = [
  //components content are rendared by <router-outlet></router-outlet> inside the app component
  // redirectTo - home
  { path: '', component: HomeComponent, title: "My RPs - Home"  },
  
  { path: 'home', component: HomeComponent, title: "My RPs - Home" },
  { path: 'about', component: AboutComponent, title: "My RPs - About Developer" },
  { path: 'contact', component: ContactComponent, canDeactivate: [DeactivateRoute], title: "My RPs - Contact" },
  { path: 'cpanel', component: DashboardComponent, title: "My RPs - Panel" },
  
  {
     path: 'app', children: [
      { path: 'template-driven-form', component: FormsTemplateDrivenComponent, canDeactivate: [DeactivateRoute], title: "My RPs - Template-driven" },
      { path: 'reactive-form', component: FormsReactiveComponent, canDeactivate: [DeactivateRoute], title: "My RPs - Reactive" },
      { path: 'gallery', component: GalleryComponent, title: "My RPs - Gallery" },
       {
         path: 'online-store', component: ProductsListComponent, title: "My RPs - Products"
      },
       
      {
        path: 'online-store', children: [{
          path: 'product-details/:id', component: ProductDetailsComponent, title: "My RPs - Details"
        }]
      },
       
      { path: 'google-maps', component: GoogleMapsComponent, title: "My RPs - Maps" },
      { path: 'videos', component: VideoComponent, title: "My RPs - Videos" },
      { path: 'online-bookings', component: OnlineBookingsComponent, title: "My RPs - Bookings" },
    ]
  },

  
  { path: 'account', component: AccountComponent, title: "My RPs - Account" },
  {
    path: 'account', children: [
      { path: 'auth-jwt', component: AuthJwtComponent, canDeactivate: [DeactivateRoute],  title: "My RPs - JWT Auth" },
      { path: 'auth-basic', component: AuthBasicComponent, canDeactivate: [DeactivateRoute], title: "My RPs - Basic Auth" }
    ]
  },
  // redirectTo - Error page
  { path: '**', component: PageNotFoundComponent, title: "My RPs- Not found" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
