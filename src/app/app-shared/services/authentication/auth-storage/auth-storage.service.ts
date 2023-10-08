import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})

export class AuthStorageService {

  //track loggedIn user and display user firstname
  userFirstNameValue: string = '';
  logInValue: boolean = false;

  private userFirstName: BehaviorSubject<string> = new BehaviorSubject<string>(this.userFirstNameValue);
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.logInValue);

  userFirstName$: Observable<string> = this.userFirstName.asObservable();
  loggedIn$: Observable<boolean> = this.loggedIn.asObservable();
  
  constructor(private router: Router) { }
 
  public saveToken(token: string): void {
   localStorage.removeItem(TOKEN_KEY);
   localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
   localStorage.removeItem(USER_KEY);
   localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    let userObject: any;
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      // console.log('User Object = ' + user);
      userObject = JSON.parse(user);
      return userObject[0];
    }
    return {};
  }

  public updateLoginStatus() {
    let firstname = this.getUser()?.name?.firstname
    console.log('----- Firstname to be assigned -----');
    console.log(firstname);
    this.userFirstName.next(firstname);
      this.logInValue = true;
      this.loggedIn.next(this.logInValue);  
  }

  public signOut() {
    this.logInValue = false;
    this.loggedIn.next(this.logInValue);

    let firstName = '';
    this.userFirstName.next(firstName);

    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    this.router.navigate(['/']);
  }
}
