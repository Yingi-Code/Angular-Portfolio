import { PageNotFoundComponent } from './app-views/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './app-views/home/home.component';
import { AboutComponent } from './app-views/about/about.component';
import { DeactivateRoute } from './app-shared/routes-guard/deactivate-route';
import { ContactComponent } from './app-views/contact/contact.component';
import { DashboardComponent } from './app-views/dashboard/dashboard.component';
import { FormsTemplateDrivenComponent } from './app-dashboard-items/forms-template-driven/forms-template-driven.component';
import { FormsReactiveComponent } from './app-dashboard-items/forms-reactive/forms-reactive.component';


const routes: Routes = [
  //components content are rendared by <router-outlet></router-outlet> inside the app component

  // redirectTo - home
  { path: '', component: HomeComponent, title: "My RPs - Home"  },
  
  { path: 'home', component: HomeComponent, title: "My RPs - Home" },
  { path: 'about', component: AboutComponent, title: "My RPs - About Developer" },
  { path: 'contact', component: ContactComponent, canDeactivate: [DeactivateRoute], title: "My RPs - About Developer" },
  { path: 'dashboard', component: DashboardComponent, title: "My RPs - Dashboard" },
  { path: 'template-driven-form', component: FormsTemplateDrivenComponent, canDeactivate: [DeactivateRoute], title: "My RPs - tempalte-driven" },
  { path: 'reactive-form', component: FormsReactiveComponent, canDeactivate: [DeactivateRoute], title: "My RPs - reactive" },
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
