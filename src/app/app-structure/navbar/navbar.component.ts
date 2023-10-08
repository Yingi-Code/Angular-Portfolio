import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { ICustomer } from 'src/app/app-shared/interfaces/icustomer/icustomer';
import { AuthStorageService } from 'src/app/app-shared/services/authentication/auth-storage/auth-storage.service';
import { CartsService } from 'src/app/app-shared/services/online-store-services/carts/carts.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  currentUser: any;
  logInStatus: any;
  firstname?: string;

  //to be declared properly
  _userCarts?: any;
  _userCartsAmount?: number;
  _user: ICustomer;

  subscription?: Subscription;
  
  constructor(
    public router: Router,
    private authStorage: AuthStorageService,
    private carts: CartsService
  ) { 
    this._user = {
      "address":
      {
        "geolocation":
        {
          "lat": '',
          "long": ''
        },
        "city": '',
        "street": '',
        "number": 0,
        "zipcode": ''
      },
      "id": 0,
      "email": '',
      "username": '',
      "password": '',
      "name": {
        "firstname": '',
        "lastname": ''
      },
      "phone": '',
      "__v": 0
    };
  }

  ngOnInit(): void {

      this._user = this.authStorage.getUser();
      console.log('Retrieved user Id: ' + this._user.id);  
    this.updateLoginStatus();
  }

  updateLoginStatus() {
      //update firstname in the template immediately
      this.subscription = this.authStorage.userFirstName$
        .subscribe((userFirstName?: string) => {
          this.firstname = userFirstName;
          console.log('[NavBar] - Firstname = ' + this.firstname);
        });
  }

  public get getUserCarts() {
    if (this.authStorage.getToken() != null) {
      this.carts.getUserCarts(this.authStorage.getUser().id)
        .subscribe((userCats) => {
          if (userCats) {
            this._userCarts = userCats;
          } else {
            this._userCarts = null;
          }
        })
    } else {
      this._userCarts = null;
    }
    return this._userCarts;
  }

  public get getUserCartsAmount() {
    return this._userCartsAmount = this.getUserCarts?.length;
  }

  public login() {
    this.router.navigate(['/account/auth-jwt']);
  }

  loginOptions() {
    this.router.navigate(['/account']);
  }

  public logout() {
    // this.updateLoginStatus();
    this.authStorage.signOut();
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }
}
