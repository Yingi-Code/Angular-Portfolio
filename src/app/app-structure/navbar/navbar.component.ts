import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { IUser } from 'src/app/app-shared/interfaces/iuser/iuser';
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
  _userCartsQuantity?: string;

  //to be declared properly
  private _userCarts?: any;
  private _user: IUser;
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
    //console.log('[1. NavBar] --- User ID ---');
    //console.log('user Id: ' + this._user.id); 
    
    this.displayUserFirstName();
    this.displayUserCartsQuantity();
  }

  displayUserFirstName() {
      //update firstname in the template immediately
      this.subscription = this.authStorage.userFirstName$
        .subscribe((userFirstName?: string) => {
          this.firstname = userFirstName;
          //console.log('[2 .NavBar] --- Updated Firstname ---');
          //console.log('First name: ' + this.firstname);
        });
  }

  displayUserCartsQuantity() {
    //update firstname in the template immediately
    this.subscription = this.authStorage._userCartsAmountSub$
      .subscribe((_userCartsAmountSub?: string) => {
        this._userCartsQuantity = _userCartsAmountSub;
        //console.log('[3 .NavBar] --- Updated carts quantity ---');
        //console.log('Quantity : ' + this._userCartsQuantity);
      });
  }

  public login() {
    this.router.navigate(['/account']);
  }

  loginOptions() {
    this.router.navigate(['/account']);
  }

  public logout() {
    // this.updateLoginStatus();
    this.authStorage.signOut();
  }

  ngOnDestroy() {
    this.authStorage.signOut();
    this.subscription && this.subscription.unsubscribe();
  }
}
