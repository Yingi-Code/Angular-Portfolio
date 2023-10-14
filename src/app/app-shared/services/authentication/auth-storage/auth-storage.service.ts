import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartsService } from '../../online-store-services/carts/carts.service';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const USER_CARTS_QUANTITY = 'auth-user-carts-quantity';

@Injectable({
  providedIn: 'root'
})

export class AuthStorageService implements OnInit{

  //to be updated once loggedin
  userFirstNameValue: string = '';

  //to be declared appropriately
  _userCarts: any;
  _userCartsAmount?: any;

  _cartsQuantity: any;
  _Quantity: any;

  private _userCartsAmountSub: BehaviorSubject<string> = new BehaviorSubject<string>(this._userCartsAmount);
  private userFirstName: BehaviorSubject<string> = new BehaviorSubject<string>(this.userFirstNameValue);
  
  _userCartsAmountSub$: Observable<string> = this._userCartsAmountSub.asObservable();
  userFirstName$: Observable<string> = this.userFirstName.asObservable();
  
  constructor(
    private router: Router,
    private carts: CartsService,

  ) { }

  ngOnInit(): void {
  }
 
  public saveToken(token: string): void {
   sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
   sessionStorage.removeItem(USER_KEY);
   sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    let userObject: any;
    const user = sessionStorage.getItem(USER_KEY);
    if (user) {
      userObject = JSON.parse(user);

      return userObject[0];  
    }
    return {};
  }

  //store user carts quantity in session
  setCartsQuantity(quantity: string) {
      console.log('[1. authStorage] ----- Save Quanity value ----- ');
      sessionStorage.removeItem(USER_CARTS_QUANTITY);
      sessionStorage.setItem(USER_CARTS_QUANTITY, quantity);
  }

   public updateFirstName() {
    
    let firstname = this.getUser()?.name?.firstname
    console.log('[2.1. authStorage] --- Firstname status update---');
    console.log(firstname);
    this.userFirstName.next(firstname);
  }

  public updateCartsQuantity() { 

    this._cartsQuantity = sessionStorage.getItem(USER_CARTS_QUANTITY);
    console.log('[2.2. authStorage] --- Carts quantity update---');
    console.log(this._cartsQuantity);
    this._userCartsAmountSub.next(this._cartsQuantity);
  }

  public signOut() {
    let firstName = '';
    this.userFirstName.next(firstName);
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
