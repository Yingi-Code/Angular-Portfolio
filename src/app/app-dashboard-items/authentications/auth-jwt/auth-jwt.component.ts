import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeInPageTitle } from 'src/app/app-shared/animations/animations';
import { ICustomer } from 'src/app/app-shared/interfaces/icustomer/icustomer';
import { AuthStorageService } from 'src/app/app-shared/services/authentication/auth-storage/auth-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/app-shared/services/authentication/auth/auth.service';
import { UsersService } from 'src/app/app-shared/services/online-store-services/users/users.service';
import { CartsService } from 'src/app/app-shared/services/online-store-services/carts/carts.service';
import { AlertNotificationsService } from 'src/app/app-shared/services/notifications/alerts/alert-notifications.service';

@Component({
  selector: 'app-auth-jwt',
  templateUrl: './auth-jwt.component.html',
  styleUrls: ['./auth-jwt.component.css'],
  animations: [
    fadeInPageTitle
  ]
})
  
export class AuthJwtComponent implements OnInit {

  //[ ngSwitch tag]
  viewMode = 'defaultTab';

  developerForm!: FormGroup;
  private tokenKey: string = '';

  //to be declared properly
  private _loggeInUserRecord: any;
  loggedInUser: any;
  returnUrl: string = '';

  isLoggedIn = false;
  isLoginFailed = false;

  _userCarts: any;
  _Quantity: any;
  
  //canDeactivate
  exit: boolean = true;

  constructor(
    private auth: AuthService,
    private users: UsersService,
    private carts: CartsService,
    private router: Router,
    private route: ActivatedRoute,
    private authStorage: AuthStorageService,
    private alertsService: AlertNotificationsService) { }

  ngOnInit(): void  {
    //Form object with form-control names
    this.developerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required]),
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    if (this.authStorage.getToken() != null) {
      this.authStorage.updateFirstName();
      this.authStorage.updateCartsQuantity();
      this.isLoggedIn = true;
      this.router.navigate(['/']);
    }
  }

  //another approach to accessing form controls [form control index-based]
  get loginFormControls() { return this.developerForm.controls; }

  //user the login credentials to retrieve and store Token
  public login() {
    //get form inputs data 
    const val = this.developerForm.value;

      this.auth.login(val.username, val.password)
        .subscribe((userData: any) => {

          //store Token for this user in localStorage
          this.authStorage.saveToken(userData.token);
          console.log('[1. Login] ----- Store token ----- ');
          console.log(userData.token);

          console.log('[2. Login] ----- Store user in local storage ----- ');
          this.setStorageData(val.username, val.password);

         

          this.router.navigate(['/']);
        }); 
  }

  //store  loggedIn user after successful login
  private setStorageData(username: string, password: string): void {
    let userRecordFound: any;
    this.users.getUsers()
      .subscribe((userData: any) => {
        //retrieve user record that matches these login credentials
        userRecordFound = userData.filter((user: any) =>
                          (user.username.toLowerCase() == username.toLowerCase() &&
                          (user.password.toLowerCase() == password.toLowerCase())));
        
        //store the record for this user in localStorage
        this.authStorage.saveUser(userRecordFound);  
        console.log('[3. Login]  ----- User record stored -----');
        console.log(userRecordFound);

        console.log('[4. Login] ----- Store carts in local storage ----- ');
        this.getUserCartsQuantity();
      });
  }

  private getUserCartsQuantity() {
    let userId = this.authStorage.getUser()?.id; 

    this.carts.getUserCarts(userId)
      .subscribe((userCarts: any) => {
        if (userCarts) {
          console.log('[5. Login] --- User carts found ---');
          console.log(userCarts);

          this._userCarts = userCarts;
          this._Quantity = this._userCarts?.length.toString();

          console.log('[6. Login] --- Send quantity to storage---');
          console.log(this._Quantity);
          this.authStorage.setCartsQuantity(this._Quantity);

          console.log('[7. Login] --- Finally update values ---');
          console.log('--------------------------------------------');
          this.authStorage.updateFirstName();
          this.authStorage.updateCartsQuantity();
        }
      });
    
    
  }
  

   //if the user is already loggedIn
  public redirectToAccount() {
    this.router.navigate(['/account']);
  }

  //for canDeactivate route guard
  async canExit(): Promise<boolean> {
    if (this.developerForm.dirty) {

      //pop-up confirmation alert if the form is incomplete
      if (await this.alertsService.deactivateConfirmation) {
        this.exit = true;
      } else {
        this.exit = false;
      }
    }
    return this.exit;
  }

}
