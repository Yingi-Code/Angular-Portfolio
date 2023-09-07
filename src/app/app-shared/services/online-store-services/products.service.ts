import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
  
export class ProductsService {

  baseUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {
  }

  getProducts() {
    return this.http.get(this.baseUrl)
  }

  getProduct(id: number) {
    return this.http.get(this.baseUrl + '/' + id);
  }

}
