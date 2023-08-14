import { ContactComponent } from './app-basic-views/contact/contact.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './app-basic-views/home/home.component';
import { AboutComponent } from './app-basic-views/about/about.component';
import { ServicesComponent } from './app-basic-views/services/services.component';
import { ErrorComponent } from './app-basic-views/error/error.component';
import { DeactivateRoute } from './app-shared/routes-guard/deactivate-route';
import { FaqComponent } from './app-basic-views/faq/faq.component';
import { GalleryComponent } from './app-basic-views/gallery/gallery.component';


const routes: Routes = [
  //components content are rendared by <router-outlet></router-outlet> inside the app component

  // redirectTo - home
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '', component: HomeComponent, title: "My RPs - Home"  },
  
  { path: 'home', component: HomeComponent, title: "My RPs - Home" },
  { path: 'about', component: AboutComponent, title: "My RPs - About Developer" },
  { path: 'services', component: ServicesComponent, title: "My RPs - Dashboard" },
  { path: 'faq', component: FaqComponent, title: "My RPs- FAQs" },
  { path: 'contact', component: ContactComponent, canDeactivate: [DeactivateRoute], title: "My RPs - Contact Us" },
  { path: 'gallery', component: GalleryComponent, title: "My RPs - Gallery" },
  // redirectTo - Error page
  { path: '**', component: ErrorComponent, title: "My RPs- Not found" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
