import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteExtraParamsService {
  _productCategory: string = '';
  _productId: number =  0;

  constructor() { }

  set productId(value: number) {
    this._productId = value;
  }

  get productId(): number {
    return this._productId;
  }

  set productCategory(value: string) {
    this._productCategory = value;
  }

  get productCategory(): string {
    return this._productCategory;
  }
}
