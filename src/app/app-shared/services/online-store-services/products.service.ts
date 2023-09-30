import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
  
export class ProductService {

  baseUrl = 'https://fakestoreapi.com/products';

  private _productCategories = [
   
    { id: 1, name: 'Men clothing', value: "men's clothing"},
    { id: 2, name: 'Women clothing', value: "women's clothing" },
    { id: 3, name: 'Electronics', value: "electronics" },
    { id: 4, name: 'Jewellary', value: "jewelery" },
  ];

  private _sortOptions = [
    { id: 1, name: 'Price (Low to High)' },
    { id: 2, name: 'Price (Hight to Low)' },
    { id: 3, name: 'Rating (Low to High)' },
    { id: 4, name: 'Rating (Hight to Low)' }
  ];

  constructor(private http: HttpClient) {
  }
  
  getProducts() {
    return this.http.get(this.baseUrl);
  }

  getProduct(id: number) {
    return this.http.get(this.baseUrl + '/' + id);
  }

  get getProductCategories() {
    return this._productCategories;
  }

  get getSortOptions() {
    return this._sortOptions
  }

}
