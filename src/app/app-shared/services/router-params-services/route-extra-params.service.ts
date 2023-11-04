import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteExtraParamsService {
  private _productCategory: string = '';
  private _productId: number =  0;

  constructor() { }

  set setProductId(value: number) { this._productId = value; }
  get getProductId(): number { return this._productId;}

  set productCategory(value: string) { this._productCategory = value;}
  get productCategory(): string { return this._productCategory; }
}
