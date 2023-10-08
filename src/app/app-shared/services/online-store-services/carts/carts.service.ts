import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../shared-base-url/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private http: HttpClient) { }

  public getUserCarts(userId: number) {
    return this.http.get<any>(environment.apiUrl + 'carts/user/' + userId);
  }
}
