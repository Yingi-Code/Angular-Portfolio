import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/app-shared/services/online-store-services/shared-base-url/baseUrl';
import { ICustomer } from 'src/app/app-shared/interfaces/icustomer/icustomer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public login(username: string, password: string) {
    return this.http.post<any>(environment.apiUrl + 'auth/login', { username, password });
  }
  
}


