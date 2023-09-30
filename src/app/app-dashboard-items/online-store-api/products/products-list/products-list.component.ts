import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInPageTitle } from 'src/app/app-shared/animations/animations';
import { ProductService } from 'src/app/app-shared/services/online-store-services/products.service';
import { RouteExtraParamsService } from 'src/app/app-shared/services/router-services/route-extra-params.service';
import { Lightbox } from 'ngx-lightbox';
import { LightboxConfig } from 'ngx-lightbox';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
  animations: [
    fadeInPageTitle
  ]
})
  
export class ProductsListComponent implements OnInit, OnDestroy {

  //[ ngSwitch tag]
  viewMode = 'defaultTab'

  //Loading spinner
  productListLoading?: boolean;
  productDetailsLoading?: boolean;

  //To be declared as Product []
  productsList: any;
  private _searchKeyWord: string = "";
  filteredProductsList: any;

//product details
  productDetails: any;
  _priceInSouthAfricanRand: any;

  //pagination properties
  page: number = 1;
  count: number = 0;
  tableSize: number = 8;

  //Image Viwer
  albums: any = [];
  private _images = [
    {
      src: "",
      caption: ""
    }
  ];
 
  i: number = 0;
  selectedImageIndex: number = 0;

  constructor(
    private productService: ProductService,
    private router: Router,
    private routeExtraParams: RouteExtraParamsService,
    private _lightboxConfig: LightboxConfig, private _lightbox: Lightbox


  ) {

    _lightboxConfig.fadeDuration = 0.7;
    _lightboxConfig.resizeDuration = 0.5;
    _lightboxConfig.fitImageInViewPort = true;
    // _lightboxConfig.positionFromTop = 350;
    _lightboxConfig.showImageNumberLabel = true;
    _lightboxConfig.alwaysShowNavOnTouchDevices = false;
    _lightboxConfig.wrapAround = true;
    _lightboxConfig.disableKeyboardNav = false;
    _lightboxConfig.disableScrolling = false;
    _lightboxConfig.centerVertically = true;
    _lightboxConfig.albumLabel = "Image %1 of %2";
    _lightboxConfig.enableTransition = true;
    _lightboxConfig.showZoom = true;
    _lightboxConfig.showRotate = false;
    _lightboxConfig.showDownloadButton = true;
    _lightboxConfig.containerElementResolver = () => document.body;   
  }

  ngOnInit(): void {
    
    // when the system initializes, fetch the products list
    this.getAllProducts();
    this.productDetails = null;
    // track the seleted item
    // if (this.routeExtraParams?.productCategory == '') {
    //   this.selectedRadioButtonValue = 'All';
    // } else {
    //   this.selectedRadioButtonValue = this.routeExtraParams?.productCategory;
    // }
  }

  get getProductCategories() {
    return this.productService.getProductCategories;
  }

  get getSortOptions() {
    return this.productService.getSortOptions;
  }

  get hideProductDetailsview() {
    return this.productDetails = null;
  }

  getAllProducts() {
    this.productListLoading = true;
    this.productService.getProducts()
      .subscribe((data: any) => {
        this.productsList = data;
        this.productListLoading = false

        // setTimeout(() => {
        //   this.productListLoading = false
        // }, 100);
        
      });
    return this.productsList;
  }

  getThisProductDetails(productId: number) {
    console.log('Product ID = ' + productId);
    this.productDetailsLoading = true;
    this.productService.getProduct(productId)
      .subscribe((data: any) => {
        this.productDetails = data;
        setTimeout(() => {
          this.productDetailsLoading = false
        }, 10);
      });
  }

  //Imgage viewer
  open(index: number): void {

    const src = this.productDetails.image;
    const caption = this.productDetails.title;
    const thumb = this.productDetails.image;

    const productImageDetails = {
      src: src,
      caption: caption,
      thumb: thumb
    };

    this.albums.push(productImageDetails);

    // open lightbox
    this._lightbox.open(this.albums, 0);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

  usDollarToRandConvention(usDollar: number) {
    return usDollar * 18;
  }
  
  //Search, Filter, and Sort
  searchProduct(_searchKeyWord: string) {
    this._searchKeyWord = _searchKeyWord;

    if (_searchKeyWord) {
      this.productsList =
        ((this.productsList.filter((products: any) => (products.title.toLowerCase().includes(_searchKeyWord.toLocaleLowerCase())))) ||
        (this.productsList.filter((products: any) => (products.description.toLowerCase().includes(_searchKeyWord.toLocaleLowerCase())))));
    } else {
      this.productsList = this.getAllProducts();
    }
  }

  filterBy(selectedCategory: string) {
    console.log('Filter by selected option = ' + selectedCategory);
    this.productsList = this.productsList.filter((p: any) => p.category.toLowerCase() === selectedCategory);
 }
  
  sortBy(sortOptionId: string) {

    console.log('Sort by selected option = ' + sortOptionId);
    switch (sortOptionId) {
      case '1':
        //price - asc
        this.productsList = this.productsList.sort((a: any, b: any) => a.price - b.price);
        break;

      case '2':
        //price - desc
        this.productsList = this.productsList.sort((a: any, b: any) => b.price - a.price);
        break;

      case '3':
        this.productsList = this.productsList.sort((a: any, b: any) => a.rating.rate - b.rating.rate);
        break;

      case '4':
        this.productsList = this.productsList.sort((a: any, b: any) => b.rating.rate - a.rating.rate);
        break;
      
    }

  }

  //Pagenation methods
  onTableDataChange(event: any) {
    this.page = event;
    this.productsList;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.productsList;
  }

  // ProductDetails(id: number) {
  //   this.routeExtraParams.productCategory = this.selectedRadioButtonValue;
  //   this.routeExtraParams.productId = id;
  //   this.router.navigate(['product-details']);
  // }

  ngOnDestroy(): void {
    this.getAllProducts().unsubscribe;
    console.log('Component has been destroyed');
  }

}
