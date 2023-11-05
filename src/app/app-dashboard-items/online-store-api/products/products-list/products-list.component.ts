import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInPageTitle } from 'src/app/app-shared/animations/animations';
import { ProductService } from 'src/app/app-shared/services/online-store-services/products/products.service';
import { Lightbox } from 'ngx-lightbox';
import { LightboxConfig } from 'ngx-lightbox';
import { catchError, map } from 'rxjs';


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
  _loadingStatus?: boolean;
  _previewLoadingStatus?: boolean;
  
  //http response error message
  _errorMessage: string = '';

  //To be declared as Product []
  _productsList: any;
 
  //observables subscriptions
  private _subscription: any;

  //product preview
  _productDetails: any;
  _priceInSouthAfricanRand: any;

  //pagination properties
  _page: number = 1;
  _count: number = 0;
  _tableSize: number = 10;

  //product image viwer
  private _albums: any = [];
  private _images = [
    {
      src: "",
      caption: ""
    }
  ];
 
  //get seleted dropdown item from the view
  private _selectedProductCategory: string = '';
  private _selectedSortOption: string = '0';
  @ViewChild('productCategory') private _productCategory: any;
  @ViewChild('sortOption') private _sortOption: any;

  constructor(
    private _productService: ProductService,
    private _router: Router,
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
    //set defaults
    this._selectedProductCategory = 'default';
    this._selectedSortOption = '0';
    this.getAllProducts();
    this._productDetails = null;
  }

  get getProductCategories() {
    return this._productService.getProductCategories;
  }
  get getSortOptions() {
    return this._productService.getSortOptions;
  }
  get hideProductDetailsview() {
    return this._productDetails = null;
  }

  //load http response data - products
  getAllProducts() {
    //display spinner while loading data
    this._loadingStatus = true;

    //retrieve all products
    this._subscription = this._productService.getProducts().pipe( 
      map((_httpResponseData: any) => {

        //no http response data found - error
        if (_httpResponseData.length == 0) {
          throw "The system could not load data from the server.";  
        }
        this._loadingStatus = false;
        return _httpResponseData;
      }),

      //catch http response error
      catchError(_httpresponseerror => {
        throw _httpresponseerror;
      })
    )
      
    .subscribe({
      //http response data param
      next: (_httpResponseData: any) => {
        this._productsList = _httpResponseData;

        //Sort http response data as per default sort param
          this.sortBy(this._sortOption.nativeElement.value);        
        },
        
      //http response error param
      error: (_httpresponseerror: any) => {

        this._errorMessage = _httpresponseerror;
        console.error(_httpresponseerror)
        this._loadingStatus = false;
      }
    }
    )
    return this._productsList;
  }

  //reload the http response data - products
  refreshProductsList() {
    //filters selections
    this._selectedProductCategory = this._productCategory.nativeElement.value;
    this._selectedSortOption = this._sortOption.nativeElement.value;

    //List products as per selected filter param
    if (this._selectedProductCategory != 'default') {
      this.filterByProductCategory(this._selectedProductCategory)
    }
    //List products as per selected sort param
    if (this._selectedSortOption) {
      this.sortBy(this._selectedSortOption);
    }
    //List products as per default param
    if ((this._selectedProductCategory == 'default') && (this._selectedSortOption == '0')) {
      this.getAllProducts();
    } 
  }

  //display product details on the same _page
  productPreview(_productId: number) {
    console.log('Product ID = ' + _productId);
    this._previewLoadingStatus = true;
    this._productService.getProduct(_productId)
      .subscribe((data: any) => {
        this._productDetails = data;
        setTimeout(() => {
          this._previewLoadingStatus = false
        }, 10);
      });
  }

  //filter http response data by product category
  filterByProductCategory(_selectedCategory: string) {
    this._subscription = this._productService.getProducts().pipe(
    map((_httpResponseData: any) => {
      return _httpResponseData;
    }),
    
    //catch http response error
    catchError(_httpresponseerror => {
      throw _httpresponseerror;
    }))
      
    .subscribe({
    
    //http response data param
      next: (_httpResponseData: any) => {
        
      //Filter the http response data by category
        this._productsList = _httpResponseData.filter((p: any) => p.category.toLowerCase() === _selectedCategory);
      //sort the new list of products
      this.sortBy(this._sortOption.nativeElement.value);
    },

    //http response error param
    error: (_httpresponseerror: any) => {
      this._errorMessage = _httpresponseerror;
      this._loadingStatus = false;
    }
  });
    
    return this._productsList;
  }

  //Search only, Filter only, filter and search, search and filter
  searchByKeyword(_searchKeyWord: string) {

    let category = this._productCategory.nativeElement.value;  
    //subscribe to an observable
    this._subscription = this._productService.getProducts().pipe(
          map((_httpResponseData: any) => {
            
            //filter http response data by title/ category/ description
            _httpResponseData = _httpResponseData.filter(
              (products: any) =>
                (products.title.toLowerCase().includes(_searchKeyWord.toLocaleLowerCase())) ||
                (products.category.toLowerCase().includes(_searchKeyWord.toLocaleLowerCase())) ||
                (products.description.toLowerCase().includes(_searchKeyWord.toLocaleLowerCase()))
            );            
            return _httpResponseData;
          }),

          //catch http response error
          catchError(_httpresponseerror => {
            throw _httpresponseerror;
          })
        )

        .subscribe({
          //http response data param
          next: (_httpResponseData: any) => {
           
            if (category != 'default') {
              //Filter the http response data by category if selected
              this._productsList = _httpResponseData.filter((p: any) => p.category.toLowerCase() === category);
            } else {
              this._productsList = _httpResponseData;
            }
            //sort the new list of products
            this.sortBy(this._sortOption.nativeElement.value);
          },

          //http response error param
          error: (_httpresponseerror: any) => {
            this._errorMessage = _httpresponseerror;
            this._loadingStatus = false;
          }
        });
    
    return this._productsList;
  }

  //sort http response data by selected sort param
  sortBy(_sortOptionId: string) {
    switch (_sortOptionId) {
      //price - asc
      case '1':
        this._productsList = this._productsList.sort((a: any, b: any) => a.price - b.price);
        break;
      //price - desc
      case '2':
        this._productsList = this._productsList.sort((a: any, b: any) => b.price - a.price);
        break;
      //rate - asc
      case '3':
        this._productsList = this._productsList.sort((a: any, b: any) => a.rating.rate - b.rating.rate);
        break;
      //rate - desc
      case '4':
        this._productsList = this._productsList.sort((a: any, b: any) => b.rating.rate - a.rating.rate);
        break;
      //title - asc 
      case '5':
        this._productsList = this._productsList.sort((a: any, b: any) => {
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
        this._productsList = this._productsList.sort((a: any, b: any) => {
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
      //title - asc 
      default:
        this._productsList = this._productsList.sort((a: any, b: any) => {
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
    }
    return this._productsList;
  }

  //Open selected image in lightBox view
  open(_index: number): void {

    //get selected image details
    const src = this._productDetails.image;
    const caption = this._productDetails.title;
    const thumb = this._productDetails.image;

    //create an instance of image
    const productImageDetails = {
      src: src,
      caption: caption,
      thumb: thumb
    };

    // this._albums.push(productImageDetails);
    this._albums[0] = productImageDetails;
    // open lightbox
    this._lightbox.open(this._albums, _index);
  }

  // close lightbox programmatically
  close(): void {
    this._lightbox.close();
  }

  //US Dollar to ZRA convention
  usDollarToRandConvention(_usDollar: number) {
    return _usDollar * 18;
  }

  //Pagenation methods
  onTableDataChange(_event: any) {
    this._page = _event;
  }
  //Pagenation methods
  onTableSizeChange(_event: any): void {
    this._tableSize = _event.target.value;
    this._page = 1;
  }
  //view selected product in product-details component
  viewProductDetails(_id: number) {
    this._router.navigate(['app/online-store/product-details/', _id]);
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe;
    console.log('Subscription unsubscribed');
    console.log('Component has been destroyed');
  }

}
