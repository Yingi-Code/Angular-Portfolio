import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInPageTitle } from 'src/app/app-shared/animations/animations';
import { AuthStorageService } from 'src/app/app-shared/services/authentication/auth-storage/auth-storage.service';
import { AuthService } from 'src/app/app-shared/services/authentication/auth/auth.service';
import { UsersService } from 'src/app/app-shared/services/online-store-services/users/users.service';
import { CartsService } from 'src/app/app-shared/services/online-store-services/carts/carts.service';
import { AlertNotificationsService } from 'src/app/app-shared/services/notifications/alerts/alert-notifications.service';
import { catchError, map, throwError } from 'rxjs';

@Component({
  selector: 'app-auth-basic',
  templateUrl: './auth-basic.component.html',
  styleUrls: ['./auth-basic.component.css'],
  animations: [
    fadeInPageTitle
  ]
})
  
export class AuthBasicComponent implements OnInit {
  viewMode = 'defaultTab';
  _developerForm!: FormGroup;
  _errorMessage: string = '';

  private _userCarts: any;
  private _Quantity: any;

  //canDeactivate
  exit: boolean = true;

  constructor(
    private _auth: AuthService,
    private _users: UsersService,
    private _carts: CartsService,
    private _router: Router,
    private _authStorage: AuthStorageService,
    private _alertsService: AlertNotificationsService) {
  }

  ngOnInit(): void {
    //_developerForm object with form-control names
    this._developerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required]),
    });

    if (this._authStorage.getToken() != null) {
      this._authStorage.updateFirstName();
      this._authStorage.updateCartsQuantity();
      this._router.navigate(['/']);
    }
  }

  //another approach to accessing form controls [form control index-based]
  get loginFormControls() { return this._developerForm.controls; }

  //login to retrieve and store Token
 

  //login to retrieve and store Token
  public login() {
    //get form inputs data 
    const val = this._developerForm.value;

    this._auth.login(val.username, val.password).pipe(
      map((_httpResponseData: any) => {

        //no http response data found - error
        if (!_httpResponseData) {
          throwError;
        }
        return _httpResponseData;
      }),
      //catch http response error
      catchError(_httpResponseError => {
        throw _httpResponseError;
      })
    )
      .subscribe({
        //http response data param
        next: (_httpResponseData) => {
          //set User object to be stored in sessionStorage
          this.setStorageData(val.username, val.password);
          this._developerForm.reset();
          this._router.navigate(['/']);
        },
        //http response error param
        error: (_httpResponseError) => {
          console.log(this._errorMessage);
          this._errorMessage = _httpResponseError.error;
          this._errorMessage = this._errorMessage[0].toUpperCase() + this._errorMessage.substring(1).toLowerCase();
        }
      })
  }

  //store  loggedIn user record after successful login
  private setStorageData(_username: string, _password: string): void {

    this._users.getUsers().pipe(
      map((_httpResponseData: any) => {

        //no http response data found - error
        if (!_httpResponseData) {
          throwError;
        }

        //filter users and retrieve the matching user record
        _httpResponseData = _httpResponseData.filter((user: any) =>
        (user.username.toLowerCase() == _username.toLowerCase() &&
          (user.password.toLowerCase() == _password.toLowerCase())));

        return _httpResponseData;
      }),
      //catch http response error
      catchError(_httpResponseError => {
        throw _httpResponseError;
      })
    )
      .subscribe({
        //http response data param
        next: (_httpResponseData) => {
          //store user record in sessionStorage
          this._authStorage.saveUser(_httpResponseData);
          this.getUserCartsQuantity();
        },
        //http response error param
        error: (_httpResponseError) => {
          this._errorMessage = _httpResponseError.error;
          this._errorMessage = this._errorMessage[0].toUpperCase() + this._errorMessage.substring(1).toLowerCase();
        }
      });
  }

  //retrieve and store user charts quantity in session storage
  private getUserCartsQuantity() {
    let user = this._authStorage.getUser();
    let userId;

    if (user) {
      userId = user?.id;
    } else {
      throwError;
    }
    
    this._carts.getUserCarts(userId).pipe(
      map((_httpResponseData: any) => {

        //no http response data found - error
        if (!_httpResponseData) {
          throwError;
        }
        //convert quanity data type to string type
        this._userCarts = _httpResponseData;
        this._Quantity = this._userCarts?.length.toString();

        return this._Quantity;
      }),
      //catch http response error
      catchError(_httpResponseError => {
        throw _httpResponseError;
      }))
      .subscribe({
        //http response data param
        next: (_httpResponseData: any) => {
          //store quantity in sessionStorage
          this._authStorage.setCartsQuantity(_httpResponseData);

          //update changes in username and chart quanity 
          this._authStorage.updateFirstName();
          this._authStorage.updateCartsQuantity();
        },
        //http response error param
        error: (_httpResponseError) => {
          this._errorMessage = _httpResponseError.message;

          console.log(this._errorMessage);
          this._errorMessage = this._errorMessage[0].toUpperCase() + this._errorMessage.substring(1).toLowerCase();
        }
      })
  };


  //redirect to account if the user is already loggedIn
  public redirectToAccount() {
    this._router.navigate(['/account']);
  }

  //for canDeactivate route guard
  async canExit(): Promise<boolean> {
    if (this._developerForm.dirty) {

      //pop-up confirmation alert if the form is incomplete
      if (await this._alertsService.deactivateConfirmation) {
        this.exit = true;
      } else {
        this.exit = false;
      }
    }
    return this.exit;
  }


}
