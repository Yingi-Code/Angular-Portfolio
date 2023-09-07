import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInPageTitle } from 'src/app/app-shared/animations/animations';
import { ProductsService } from 'src/app/app-shared/services/online-store-services/products.service';
import { RouteExtraParamsService } from 'src/app/app-shared/services/router-services/route-extra-params.service';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
  animations: [
    fadeInPageTitle
  ]
})
  
export class ProductsListComponent implements OnInit {

  //[ ngSwitch tag]
  viewMode = 'defaultTab'

  //To be declared as Product []
  productsList: any;
  searchKeyWord: string = "";
  filteredProductsList: any;
  selectedRadioButtonValue: string = 'All';

  //pagination properties
  page: number = 1;
  count: number = 0;
  tableSize: number = 8;
  tableSizes: any = [3, 6, 9, 12];


  constructor(
    private productService: ProductsService,
    private router: Router,
    private routeExtraParams: RouteExtraParamsService
  ) {
  }

  ngOnInit(): void {
    // when the system initializes, fetch the products list
    this.productsList = this.fetchProducts;
      
    if (this.routeExtraParams?.productCategory == '') {
      this.selectedRadioButtonValue = 'All';
    } else {
      this.selectedRadioButtonValue = this.routeExtraParams?.productCategory;
    }

  }

  searchProduct(searchKeyWord: string) {
    this.searchKeyWord = searchKeyWord.toLowerCase();
    console.log(this.searchKeyWord);
  }

  FilterByCategory() {
    console.log(this.selectedRadioButtonValue);
    this.fetchProducts.filter((products: any) => products.category === this.selectedRadioButtonValue);
    return this.productsList
  }

  get fetchProducts() {
  
    this.productService.getProducts()
      .subscribe((data: any) => {
        //assign http response [data] to users variable
        this.productsList = data;
      });

    return this.productsList

  }

  onTableDataChange(event: any) {
    this.page = event;
    this.fetchProducts;
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.fetchProducts;
  }

  ProductDetails(id: number) {

    console.log(id);
    this.routeExtraParams.productCategory = this.selectedRadioButtonValue;
    this.routeExtraParams.productId = id;
    this.router.navigate(['product-details']);
  }

}
