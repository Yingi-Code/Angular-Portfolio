import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInPageTitle } from 'src/app/app-shared/animations/animations';
import { ProductService } from 'src/app/app-shared/services/online-store-services/products/products.service';
import { Lightbox } from 'ngx-lightbox';
import { LightboxConfig } from 'ngx-lightbox';
import { RouteExtraParamsService } from 'src/app/app-shared/services/router-params-services/route-extra-params.service';
import { catchError, map, of, throwError } from 'rxjs';

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
  loadingStatus?: boolean;
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
  tableSize: number = 10;

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

  _selectedProductCategory: string = '';
  _selectedSortOption: string = '';
  
  @ViewChild('productCategory') private _productCategory: any;
  @ViewChild('sortOption') private _sortOption: any;

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

    this._selectedProductCategory = 'default';
    this._selectedSortOption = '0';
    
    //fetch the products list
    this.getAllProducts();
    this.productDetails = null;
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
    //display spinner while loading data
    this.loadingStatus = true;

    //retrieve all products
    this.productService.getProducts().pipe( 
      map((res: any) => {

        //no data found error
        if (res.length == null) {
          throw "Product items found.";  
        }

        //return sorted http response data in ASC order
        res.sort((a: any, b: any) => {
          let fa = a.title.toLowerCase(), fb = b.title.toLowerCase();
          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });

        return res;
      }),

      //catch http response error
      catchError(err => {
        throw err;
      })
    )
      
    .subscribe({
      //http response data param
      next: (res: any) => {
          this.productsList = res;
        this.loadingStatus = false;
        },
        
      //http response error param
      error: (err: any) => {
            console.error(err)
      }
    }
    )
   
    return this.productsList;
  }

  refreshProductsList() {

    this._selectedProductCategory = this._productCategory.nativeElement.value;
    this._selectedSortOption = this._sortOption.nativeElement.value;

    //retrieve products as per selected product category
    if (this._selectedProductCategory != 'default') {
      console.log('--- Keep it filtered by ---');
      console.log(this._selectedProductCategory);

      this.filterByProductCategory(this._selectedProductCategory)
    }

    //keep the list sorted if srt option is selected
    if (this._selectedSortOption) {
      console.log('--- Keep it sorted by ---');
      console.log(this._selectedSortOption);
      
      this.sortBy(this._selectedSortOption);
    }
  
    if ((this._selectedProductCategory == 'default') && (this._selectedSortOption == '0')) {
      this.getAllProducts();
    }
  }

  productPreview(productId: number) {
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

  filterByProductCategory(selectedCategory: string) {   
    this.productService.getProducts()
      .subscribe((data: any) => { 
          this.productsList = data.filter((p: any) => p.category.toLowerCase() === selectedCategory);
        this.loadingStatus = false
      });
 }
  
  //Search only, Filter only, filter and search, search and filter
  searchByKeyword(_searchKeyWord: string) {

    let category = this._productCategory.nativeElement.value;
    let list: any;

    if (_searchKeyWord) {
      // console.log('[2.] --- Search applied ---');
      // console.log(_searchKeyWord);

      this.productService.getProducts()
        .subscribe((data: any) => {
          // console.log('[2.1.] --- filter value ---');
          // console.log(category);

          if (category != 'default') {
                console.log('[3.] --- Search and filter applied ---');
                console.log(_searchKeyWord + ' and ' + category);
                
                this.productsList =
                  (
                    (
                    list = data.filter((products: any) => products.category.toLowerCase() === category)
                    ) &&
                    (
                    (list.filter((products: any) => (products.title.toLowerCase().includes(_searchKeyWord.toLocaleLowerCase())))) ||
                    (list.filter((products: any) => (category.title.toLowerCase().includes(_searchKeyWord.toLocaleLowerCase())))) ||
                    (list.filter((products: any) => (products.description.toLowerCase().includes(_searchKeyWord.toLocaleLowerCase()))))
                    )                   
                  );
            this.loadingStatus = false
              
              } else {

                console.log('[4.] --- Search only applied ---');
                console.log(_searchKeyWord);
                this.productsList =
                  ((data.filter((products: any) => (products.title.toLowerCase().includes(_searchKeyWord.toLocaleLowerCase())))) ||
                    (data.filter((products: any) => (products.description.toLowerCase().includes(_searchKeyWord.toLocaleLowerCase())))));
            this.loadingStatus = false
                
              }
        });
      
    } else {

      if (category != 'default') {
        this.filterByProductCategory(category)
      } else {
        console.log('[5.] --- Search is empty---');
        this.productsList = this.getAllProducts();
      }
      
    }

    return this.productsList;
  }

  //sort products list
  sortBy(sortOptionId: string) {

    // console.log('Sort by selected option = ' + sortOptionId);
    switch (sortOptionId) {
      case '1':
        //price - asc
        this.productsList = this.productsList.sort((a: any, b: any) => a.price - b.price);
        break;
      case '2':
        //price - desc
        this.productsList = this.productsList.sort((a: any, b: any) => b.price - a.price);
        break;
      //rate - low to high
      case '3':
        this.productsList = this.productsList.sort((a: any, b: any) => a.rating.rate - b.rating.rate);
        break;
      //rate - high to low
      case '4':
        this.productsList = this.productsList.sort((a: any, b: any) => b.rating.rate - a.rating.rate);
        break;
      //title - asc 
      case '5':
        this.productsList = this.productsList.sort((a: any, b: any) => {
          let fa = a.title.toLowerCase(), fb = b.title.toLowerCase();
          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
        break;      
      //title - desc 
      case '6':
        this.productsList = this.productsList.sort((a: any, b: any) => {
          let fa = a.title.toLowerCase(), fb = b.title.toLowerCase();
          if (fa < fb) {
            return 1;
          }
          if (fa > fb) {
            return -1;
          }
          return 0;
        });;
        break;
    }

    return this.productsList;

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

    // this.albums.push(productImageDetails);
    this.albums[0] = productImageDetails;
    // open lightbox
    this._lightbox.open(this.albums, index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

  usDollarToRandConvention(usDollar: number) {
    return usDollar * 18;
  }

  //Pagenation methods
  onTableDataChange(event: any) {
    this.page = event;
    // this.productsList;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    // this.productsList;
  }

  viewProductDetails(id: number) {
  
    this.router.navigate(['app/online-store/product-details/', id]);
  }

  ngOnDestroy(): void {
    this.getAllProducts().unsubscribe;
    console.log('Component has been destroyed');
  }

}
