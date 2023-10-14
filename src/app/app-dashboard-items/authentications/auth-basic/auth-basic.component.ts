import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeInPageTitle } from 'src/app/app-shared/animations/animations';
import { ICustomer } from 'src/app/app-shared/interfaces/icustomer/icustomer';
import { AuthStorageService } from 'src/app/app-shared/services/authentication/auth-storage/auth-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/app-shared/services/authentication/auth/auth.service';
import { UsersService } from 'src/app/app-shared/services/online-store-services/users/users.service';
import { AlertNotificationsService } from 'src/app/app-shared/services/notifications/alerts/alert-notifications.service';

@Component({
  selector: 'app-auth-basic',
  templateUrl: './auth-basic.component.html',
  styleUrls: ['./auth-basic.component.css'],
  animations: [
    fadeInPageTitle
  ]
})
  
export class AuthBasicComponent {

  //[ ngSwitch tag]
  viewMode = 'defaultTab';
  developerForm!: FormGroup;
  private tokenKey: string = '';
  private userRecord: any;
  loggedInUser: any;
  returnUrl: string = '';
  //canDeactivate
  exit: boolean = true;

  //track loggedIn user and display user firstname
  userFirstNameValue: string = '';
  private userFirstName: BehaviorSubject<string> = new BehaviorSubject<string>(this.userFirstNameValue);
  userFirstName$: Observable<string> = this.userFirstName.asObservable();


  isLoggedIn = false;
  isLoginFailed = false;

  constructor(
    private auth: AuthService,
    private users: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private authStorage: AuthStorageService,
    private alertsService: AlertNotificationsService) { }

  ngOnInit(): void {
    //Form object with form-control names
    this.developerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required]),
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    if (this.authStorage.getToken() != null) {
      // this.authStorage.updateLoginStatus();
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
        console.log('----- Store token -----');
        console.log(userData.token);

        console.log('----- Are we getting here? -----');
        this.storeCurrentUserInSession(val.username, val.password);
        this.router.navigate(['/']);

      }
      );

  }

  //store  loggedIn user after successful login
  private storeCurrentUserInSession(username: string, password: string): void {
    let userRecordFound: any;
    this.users.getUsers()
      .subscribe((userData: any) => {
        //retrieve user record that matches these login credentials
        userRecordFound = userData.filter((user: any) =>
        (user.username.toLowerCase() == username.toLowerCase() &&
          (user.password.toLowerCase() == password.toLowerCase())));

        //store the record for this user in localStorage
        this.authStorage.saveUser(userRecordFound);
        console.log('----- User record has been stored -----');
        console.log(userRecordFound);

        console.log('----- Assign firstname -----');
        // this.authStorage.updateLoginStatus();

      });
  }

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
