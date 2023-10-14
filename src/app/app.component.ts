import { Component, OnInit } from '@angular/core';

//for Angular Universal (SEC)
import { Title, Meta } from '@angular/platform-browser';
import { AuthStorageService } from './app-shared/services/authentication/auth-storage/auth-storage.service';
import { CartsService } from './app-shared/services/online-store-services/carts/carts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = '';
  subscription: any;
  firstname: string | undefined;
  isLoggedIn: boolean | undefined;
  
  constructor(
    private carts: CartsService,
    private metaTagService: Meta,
    private titleTagService: Title,
    private authStorage: AuthStorageService) { }
  
  ngOnInit(): void { 

    if (this.authStorage.getToken() != null) {
      this.authStorage.updateFirstName();
      this.authStorage.updateCartsQuantity();
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }

    //Angular Universal - SEO Config
    this.titleTagService.setTitle(this.title);
    this.metaTagService.updateTag(
      {
        name: 'description',
        content: 'my Recent Project is a single-page application (SPA) built with Angular 16.x framework, also integrated with JSON RESTful API, with the purpose of demonstrating the fundamentals software development skills, including responsive web design(RWD)'
      });

    this.metaTagService.addTags([
      {
        name: 'keywords',
        content: 'Myrecentproject, My Recent Project, My, Recent, Projects, Project, Angular, Angular Web, Angular Web Project, Angular Web Portfolio, Angular Project, Angular Projects, Angular Portfolio, Online Angular Portfolio, Angular Online Portfolio, Portfolio, RWD, Responsive, Web, Design, Responsive Web, Web Design, Single Page Application, Single Page, Front End,Front End Development, Front End Angular, Front End Angular Developer, Front-End, Front-End Development, Front-End Angular, Front-End angular Developer, IU, ui, UX, ux, UX/UI, User Experience, User-Interface, User Interface, Github, Online, online portfolio, online project, online angular, angular online, angular forms, forms in angular, reactive forms, template driven forms, API, RESTful, RESTful API, JSON RESTful, JSON RESTful API ,photo gallery, Yingi, Yingisani, Shirinda, Chiqinda, Yingi Shirinda, Yingi Chiqinda Programming, IT Programming, IT Web Development, Angular Web Development, Angular Web Design,',
      },
      {
        name: 'robots',
        content: 'index, follow,'
      },
      {
        name: 'author',
        content: 'Y. Chiqinda'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        name: 'date',
        content: '2023-10-15',
        scheme: 'YYYY-MM-DD'
      },
      { charset: 'UTF-8' },
    ]);

  }


  
}
