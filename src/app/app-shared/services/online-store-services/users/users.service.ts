import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/app-shared/services/online-store-services/shared-base-url/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
  }

  public getUsers() {
    return this.http.get<any>(environment.apiUrl + 'users');
  }

  public getUser(userId: number) {
    return this.http.get<any>(environment.apiUrl + 'users/' + userId);
  }
}
