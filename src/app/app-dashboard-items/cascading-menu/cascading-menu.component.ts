import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { fadeInPageTitle } from 'src/app/app-shared/animations/animations';
import { CascadingMenuService } from 'src/app/app-shared/services/cascading-menu/cascading-menu.service';

@Component({
  selector: 'app-cascading-menu',
  templateUrl: './cascading-menu.component.html',
  styleUrls: ['./cascading-menu.component.css'],
  animations: [
    fadeInPageTitle
  ]
})
export class CascadingMenuComponent implements OnInit {

  //[ ngSwitch tag]
  viewMode = 'defaultTab';

  _gender: any;
  _categories: any;
  _products: any;
  _product: any;
  _productDetails: any;
  _dataLoaded: boolean = false;
  _dataAvailable: boolean = false;
  _errorMessage: string = '';

  _selectedGender: any = {
    id: 0, name: '--- Gender ---'
  }

  constructor(private _cascadingMenuService: CascadingMenuService ) { }

  ngOnInit(): void {
    this._dataLoaded = false;
    this.GetGenderList();
    this.GetProductCategoryList(this._selectedGender)
  }

  GetGenderList() {
    this._cascadingMenuService.getAllMenuData().pipe(
      map((_menuData: any) => {
        if (_menuData.length <= 0) {
          throwError;
        }
        return _menuData['gender'];
      }),
      catchError(_menuError => {
        throw _menuError;
      })
    )
      .subscribe({
        next: (_menuData: any) => {

          //set detected location coordinates
          this._gender = _menuData
          console.log('==== gender Data found =====')
          console.log(this._gender);
        },
        error: (_Error: any) => {
          // this.GeoLocationErrorHandler(_Error);
          console.log('==== gender Data Error detected =====')
          console.log(_Error);

          if (_Error.status == 404) {
            this._errorMessage = "The items you are looking for could not be found"
          }
        }
      })

    return this._gender;
  }

  GetProductCategoryList(seletedGenderId: any) {

    console.log(seletedGenderId.value);
    
    this._cascadingMenuService.getAllMenuData().pipe(
      map((_menuData: any) => {

        //filter category items by ganderId
        let _productCategory = _menuData['category'].filter((c: any) => c.genderId == seletedGenderId.value)

        if (_productCategory.length <= 0) {
          throwError;
        }
        return _productCategory;
      }),
      catchError(_menuError => {
        throw _menuError;
      })
    )
      .subscribe({
        next: (_productCategory: any) => {

          this._categories = _productCategory;

          //set detected Category Data
          console.log('==== Category Data found =====')
          console.log(this._categories);
        },
        error: (_Error: any) => {

          // HTTP response (_Error);
          console.log('==== Category Data Error detected =====')
          console.log(_Error);
          this._errorMessage = "The items you are looking for could not be found"

        }
      })

    return this._categories;
  }

  GetProductsList(seletedProductCategoryId: any) {

    console.log(seletedProductCategoryId.value);

    this._cascadingMenuService.getAllMenuData().pipe(
      map((_menuData: any) => {

        //filter product items by ganderId
        let _products = _menuData['product'].filter((p: any) => p.categoryId == seletedProductCategoryId.value)

        if (_products.length <= 0) {
          throwError;
        }
        return _products;
      }),
      catchError(_menuError => {
        throw _menuError;
      })
    )
      .subscribe({
        next: (_products: any) => {

          this._products = _products;

          //set detected Product Data
          console.log('==== Product Data found =====')
          console.log(this._products);
        },
        error: (_Error: any) => {

          // HTTP response (_Error);
          console.log('==== Category Data Error detected =====')
          console.log(_Error);
          this._errorMessage = "The items you are looking for could not be found"

        }
      })

    return this._products;
  }

  ProductDetails(selectedProduct: any) {
    console.log(selectedProduct.value);

    this._cascadingMenuService.getAllMenuData().pipe(
      map((_menuData: any) => {

        //filter selected product category
        let _selectedProduct = _menuData['product'].filter((p: any) => p.id == selectedProduct.value)

        if (_selectedProduct.length <= 0) {
          throwError;
        }
        return _selectedProduct;
      }),
      catchError(_menuError => {
        throw _menuError;
      })
    )
      .subscribe({
        next: (_selectedProduct: any) => {

          this._product = _selectedProduct;

          //set detected Product Details
          console.log('==== Product Details found =====')
          console.log(this._product);
        },
        error: (_Error: any) => {

          // HTTP response (_Error);
          console.log('==== Category Data Error detected =====')
          console.log(_Error);
          this._errorMessage = "The items you are looking for could not be found"

        }
      });
    this._dataLoaded = true
  }

  DisplayProduct() {
    this._dataLoaded = true
    return this._productDetails = this._product;
  }

  

}
